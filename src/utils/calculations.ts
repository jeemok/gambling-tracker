import type { Bet } from '../types/game';

export function calculateDealerAmount(bets: Bet[]): number {
  return bets.reduce((total, bet) => {
    if (bet.isWin) {
      // When player wins, dealer pays out the winnings (bet amount * multiplier)
      return total - (bet.amount * bet.multiplier);
    } else {
      // When player loses, dealer collects the bet amount times the multiplier
      return total + (bet.amount * bet.multiplier);
    }
  }, 0);
}

export function calculatePlayerAmount(bet: Bet): number {
  if (bet.isWin) {
    // Player wins their bet amount times the multiplier
    return bet.amount * bet.multiplier;
  } else {
    // Player loses their bet amount times the multiplier
    return -(bet.amount * bet.multiplier);
  }
}