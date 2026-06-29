import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { TeamManager } from './components/TeamManager';
import { DrawOrder } from './components/DrawOrder';
import { GameBoard } from './components/GameBoard';
import { QuestionModal } from './components/QuestionModal';
import { ScoreBoard } from './components/ScoreBoard';
import { RoundTransition } from './components/RoundTransition';
import { FinalScreen } from './components/FinalScreen';

function App() {
  const { screen, openQuestion } = useGameStore();

  return (
    <>
      {screen === 'start' && <StartScreen />}
      {screen === 'team-manager' && <TeamManager />}
      {screen === 'draw-order' && <DrawOrder />}
      {screen === 'game-board' && <GameBoard />}
      {screen === 'scoreboard' && <ScoreBoard />}
      {screen === 'round-transition' && <RoundTransition />}
      {screen === 'final' && <FinalScreen />}

      {/* QuestionModal поверх всего */}
      {screen === 'question' && openQuestion && <QuestionModal />}
    </>
  );
}

export default App;
