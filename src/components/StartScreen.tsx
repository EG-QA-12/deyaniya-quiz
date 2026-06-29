import { useGameStore } from '../store/gameStore';

export function StartScreen() {
  const { hasSavedGame, loadGame, resetGame, setScreen } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-night-sky">
      <div className="stars" />
      <h1 className="text-6xl font-title text-gold mb-4 text-center">
        Своя игра
      </h1>
      <h2 className="text-3xl font-title text-gold-light mb-8 text-center">
        Деяния Апостолов
      </h2>
      <p className="text-pergament text-lg mb-12 text-center max-w-xl">
        Библейская викторина для подростков 12–15 лет
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setScreen('team-manager')}
          className="px-8 py-4 bg-purple hover:bg-purple-light text-white text-xl rounded-lg transition-all hover:scale-105 font-semibold"
        >
          Новая игра
        </button>

        {hasSavedGame() && (
          <button
            onClick={() => loadGame()}
            className="px-8 py-4 bg-gold hover:bg-gold-light text-night text-xl rounded-lg transition-all hover:scale-105 font-semibold"
          >
            Продолжить игру
          </button>
        )}

        {hasSavedGame() && (
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-transparent border-2 border-red text-red hover:bg-red/10 text-lg rounded-lg transition-all"
          >
            Сбросить сохранение
          </button>
        )}
      </div>
    </div>
  );
}
