import { useGameStore } from '../store/gameStore';

export function ScoreBoard() {
  const { teams, currentRound, setScreen } = useGameStore();

  const sortedTeams = [...teams]
    .filter((t) => t.isActive)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-night-sky p-8">
      <div className="stars" />
      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl font-title text-gold mb-2 text-center">Турнирная таблица</h1>
        <p className="text-pergament/70 text-center mb-6">Раунд {currentRound}</p>

        <div className="space-y-2 mb-8">
          {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                team.eliminatedInRound
                  ? 'bg-night/30 border-red/20 text-pergament/40'
                  : 'bg-night/60 border-gold/20 text-pergament'
              }`}
            >
              <span className={`font-bold text-2xl w-10 text-center ${
                index === 0 && !team.eliminatedInRound ? 'text-gold' : ''
              }`}>
                {index + 1}
              </span>
              <span className="flex-1 text-lg">{team.name}</span>
              <span className={`font-bold text-xl ${
                team.score >= 0 ? 'text-green' : 'text-red'
              }`}>
                {team.score > 0 ? '+' : ''}{team.score}
              </span>
              {team.eliminatedInRound && (
                <span className="text-red/50 text-sm">
                  Выбыли в {team.eliminatedInRound}-м раунде
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setScreen('game-board')}
            className="px-8 py-3 bg-gold text-night font-bold rounded-lg hover:bg-gold-light transition-colors"
          >
            Назад к игре
          </button>
        </div>
      </div>
    </div>
  );
}
