import { create } from 'zustand';
import type { Team, QuestionState, SavedGame, Question } from '../data/types';
import { round1 } from '../data/round1';
import { round2 } from '../data/round2';
import { round3 } from '../data/round3';

const SAVE_KEY = 'deyaniya-quiz-save';
const CURRENT_VERSION = 1;

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function getAllQuestions(round: number): Question[] {
  const data = round === 1 ? round1 : round === 2 ? round2 : round3;
  return data.flatMap((cat) => cat.questions);
}

function buildInitialQuestionStates(round: number): Record<string, QuestionState> {
  const questions = getAllQuestions(round);
  const states: Record<string, QuestionState> = {};
  for (const q of questions) {
    states[q.id] = { id: q.id, isAnswered: false, answeredBy: null, answeredCorrectly: null };
  }
  return states;
}

export type Screen =
  | 'start'
  | 'team-manager'
  | 'draw-order'
  | 'game-board'
  | 'question'
  | 'scoreboard'
  | 'round-transition'
  | 'final';

export type AnswerResult = 'correct' | 'wrong' | 'no-answer';

interface GameState {
  // Экраны
  screen: Screen;
  setScreen: (screen: Screen) => void;

  // Команды
  teams: Team[];
  addTeam: (name: string) => void;
  removeTeam: (id: string) => void;
  updateTeamName: (id: string, name: string) => void;
  setTeams: (teams: Team[]) => void;

  // Раунды
  currentRound: number;
  roundStarted: boolean;
  startRound: () => void;
  finishRound: () => void;

  // Очерёдность
  roundOrder: string[]; // ID команд в порядке очереди
  currentTeamIndex: number;
  setRoundOrder: (order: string[]) => void;
  nextTeam: () => void;

  // Вопросы
  questionStates: Record<string, QuestionState>;
  openQuestionId: string | null;
  openQuestion: Question | null;
  openQuestionAttempts: string[]; // Какие команды уже пробовали
  selectQuestion: (questionId: string) => void;
  answerQuestion: (teamId: string, result: AnswerResult) => void;
  answerForTeam: (teamId: string, questionId: string, result: AnswerResult) => void;
  closeQuestion: () => void;

  // Бонусные минуты
  awardBonusMinute: (teamId: string) => void;
  useBonusMinute: (teamId: string) => void;
  convertMinutesToScore: (teamId: string, minutes: number) => void;
  convertAllMinutes: () => void;
  declareRoundWinner: (teamId: string) => void;
  resetScores: () => void;

  // Таймер
  timerRunning: boolean;
  timerSeconds: number;
  startTimer: () => void;
  stopTimer: () => void;
  tickTimer: () => void;

  // Отсев
  eliminationMode: boolean;
  eliminatedIds: string[];
  toggleElimination: (teamId: string) => void;
  confirmElimination: () => void;

  // Сохранение
  saveGame: () => void;
  loadGame: () => boolean;
  hasSavedGame: () => boolean;
  deleteSave: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // === Экраны ===
  screen: 'start',
  setScreen: (screen) => set({ screen }),

  // === Команды ===
  teams: [],
  addTeam: (name) =>
    set((state) => ({
      teams: [...state.teams, { id: generateId(), name, score: 0, bonusMinutes: 0, roundWins: [], isActive: true, eliminatedInRound: null }],
    })),
  removeTeam: (id) =>
    set((state) => ({
      teams: state.teams.filter((t) => t.id !== id),
    })),
  updateTeamName: (id, name) =>
    set((state) => ({
      teams: state.teams.map((t) => (t.id === id ? { ...t, name } : t)),
    })),
  setTeams: (teams) => set({ teams }),

