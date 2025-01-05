import { describe, it, expect } from 'vitest';
import { calculateDealerAmount, calculatePlayerAmount } from '../calculations';
import type { Bet } from '../../types/game';

describe('calculateDealerAmount', () => {
  it('should return 0 when there are no bets', () => {
    expect(calculateDealerAmount([])).toBe(0);
  });

  it('should calculate dealer loss when player wins with multiplier', () => {
    const bets: Bet[] = [{
      playerId: '1',
      amount: 100,
      multiplier: 2,
      isWin: true
    }];
    expect(calculateDealerAmount(bets)).toBe(-200); // Dealer pays 2x the bet
  });

  it('should calculate dealer win when player loses with multiplier', () => {
    const bets: Bet[] = [{
      playerId: '1',
      amount: 100,
      multiplier: 2,
      isWin: false
    }];
    expect(calculateDealerAmount(bets)).toBe(200); // Dealer collects 2x the bet
  });

  it('should calculate correct total for multiple bets with different outcomes', () => {
    const bets: Bet[] = [
      { playerId: '1', amount: 100, multiplier: 2, isWin: true },  // Dealer pays 200
      { playerId: '2', amount: 50, multiplier: 3, isWin: false },  // Dealer wins 150
      { playerId: '3', amount: 75, multiplier: 1, isWin: true }    // Dealer pays 75
    ];
    expect(calculateDealerAmount(bets)).toBe(-125); // -200 + 150 - 75
  });
});

describe('calculatePlayerAmount', () => {
  it('should calculate win amount with multiplier', () => {
    const bet: Bet = {
      playerId: '1',
      amount: 100,
      multiplier: 2,
      isWin: true
    };
    expect(calculatePlayerAmount(bet)).toBe(200); // Player wins 2x the bet
  });

  it('should calculate loss amount with multiplier', () => {
    const bet: Bet = {
      playerId: '1',
      amount: 100,
      multiplier: 2,
      isWin: false
    };
    expect(calculatePlayerAmount(bet)).toBe(-200); // Player loses 2x the bet
  });

  it('should handle 1x multiplier correctly', () => {
    const winBet: Bet = {
      playerId: '1',
      amount: 100,
      multiplier: 1,
      isWin: true
    };
    const loseBet: Bet = {
      playerId: '1',
      amount: 100,
      multiplier: 1,
      isWin: false
    };
    expect(calculatePlayerAmount(winBet)).toBe(100);
    expect(calculatePlayerAmount(loseBet)).toBe(-100);
  });

  it('should handle decimal multipliers', () => {
    const bet: Bet = {
      playerId: '1',
      amount: 100,
      multiplier: 1.5,
      isWin: true
    };
    expect(calculatePlayerAmount(bet)).toBe(150);
  });
});