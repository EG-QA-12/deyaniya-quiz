import { useGameStore } from '../store/gameStore';
import { round1 } from '../data/round1';
import { round2 } from '../data/round2';
import { round3 } from '../data/round3';
import type { CategoryData } from '../data/types';
import { CategoryIcon } from './CategoryIcon';

function getRoundData(round: number): CategoryData[] {
  switch (round) {
    case 1: return round1;
    case 2: return round2;
    case 3: return round3;
    default: return round1;
  }
}

export function GameBoard() {
  const {
    currentRound, teams, roundOrder, currentTeamIndex,
    questionStates, selectQuestion, setScreen, saveGame, finishRound,
  } = useGameStore();

  const roundData = getRoundData(currentRound);
  const values = [100, 200, 300, 400, 500];
  const currentTeam = teams.find((t) => t.id === roundOrder[currentTeamIndex]);

  const activeTeams = teams.filter((t) => t.isActive && t.eliminatedInRound === null)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-night-sky p-4 flex flex-col">
      <div className="stars" />

      {/* Верхняя панель */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h1 className="text-2xl font-title text-gold">
          Раунд {currentRound}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => { saveGame(); setScreen('scoreboard'); }}
            className="px-4 py-2 bg-purple/80 hover:bg-purple text-white rounded-lg text-sm transition-colors"
          >
            🏆 Таблица
          </button>
          <button
            onClick={() => { saveGame(); }}
            className="px-4 py-2 border border-gold/30 text-gold rounded-lg text-sm hover:bg-gold/10 transition-colors"
          >
            💾 Сохранить
          </button>
          <button
            onClick={() => {
              saveGame();
              finishRound();
            }}
            className="px-4 py-2 bg-red/80 hover:bg-red text-white rounded-lg text-sm transition-colors"
          >
            🏁 Завершить раунд
          </button>
        </div>
      </div>

      {/* Игровое поле */}
      <div className="flex-1 grid grid-cols-7 gap-2 relative z-10">
        {/* Заголовки категорий */}
        {roundData.map((cat) => (
          <div key={cat.name} className="text-center bg-night/60 border border-gold/30 rounded-t-lg overflow-hidden">
            <div className="w-full aspect-[2/1] overflow-hidden">
              <CategoryIcon name={cat.name} />
            </div>
            <div className="text-gold font-title text-2xl leading-tight px-1 py-1 min-h-[2.5rem] flex items-center justify-center uppercase tracking-wider">
              {cat.name}
            </div>
          </div>
        ))}

        {/* Ячейки вопросов */}
        {values.map((value) =>
          roundData.map((cat) => {
            const question = cat.questions.find((q) => q.value === value);
            if (!question) return <div key={`${cat.name}-${value}`} className="bg-night/20 rounded" />;

            const state = questionStates[question.id];
            const isAnswered = state?.isAnswered;
            const isOpen = useGameStore.getState().openQuestionId === question.id;

            return (
              <button
                key={question.id}
                onClick={() => {
                  if (!isAnswered && !isOpen) selectQuestion(question.id);
                }}
                disabled={isAnswered || isOpen}
                className={`
                  p-3 rounded-lg text-center font-bold text-xl transition-all
                  ${isAnswered
                    ? 'bg-night/30 text-gold/20 cursor-not-allowed'
                    : isOpen
                      ? 'bg-purple/50 border-2 border-gold animate-pulse-glow'
                      : 'bg-night/60 border border-gold/30 hover:bg-gold/20 hover:border-gold hover:scale-105 cursor-pointer'
                  }
                  ${question.isCatInBag && !isAnswered ? 'border-purple/50' : ''}
                `}
              >
                {isAnswered ? '✓' : value}
              </button>
            );
          })
        )}
      </div>

      {/* Нижняя панель — очередь и счёт */}
      <div className="mt-4 relative z-10">
        <div className="flex justify-between items-center bg-night/60 border border-gold/20 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <span className="text-gold/70 text-sm">Ход команды:</span>
            <span className="text-pergament font-bold text-lg">
              {currentTeam?.name || '—'}
            </span>
          </div>
          <div className="flex gap-4 text-sm flex-wrap justify-end">
            {activeTeams.map((team) => (
              <span
                key={team.id}
                className={`px-2 py-1 rounded ${
                  team.id === currentTeam?.id
                    ? 'bg-gold/20 text-gold font-bold'
                    : 'text-pergament/60'
                }`}
              >
                {team.name}: {team.score}
                {team.bonusMinutes > 0 && (
                  <span className="ml-1 text-purple" title="Бонусные минуты">⏱{team.bonusMinutes}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