  // === Раунды ===
  currentRound: 1,
  roundStarted: false,
  startRound: () => {
    const state = get();
    const round = state.currentRound;
    set({
      roundStarted: true,
      questionStates: buildInitialQuestionStates(round),
      openQuestionId: null,
      openQuestion: null,
      openQuestionAttempts: [],
      currentTeamIndex: 0,
      timerRunning: false,
      timerSeconds: 60,
      screen: 'game-board',
    });
  },
  finishRound: () => {
    const state = get();
    const round = state.currentRound;

    if (round === 3) {
      // Авто-конвертация минут в баллы перед финалом
      const teamsWithConverted = state.teams.map((t) => ({
        ...t,
        score: t.score + t.bonusMinutes * 100,
        bonusMinutes: 0,
      }));
      set({ teams: teamsWithConverted, screen: 'final' });
      return;
    }

    // Сортируем активные команды по очкам
    const activeTeams = state.teams
      .filter((t) => t.isActive && t.eliminatedInRound === null)
      .sort((a, b) => b.score - a.score);

    // Определяем, сколько выбывает
    let eliminateCount = 0;
    if (round === 1) eliminateCount = 3;
    else if (round === 2) eliminateCount = activeTeams.length - 5;

    if (eliminateCount <= 0) {
      // Никто не выбывает — конвертируем минуты и переходим к жеребьёвке
      const teamsWithConverted = state.teams.map((t) => ({
        ...t,
        score: t.score + t.bonusMinutes * 100,
        bonusMinutes: 0,
      }));
      set({
        teams: teamsWithConverted,
        screen: 'draw-order',
        currentRound: round + 1,
        roundStarted: false,
        questionStates: {},
        openQuestionId: null,
        openQuestion: null,
        openQuestionAttempts: [],
        currentTeamIndex: 0,
        roundOrder: [],
      });
      return;
    }

    // Показываем экран отсева
    const worstTeams = activeTeams.slice(-eliminateCount).map((t) => t.id);
    set({
      screen: 'round-transition',
      eliminationMode: true,
      eliminatedIds: worstTeams,
    });
  },

  // === Очерёдность ===
  roundOrder: [],
  currentTeamIndex: 0,
  setRoundOrder: (order) => set({ roundOrder: order, currentTeamIndex: 0 }),
  nextTeam: () => {
    const state = get();
    const activeInOrder = state.roundOrder.filter((id) => {
      const team = state.teams.find((t) => t.id === id);
      return team && team.isActive && team.eliminatedInRound === null;
    });
    if (activeInOrder.length === 0) return;
    const currentIdx = activeInOrder.indexOf(state.roundOrder[state.currentTeamIndex]);
    const nextIdx = (currentIdx + 1) % activeInOrder.length;
    const nextId = activeInOrder[nextIdx];
    const globalIdx = state.roundOrder.indexOf(nextId);
    set({ currentTeamIndex: globalIdx >= 0 ? globalIdx : 0 });
  },

  // === Вопросы ===
  questionStates: {},
  openQuestionId: null,
  openQuestion: null,
  openQuestionAttempts: [],
  selectQuestion: (questionId) => {
    const state = get();
    const allQuestions = getAllQuestions(state.currentRound);
    const question = allQuestions.find((q) => q.id === questionId);
    if (!question) return;

    set({
      openQuestionId: questionId,
      openQuestion: question,
      openQuestionAttempts: [],
      timerRunning: true,
      timerSeconds: 60,
      screen: 'question',
    });
  },
  answerQuestion: (teamId, result) => {
    const state = get();
    const question = state.openQuestion;
    if (!question) return;

    // Блокировка: если команда уже пробовала — игнорируем
    if (state.openQuestionAttempts.includes(teamId)) return;

    const value = result === 'correct' ? question.value : result === 'wrong' ? -question.value : 0;

    set((s) => ({
      teams: s.teams.map((t) => (t.id === teamId ? { ...t, score: t.score + value } : t)),
      questionStates: {
        ...s.questionStates,
        [question.id]: {
          id: question.id,
          isAnswered: result === 'correct',
          answeredBy: result === 'correct' ? teamId : null,
          answeredCorrectly: result === 'correct',
        },
      },
      openQuestionAttempts: [...s.openQuestionAttempts, teamId],
    }));

    // Если ответили правильно — закрываем вопрос
    if (result === 'correct') {
      set({ timerRunning: false });
    }
  },
  answerForTeam: (teamId, questionId, result) => {
    const state = get();
    // Блокировка: если команда уже пробовала — игнорируем
    if (state.openQuestionAttempts.includes(teamId)) return;

    const allQuestions = getAllQuestions(state.currentRound);
    const question = allQuestions.find((q) => q.id === questionId);
    if (!question) return;

    const value = result === 'correct' ? question.value : result === 'wrong' ? -question.value : 0;

    set((s) => ({
      teams: s.teams.map((t) => (t.id === teamId ? { ...t, score: t.score + value } : t)),
      questionStates: {
        ...s.questionStates,
        [questionId]: {
          id: questionId,
          isAnswered: result === 'correct',
          answeredBy: result === 'correct' ? teamId : null,
          answeredCorrectly: result === 'correct',
        },
      },
      openQuestionAttempts: [...s.openQuestionAttempts, teamId],
    }));

    if (result === 'correct') {
      set({ timerRunning: false });
    }
  },
  closeQuestion: () => {
    const state = get();
    const question = state.openQuestion;
    if (!question) return;

    // Если вопрос не был отвечен правильно — помечаем как отвеченный (закрыт ведущим)
    if (!state.questionStates[question.id]?.isAnswered) {
      set((s) => ({
        questionStates: {
          ...s.questionStates,
          [question.id]: { id: question.id, isAnswered: true, answeredBy: null, answeredCorrectly: null },
        },
      }));
    }

    set({
      openQuestionId: null,
      openQuestion: null,
      openQuestionAttempts: [],
      timerRunning: false,
      timerSeconds: 60,
      screen: 'game-board',
    });

    // Переход хода к следующей команде
    state.nextTeam();
  },

