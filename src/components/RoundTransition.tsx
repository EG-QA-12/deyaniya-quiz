import { useGameStore } from '../store/gameStore';

export function RoundTransition() {
  const {
    teams, currentRound, eliminatedIds, toggleElimination,
    confirmElimination, setScreen, convertMinutesToScore, convertAllMinutes,
  } = useGameStore();

  const activeTeams = teams
    .filter((t) => t.isActive && t.eliminatedInRound === null)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-night-sky p-8">
      <div className="stars" />
      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl font-title text-gold mb-2 text-center">
          Раунд {currentRound} завершён!
        </h1>
        <p className="text-pergament/70 text-center mb-6">
          Отметьте команды, которые выбывают (по умолчанию — 3 худших)
        </p>

        <div className="space-y-2 mb-6">
          {activeTeams.map((team, index) => {
            const isEliminated = eliminatedIds.includes(team.id);
            const place = team.roundPlaces[currentRound];
            const placeEmoji = place === 1 ? '🥇' : place === 2 ? '🥈' : place === 3 ? '🥉' : '';
            return (
              <div
                key={team.id}
                onClick={() => toggleElimination(team.id)}
                className={`
                  flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all
                  ${isEliminated
                    ? 'bg-red/10 border-red/40 text-pergament/50'
                    : place === 1
                      ? 'bg-gold/10 border-gold/40 text-pergament'
                      : place === 2
                        ? 'bg-purple/10 border-purple/40 text-pergament'
                        : place === 3
                          ? 'bg-purple/5 border-purple/20 text-pergament'
                          : 'bg-night/60 border-gold/20 text-pergament hover:border-gold'
                  }
                `}
              >
                <span className="font-bold text-xl w-8 text-center text-gold">{placeEmoji || (index + 1)}</span>
                <span className="flex-1 text-lg">{team.name}</span>
                {place && <span className="text-gold text-sm mr-2">{place}-е место</span>}
                <span className="text-purple text-sm mr-2" title="Бонусные минуты">
                  {team.bonusMinutes > 0 ? `⏱${team.bonusMinutes} мин` : ''}
                </span>
                <span className={`font-bold text-lg ${team.score >= 0 ? 'text-green' : 'text-red'}`}>
                  {team.score > 0 ? '+' : ''}{team.score}
                </span>
                {isEliminated && <span className="text-red font-bold">ВЫБЫВАЕТ</span>}
              </div>
            );
          })}
        </div>

        {/* Конвертация минут */}
        {activeTeams.some((t) => t.bonusMinutes > 0) && (
          <div className="border border-gold/20 rounded-lg p-4 mb-6 bg-night/40">
            <h3 className="text-gold font-semibold mb-3 text-center">Конвертация бонусных минут</h3>
            <p className="text-pergament/60 text-sm text-center mb-3">1 минута = 100 баллов</p>
            <div className="space-y-2">
              {activeTeams.filter((t) => t.bonusMinutes > 0).map((team) => (
                <div key={team.id} className="flex items-center justify-between gap-3">
                  <span className="text-pergament">{team.name}</span>
                  <span className="text-purple">⏱ {team.bonusMinutes} мин = {team.bonusMinutes * 100} баллов</span>
                  <button
                    onClick={() => convertMinutesToScore(team.id, team.bonusMinutes)}
                    className="px-4 py-1 bg-gold/80 hover:bg-gold text-night text-sm rounded transition-colors"
                  >
                    Конвертировать
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <button
                onClick={convertAllMinutes}
                className="px-6 py-2 bg-purple/80 hover:bg-purple text-white text-sm rounded transition-colors"
              >
                Конвертировать всё
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setScreen('game-board')}
            className="px-6 py-3 border border-gold/30 text-pergament rounded-lg hover:bg-gold/10 transition-colors"
          >
            Вернуться
          </button>
          <button
            onClick={confirmElimination}
            className="px-8 py-3 bg-gold text-night font-bold rounded-lg hover:bg-gold-light transition-colors"
          >
            {currentRound === 2
              ? 'Начать финальный раунд!'
              : 'Начать следующий раунд!'}
          </button>
        </div>
      </div>
    </div>
  );
}
