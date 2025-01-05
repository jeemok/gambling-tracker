import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from './ui/Button';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { formatCurrency } from '../utils/format';

export const GameSummary: React.FC = () => {
  const { getPlayerTotals, resetGame } = useGameStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const playerTotals = getPlayerTotals();

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    resetGame();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Game Summary</h2>
      
      <div className="space-y-2">
        {playerTotals.map((total) => (
          <div key={total.playerId} className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium">{total.name}</h3>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <div>
                <p>Total Won: {formatCurrency(total.totalWin)}</p>
                <p>Total Lost: {formatCurrency(total.totalLoss)}</p>
              </div>
              <div className={`text-right font-semibold ${
                total.netAmount >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                Net: {formatCurrency(total.netAmount)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="destructive"
        onClick={handleReset}
        className="w-full"
      >
        Reset Game
      </Button>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetConfirm(false)}
        title="Reset Game"
        message="Are you sure you want to reset the game? This will clear all players, rounds, and history. This action cannot be undone."
      />
    </div>
  );
};