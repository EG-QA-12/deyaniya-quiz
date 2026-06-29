import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export function QuestionModal() {
  const {
    openQuestion, openQuestionAttempts, teams, roundOrder, currentTeamIndex,
    timerRunning, timerSeconds, tickTimer, answerQuestion, answerForTeam,
    closeQuestion, questionStates,
  } = useGameStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentTeam = teams.find((t) => t.id === roundOrder[currentTeamIndex]);

  // Таймер
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning, tickTimer]);

  if (!openQuestion) return null;

  const isAnswered = questionStates[openQuestion.id]?.isAnswered;
  const answeredBy = questionStates[openQuestion.id]?.answeredBy;
  const answeredTeam = teams.find((t) => t.id === answeredBy);

  // Команды, которые ещё не пробовали ответить на этот вопрос
  const remainingTeams = teams.filter(
    (t) => t.isActive && t.eliminatedInRound === null && !openQuestionAttempts.includes(t.id)
  );

  const handleAnswer = (result: 'correct' | 'wrong' | 'no-answer') => {
    const teamId = roundOrder[currentTeamIndex];
    if (!teamId) return;
    answerQuestion(teamId, result);
  };

  const handleAnswerForTeam = (teamId: string, result: 'correct' | 'wrong') => {
    answerForTeam(teamId, openQuestion.id, result);
  };

  const timerPercent = (timerSeconds / 60) * 100;
  const timerColor = timerSeconds > 20 ? 'bg-green' : timerSeconds > 10 ? 'bg-gold' : 'bg-red';

  return (
    <div className="fixed inset-0 bg-night/95 flex items-center justify-center z-50">
      <div className="max-w-3xl w-full mx-4">
        {/* Таймер */}
        <div className="mb-6">
          <div className="flex justify-between text-pergament text-sm mb-1">
            <span>Время на ответ</span>
            <span className={timerSeconds <= 10 ? 'text-red font-bold animate-pulse' : ''}>
              {timerSeconds} сек
            </span>
          </div>
          <div className="h-2 bg-night rounded-full overflow-hidden border border-gold/20">
            <div
              className={`h-full ${timerColor} transition-all duration-1000 rounded-full`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>

        {/* Категория и стоимость */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{openQuestion.categoryIcon}</span>
          <span className="text-gold/70 text-sm">{openQuestion.category}</span>
          <span className="text-gold font-bold text-lg ml-auto">
            {openQuestion.value} баллов
            {openQuestion.isCatInBag && <span className="ml-2 text-purple">🎭 Кот в мешке</span>}
          </span>
        </div>

        {/* Вопрос */}
        <div className="bg-night/60 border border-gold/30 rounded-xl p-8 mb-6">
          <p className="text-pergament text-2xl leading-relaxed text-center">
            {openQuestion.text}
          </p>
        </div>

        {/* Ответ (если уже отвечали) */}
        {isAnswered && (
          <div className="bg-green/10 border border-green/30 rounded-xl p-4 mb-6">
            <p className="text-green text-center">
              ✅ Правильный ответ: <strong>{openQuestion.answer}</strong>
              {answeredTeam && <span> — ответила команда <strong>{answeredTeam.name}</strong></span>}
            </p>
          </div>
        )}

        {/* Кнопки для ведущего */}
        {!isAnswered && (
          <div className="space-y-4">
            {/* Основные кнопки */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleAnswer('correct')}
                className="px-8 py-4 bg-green hover:bg-green/80 text-white font-bold text-lg rounded-xl transition-all hover:scale-105"
              >
                ✅ Верно (+{openQuestion.value})
              </button>
              <button
                onClick={() => handleAnswer('wrong')}
                className="px-8 py-4 bg-red hover:bg-red/80 text-white font-bold text-lg rounded-xl transition-all hover:scale-105"
              >
                ❌ Неверно (-{openQuestion.value})
              </button>
              <button
                onClick={() => handleAnswer('no-answer')}
                className="px-8 py-4 bg-night border border-gold/30 text-pergament text-lg rounded-xl hover:bg-gold/10 transition-all"
              >
                ⏭️ Не ответили (0)
              </button>
            </div>

            {/* Засчитать другой команде */}
            {remainingTeams.length > 0 && (
              <div className="border-t border-gold/20 pt-4">
                <p className="text-gold/70 text-sm text-center mb-2">
                  Засчитать ответ другой команде (не сбивает очерёдность):
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {remainingTeams.map((team) => (
                    <div key={team.id} className="flex gap-1">
                      <span className="text-pergament text-sm px-2 py-1 bg-night/50 rounded">
                        {team.name}
                      </span>
                      <button
                        onClick={() => handleAnswerForTeam(team.id, 'correct')}
                        className="px-3 py-1 bg-green/20 hover:bg-green/40 text-green text-sm rounded transition-colors"
                      >
                        +{openQuestion.value}
                      </button>
                      <button
                        onClick={() => handleAnswerForTeam(team.id, 'wrong')}
                        className="px-3 py-1 bg-red/20 hover:bg-red/40 text-red text-sm rounded transition-colors"
                      >
                        -{openQuestion.value}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Кнопка закрытия */}
        {isAnswered && (
          <div className="text-center mt-6">
            <button
              onClick={closeQuestion}
              className="px-8 py-3 bg-gold text-night font-bold text-lg rounded-xl hover:bg-gold-light transition-all hover:scale-105"
            >
              Закрыть вопрос
            </button>
          </div>
        )}

        {/* Информация об очередности */}
        <div className="mt-4 text-center text-pergament/50 text-sm">
          {!isAnswered && currentTeam && (
            <span>Ожидается ответ команды: <strong className="text-gold">{currentTeam.name}</strong></span>
          )}
          {openQuestionAttempts.length > 0 && (
            <span className="ml-4">
              Пробовали: {openQuestionAttempts.map((id) => teams.find((t) => t.id === id)?.name).join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
