import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export function TeamManager() {
  const { teams, addTeam, removeTeam, updateTeamName, setTeams, setScreen } = useGameStore();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    const name = newName.trim();
    if (!name) return;
    addTeam(name);
    setNewName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const saveEdit = (id: string) => {
    const name = editName.trim();
    if (!name) return;
    updateTeamName(id, name);
    setEditingId(null);
  };

  const moveTeam = (fromIndex: number, toIndex: number) => {
    const newTeams = [...teams];
    const [moved] = newTeams.splice(fromIndex, 1);
    newTeams.splice(toIndex, 0, moved);
    setTeams(newTeams);
  };

  const canStart = teams.length >= 10;

  return (
    <div className="min-h-screen bg-night-sky p-8">
      <div className="stars" />
      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-3xl font-title text-gold mb-6 text-center">Управление командами</h1>
        <p className="text-pergament text-center mb-6">
          Добавьте команды (от 10 до 15). Перетаскивайте для изменения порядка жеребьёвки.
        </p>

        {/* Добавление */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Название команды"
            className="flex-1 px-4 py-3 rounded-lg bg-night border border-gold/30 text-pergament text-lg focus:outline-none focus:border-gold"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gold text-night font-bold rounded-lg hover:bg-gold-light transition-colors"
          >
            Добавить
          </button>
        </div>

        {/* Список команд */}
        <div className="space-y-2 mb-8">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className="flex items-center gap-3 bg-night/50 border border-gold/20 rounded-lg p-3"
            >
              <span className="text-gold font-bold w-8 text-center">{index + 1}</span>

              {editingId === team.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(team.id)}
                  className="flex-1 px-3 py-1 rounded bg-night border border-gold/30 text-pergament"
                  autoFocus
                  onBlur={() => saveEdit(team.id)}
                />
              ) : (
                <span
                  className="flex-1 text-pergament text-lg cursor-pointer hover:text-gold"
                  onClick={() => startEdit(team.id, team.name)}
                >
                  {team.name}
                </span>
              )}

              <span className="text-gold/50 text-sm">({team.score} баллов)</span>

              <div className="flex gap-1">
                <button
                  onClick={() => moveTeam(index, index - 1)}
                  disabled={index === 0}
                  className="px-2 py-1 text-gold/50 hover:text-gold disabled:opacity-20"
                  title="Выше"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveTeam(index, index + 1)}
                  disabled={index === teams.length - 1}
                  className="px-2 py-1 text-gold/50 hover:text-gold disabled:opacity-20"
                  title="Ниже"
                >
                  ↓
                </button>
              </div>

              <button
                onClick={() => removeTeam(team.id)}
                className="px-3 py-1 text-red hover:bg-red/10 rounded transition-colors"
                title="Удалить"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {teams.length > 0 && (
          <p className="text-pergament/50 text-center mb-4">
            Команд: {teams.length} {canStart ? '✅' : `(нужно ещё ${10 - teams.length})`}
          </p>
        )}

        {/* Кнопки */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setScreen('start')}
            className="px-6 py-3 border border-gold/30 text-pergament rounded-lg hover:bg-gold/10 transition-colors"
          >
            Назад
          </button>
          <button
            onClick={() => {
              useGameStore.getState().setRoundOrder(teams.map((t) => t.id));
              setScreen('draw-order');
            }}
            disabled={!canStart}
            className="px-8 py-3 bg-gold text-night font-bold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Жеребьёвка →
          </button>
        </div>
      </div>
    </div>
  );
}
