import * as React from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from './ui/Button';
import { useBetForm } from '../hooks/useBetForm';
import { calculateDealerAmount } from '../utils/calculations';

const MULTIPLIER_OPTIONS = [1, 2, 3, 5, 7];

export const RoundForm: React.FC = () => {
  const { players, currentDealerId, addRound, lastBets } = useGameStore();
  const { 
    bets, 
    updateBet, 
    handleMultiplierClick, 
    handleCustomMultiplier,
    toggleCustomMultiplier,
    resetBetsAfterSubmit 
  } = useBetForm(lastBets);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDealerId) return;

    const validBets = Object.entries(bets)
      .filter(([playerId, bet]) => playerId !== currentDealerId && bet.amount && !isNaN(Number(bet.amount)))
      .map(([playerId, bet]) => ({
        playerId,
        amount: Number(bet.amount),
        multiplier: Number(bet.multiplier) || 1,
        isWin: bet.isWin,
      }));

    if (validBets.length > 0) {
      const dealerAmount = calculateDealerAmount(validBets);
      
      addRound({
        dealerId: currentDealerId,
        bets: validBets,
        dealerAmount,
      });
      resetBetsAfterSubmit();
    }
  };

  if (!currentDealerId) {
    return <p className="text-red-500">Please select a dealer first</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">New Round</h2>
      
      {players
        .filter((player) => player.id !== currentDealerId)
        .map((player) => (
          <div key={player.id} className="p-4 bg-gray-50 rounded space-y-2">
            <h3 className="font-medium">{player.name}</h3>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Bet amount"
                value={bets[player.id]?.amount || ''}
                onChange={(e) => updateBet(player.id, 'amount', e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
              />
              <Button
                type="button"
                variant={bets[player.id]?.isWin ? 'default' : 'secondary'}
                onClick={() => updateBet(player.id, 'isWin', !bets[player.id]?.isWin)}
              >
                {bets[player.id]?.isWin ? 'Won' : 'Lost'}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                {MULTIPLIER_OPTIONS.map((mult) => (
                  <Button
                    key={mult}
                    type="button"
                    size="sm"
                    variant={bets[player.id]?.multiplier === mult ? 'default' : 'secondary'}
                    onClick={() => handleMultiplierClick(player.id, mult)}
                  >
                    {mult}x
                  </Button>
                ))}
                <Button
                  type="button"
                  size="sm"
                  variant={bets[player.id]?.showCustomMultiplier ? 'default' : 'secondary'}
                  onClick={() => toggleCustomMultiplier(player.id)}
                >
                  Custom
                </Button>
              </div>
              
              {bets[player.id]?.showCustomMultiplier && (
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="Custom multiplier"
                  value={bets[player.id]?.customMultiplier || ''}
                  onChange={(e) => handleCustomMultiplier(player.id, e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              )}
            </div>
          </div>
        ))}
      
      <Button type="submit" className="w-full">
        Save Round
      </Button>
    </form>
  );
}