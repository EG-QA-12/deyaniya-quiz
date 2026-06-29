export interface Question {
  id: string;
  round: number;
  category: string;
  categoryIcon: string;
  value: number;
  text: string;
  answer: string;
  isCatInBag: boolean;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  bonusMinutes: number;      // Накопленные минуты (досрочные ответы)
  roundWins: number[];       // Номера раундов, которые команда выиграла
  roundPlaces: Record<number, number>; // {номерРаунда: место} — 1, 2, 3
  isActive: boolean;
  eliminatedInRound: number | null;
}

export interface QuestionState {
  id: string;
  isAnswered: boolean;
  answeredBy: string | null;
  answeredCorrectly: boolean | null;
}

export interface RoundData {
  round: number;
  categories: CategoryData[];
}

export interface CategoryData {
  name: string;
  icon: string;
  questions: Question[];
}

export interface SavedGame {
  version: number;
  timestamp: string;
  screen: string;
  teams: Team[];
  currentRound: number;
  questionStates: Record<string, QuestionState>;
  currentTeamIndex: number;
  roundOrder: string[];
  openQuestionId: string | null;
  openQuestionAttempts: string[];
  roundStarted: boolean;
  timerSeconds: number;
  eliminationMode: boolean;
  eliminatedIds: string[];
}
