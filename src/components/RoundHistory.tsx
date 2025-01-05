import { useGameStore } from '../store/gameStore';
import { formatDate, formatCurrency } from '../utils/format';

export function RoundHistory() {
  const { rounds, players } = useGameStore();
  const totalRounds = rounds.length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Round History</h2>
        <span className="text-sm text-gray-600">Total Rounds: {totalRounds}</span>
      </div>
      
      <div className="space-y-4">
        {rounds.slice().reverse().map((round, index) => {
          const roundNumber = totalRounds - index;
          const dealer = players.find(p => p.id === round.dealerId);
          const dealerResult = round.dealerAmount >= 0 ? 'Won' : 'Lost';
          
          return (
            <div key={round.id} className="p-4 bg-gray-50 rounded space-y-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Round #{roundNumber}</span>
                <span className="text-sm text-gray-600">{formatDate(round.timestamp)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Dealer: {dealer?.name}</span>
                <span className={round.dealerAmount >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {dealerResult} {formatCurrency(Math.abs(round.dealerAmount))}
                </span>
              </div>

              <div className="space-y-1 mt-2">
                {round.bets.map((bet) => {
                  const player = players.find(p => p.id === bet.playerId);
                  const result = bet.isWin 
                    ? `Won ${formatCurrency(bet.amount * bet.multiplier)} (${bet.multiplier}x bet of ${formatCurrency(bet.amount)})`
                    : `Lost ${formatCurrency(bet.amount * bet.multiplier)} (${bet.multiplier}x bet of ${formatCurrency(bet.amount)})`;
                  
                  return (
                    <div key={`${round.id}-${bet.playerId}`} className="text-sm flex justify-between">
                      <span className="font-medium">{player?.name}</span>
                      <span className={bet.isWin ? 'text-green-600' : 'text-red-600'}>
                        {result}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}