import { useGameStore } from '../store/gameStore';

export function FinalScreen() {
  const { teams, resetGame, convertMinutesToScore, convertAllMinutes } = useGameStore();

  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const activeTeams = sorted.filter((t) => t.isActive);
  const top3 = activeTeams.slice(0, 3);

  const medals = ['🥇', '🥈', '🥉'];
  const podiumHeights = ['h-48', 'h-36', 'h-28'];

  return (
    <div className="min-h-screen bg-night-sky flex flex-col items-center justify-center p-8">
      <div className="stars" />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-title text-gold mb-4">Игра окончена!</h1>
        <p className="text-pergament/70 text-xl mb-12">Благословение Господне — оно обогащает</p>

        {/* Пьедестал */}
        <div className="flex items-end justify-center gap-6 mb-8">
          {/* 2-е место */}
          {top3[1] && (
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2">{medals[1]}</span>
              <span className="text-pergament font-bold text-lg mb-2">{top3[1].name}</span>
              <span className="text-gold text-xl font-bold mb-2">{top3[1].score} баллов</span>
              <div className={`w-24 ${podiumHeights[1]} bg-purple/60 border-2 border-purple rounded-t-lg flex items-center justify-center`}>
                <span className="text-white text-2xl font-bold">2</span>
              </div>
            </div>
          )}

          {/* 1-е место */}
          {top3[0] && (
            <div className="flex flex-col items-center -mt-8">
              <span className="text-6xl mb-2 animate-bounce">{medals[0]}</span>
              <span className="text-gold font-bold text-2xl mb-2">{top3[0].name}</span>
              <span className="text-gold text-2xl font-bold mb-2">{top3[0].score} баллов</span>
              <div className={`w-28 ${podiumHeights[0]} bg-gold/60 border-2 border-gold rounded-t-lg flex items-center justify-center`}>
                <span className="text-night text-3xl font-bold">1</span>
              </div>
            </div>
          )}

          {/* 3-е место */}
          {top3[2] && (
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2">{medals[2]}</span>
              <span className="text-pergament font-bold text-lg mb-2">{top3[2].name}</span>
              <span className="text-gold text-xl font-bold mb-2">{top3[2].score} баллов</span>
              <div className={`w-24 ${podiumHeights[2]} bg-purple/40 border-2 border-purple/60 rounded-t-lg flex items-center justify-center`}>
                <span className="text-white text-2xl font-bold">3</span>
              </div>
            </div>
          )}
        </div>

        {/* Конвертация минут */}
        {activeTeams.some((t) => t.bonusMinutes > 0) && (
          <div className="border border-gold/20 rounded-lg p-4 mb-6 max-w-md mx-auto bg-night/40">
            <h3 className="text-gold font-semibold mb-2 text-center">Конвертация бонусных минут</h3>
            <p className="text-pergament/60 text-sm text-center mb-3">1 минута = 100 баллов</p>
            <div className="space-y-2">
              {activeTeams.filter((t) => t.bonusMinutes > 0).map((team) => (
                <div key={team.id} className="flex items-center justify-between gap-3">
                  <span className="text-pergament text-sm">{team.name}</span>
                  <span className="text-purple text-sm">⏱ {team.bonusMinutes} мин = {team.bonusMinutes * 100} баллов</span>
                  <button
                    onClick={() => convertMinutesToScore(team.id, team.bonusMinutes)}
                    className="px-3 py-1 bg-gold/80 hover:bg-gold text-night text-xs rounded transition-colors"
                  >
                    Конвертировать
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <button
                onClick={convertAllMinutes}
                className="px-4 py-1 bg-purple/80 hover:bg-purple text-white text-xs rounded transition-colors"
              >
                Конвертировать всё
              </button>
            </div>
          </div>
        )}

        {/* Полная таблица */}
        <div className="max-w-md mx-auto mb-8">
          {sorted.map((team, index) => (
            <div
              key={team.id}
              className="flex items-center gap-3 p-2 border-b border-gold/10 text-pergament/70"
            >
              <span className="w-6 text-gold text-sm">{index + 1}</span>
              <span className="flex-1 text-left">
                {team.name}
                {team.roundWins.length > 0 && (
                  <span className="ml-2 text-gold text-xs" title="Победы в раундах">
                    {'🏆'.repeat(team.roundWins.length)}
                  </span>
                )}
              </span>
              {team.bonusMinutes > 0 && (
                <span className="text-purple text-xs mr-1">⏱{team.bonusMinutes}</span>
              )}
              <span className={team.score >= 0 ? 'text-green' : 'text-red'}>
                {team.score}
              </span>
              {team.eliminatedInRound && (
                <span className="text-red/40 text-xs ml-1">
                  (выбыли)
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="px-8 py-4 bg-gold text-night font-bold text-xl rounded-xl hover:bg-gold-light transition-all hover:scale-105"
        >
          Новая игра
        </button>
      </div>
    </div>
  );
}
