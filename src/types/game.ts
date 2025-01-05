export interface Player {
  id: string;
  name: string;
}

export interface Bet {
  playerId: string;
  amount: number;
  multiplier: number;
  isWin: boolean;
}

export interface Round {
  id: string;
  dealerId: string;
  bets: Bet[];
  timestamp: number;
  dealerAmount: number;
}

export interface GameState {
  players: Player[];
  rounds: Round[];
  currentDealerId: string | null;
}

export interface PlayerTotal {
  playerId: string;
  name: string;
  totalWin: number;
  totalLoss: number;
  netAmount: number;
}