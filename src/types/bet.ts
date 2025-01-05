import type { Player } from './game';

export interface BetFormData {
  amount: string;
  multiplier: number;
  isWin: boolean;
  showCustomMultiplier: boolean;
  customMultiplier: string;
}

export interface BetDisplayData {
  player: Player;
  amount: number;
  multiplier: number;
  winAmount: number;
  netAmount: number;
}