  // === Бонусные минуты ===
  awardBonusMinute: (teamId) => {
    set((s) => ({
      teams: s.teams.map((t) =>
        t.id === teamId ? { ...t, bonusMinutes: t.bonusMinutes + 1 } : t
      ),
    }));
  },
  useBonusMinute: (teamId) => {
    const state = get();
    const team = state.teams.find((t) => t.id === teamId);
    if (!team || team.bonusMinutes < 1) return;
    set((s) => ({
      teams: s.teams.map((t) =>
        t.id === teamId ? { ...t, bonusMinutes: t.bonusMinutes - 1 } : t
      ),
      timerSeconds: 60,
    }));
  },
  convertMinutesToScore: (teamId, minutes) => {
    set((s) => ({
      teams: s.teams.map((t) =>
        t.id === teamId
          ? { ...t, bonusMinutes: t.bonusMinutes - minutes, score: t.score + minutes * 100 }
          : t
      ),
    }));
  },
  convertAllMinutes: () => {
    set((s) => ({
      teams: s.teams.map((t) => ({
        ...t,
        score: t.score + t.bonusMinutes * 100,
        bonusMinutes: 0,
      })),
    }));
  },
  declareRoundWinner: (teamId) => {
    const state = get();
    set((s) => ({
      teams: s.teams.map((t) =>
        t.id === teamId
          ? { ...t, roundWins: [...t.roundWins, state.currentRound] }
          : t
      ),
    }));
  },
  resetScores: () => {
    set((s) => ({
      teams: s.teams.map((t) => ({ ...t, score: 0 })),
    }));
  },

  // === Таймер ===
  timerRunning: false,
  timerSeconds: 60,
  startTimer: () => set({ timerRunning: true, timerSeconds: 60 }),
  stopTimer: () => set({ timerRunning: false }),
  tickTimer: () => {
    const state = get();
    if (!state.timerRunning) return;
    if (state.timerSeconds <= 1) {
      // Время вышло — автоматически "не ответили"
      set({ timerRunning: false, timerSeconds: 0 });
      const currentTeamId = state.roundOrder[state.currentTeamIndex];
      if (currentTeamId && state.openQuestion) {
        state.answerQuestion(currentTeamId, 'no-answer');
      }
    } else {
      set({ timerSeconds: state.timerSeconds - 1 });
    }
  },

