import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export function DrawOrder() {
  const { teams, roundOrder, setRoundOrder, startRound, setScreen } = useGameStore();
  const [order, setOrder] = useState<string[]>([...roundOrder]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...order];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === order.length - 1) return;
    const newOrder = [...order];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setOrder(newOrder);
  };

  const handleStart = () => {
    setRoundOrder(order);
    startRound();
  };

  return (
    <div className="min-h-screen bg-night-sky p-8">
      <div className="stars" />
      <div className="max-w-xl mx-auto relative z-10">
        <h1 className="text-3xl font-title text-gold mb-2 text-center">Жеребьёвка</h1>
        <p className="text-pergament/70 text-center mb-6">
          Раунд {useGameStore.getState().currentRound} — установите порядок хода команд
        </p>

        <div className="space-y-2 mb-8">
          {order.map((teamId, index) => {
            const team = teams.find((t) => t.id === teamId);
            if (!team || !team.isActive) return null;
            return (
              <div
                key={teamId}
                className="flex items-center gap-3 bg-night/50 border border-gold/20 rounded-lg p-3"
              >
                <span className="text-gold font-bold w-8 text-center text-xl">{index + 1}</span>
                <span className="flex-1 text-pergament text-lg">{team.name}</span>
                <span className="text-gold/50 text-sm">({team.score} баллов)</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="px-2 py-1 text-gold/50 hover:text-gold disabled:opacity-20 text-xl"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === order.length - 1}
                    className="px-2 py-1 text-gold/50 hover:text-gold disabled:opacity-20 text-xl"
                  >
                    ↓
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setScreen('team-manager')}
            className="px-6 py-3 border border-gold/30 text-pergament rounded-lg hover:bg-gold/10 transition-colors"
          >
            Назад
          </button>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-gold text-night font-bold rounded-lg hover:bg-gold-light transition-colors animate-pulse-glow"
          >
            Начать раунд!
          </button>
        </div>
      </div>
    </div>
  );
}
