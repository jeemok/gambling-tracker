import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from './ui/Button';

export const PlayerList: React.FC = () => {
  const { players, addPlayer, removePlayer, currentDealerId, setDealer } = useGameStore();
  const [newPlayerName, setNewPlayerName] = React.useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Players</h2>
      
      <form onSubmit={handleAddPlayer} className="flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Player name"
          className="flex-1 px-3 py-2 border rounded"
        />
        <Button type="submit">Add Player</Button>
      </form>

      <div className="space-y-2">
        {players.map((player) => (
          <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="flex items-center gap-2">
              {player.name}
              {currentDealerId === player.id && (
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  Dealer
                </span>
              )}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setDealer(player.id)}
                disabled={currentDealerId === player.id}
              >
                Set as Dealer
              </Button>
              <Button
                variant="destructive"
                onClick={() => removePlayer(player.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};