  // === Отсев ===
  eliminationMode: false,
  eliminatedIds: [],
  toggleElimination: (teamId) => {
    set((state) => {
      const isSelected = state.eliminatedIds.includes(teamId);
      return {
        eliminatedIds: isSelected
          ? state.eliminatedIds.filter((id) => id !== teamId)
          : [...state.eliminatedIds, teamId],
      };
    });
  },
  confirmElimination: () => {
    const state = get();
    const nextRound = state.currentRound + 1;

    // Авто-конвертация всех минут в баллы перед переходом
    const teamsWithConverted = state.teams.map((t) => ({
      ...t,
      score: t.score + t.bonusMinutes * 100,
      bonusMinutes: 0,
    }));

    // Определяем победителя текущего раунда (уже с конвертированными минутами)
    const activeTeams = teamsWithConverted
      .filter((t) => t.isActive && t.eliminatedInRound === null && !state.eliminatedIds.includes(t.id))
      .sort((a, b) => b.score - a.score);
    const winner = activeTeams.length > 0 ? activeTeams[0].id : null;

    set({
      teams: teamsWithConverted.map((t) => {
        let updated = { ...t };
        if (state.eliminatedIds.includes(t.id)) {
          updated = { ...updated, eliminatedInRound: state.currentRound, isActive: false };
        }
        if (t.id === winner) {
          updated = { ...updated, roundWins: [...updated.roundWins, state.currentRound] };
        }
        // Сброс очков для нового раунда
        updated = { ...updated, score: 0 };
        return updated;
      }),
      eliminationMode: false,
      eliminatedIds: [],
      screen: 'draw-order',
      currentRound: nextRound,
      roundStarted: false,
      questionStates: {},
      openQuestionId: null,
      openQuestion: null,
      openQuestionAttempts: [],
      currentTeamIndex: 0,
      roundOrder: [],
    }));
  },

  // === Сохранение ===
  saveGame: () => {
    const state = get();
    const saved: SavedGame = {
      version: CURRENT_VERSION,
      timestamp: new Date().toISOString(),
      screen: state.screen,
      teams: state.teams,
      currentRound: state.currentRound,
      questionStates: state.questionStates,
      currentTeamIndex: state.currentTeamIndex,
      roundOrder: state.roundOrder,
      openQuestionId: state.openQuestionId,
      openQuestionAttempts: state.openQuestionAttempts,
      roundStarted: state.roundStarted,
      timerSeconds: state.timerSeconds,
      eliminationMode: state.eliminationMode,
      eliminatedIds: state.eliminatedIds,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
  },
  loadGame: () => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    try {
      const saved: SavedGame = JSON.parse(raw);
      // Восстанавливаем объект вопроса, если был открыт
      let openQuestion = null;
      if (saved.openQuestionId) {
        const allQuestions = getAllQuestions(saved.currentRound);
        openQuestion = allQuestions.find((q) => q.id === saved.openQuestionId) || null;
      }
      set({
        screen: (saved.screen as Screen) || (saved.roundStarted ? 'game-board' : 'start'),
        teams: saved.teams,
        currentRound: saved.currentRound,
        questionStates: saved.questionStates,
        currentTeamIndex: saved.currentTeamIndex,
        roundOrder: saved.roundOrder,
        openQuestionId: saved.openQuestionId,
        openQuestion,
        openQuestionAttempts: saved.openQuestionAttempts,
        roundStarted: saved.roundStarted,
        timerSeconds: saved.timerSeconds ?? 60,
        eliminationMode: saved.eliminationMode ?? false,
        eliminatedIds: saved.eliminatedIds ?? [],
      });
      return true;
    } catch {
      return false;
    }
  },
  hasSavedGame: () => {
    return localStorage.getItem(SAVE_KEY) !== null;
  },
  deleteSave: () => {
    localStorage.removeItem(SAVE_KEY);
  },
  resetGame: () => {
    set({
      screen: 'start',
      teams: [],
      currentRound: 1,
      roundStarted: false,
      questionStates: {},
      openQuestionId: null,
      openQuestion: null,
      openQuestionAttempts: [],
      currentTeamIndex: 0,
      roundOrder: [],
      timerRunning: false,
      timerSeconds: 60,
      eliminationMode: false,
      eliminatedIds: [],
    });
    localStorage.removeItem(SAVE_KEY);
  },
}));
