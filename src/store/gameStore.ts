import { create } from 'zustand';
import type { GameState, Round, PlayerTotal } from '../types/game';
import { calculatePlayerAmount } from '../utils/calculations';
import { loadState, saveState } from './localStorage';

interface GameStore extends GameState {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setDealer: (playerId: string) => void;
  addRound: (round: Omit<Round, 'id' | 'timestamp'>) => void;
  resetGame: () => void;
  getPlayerTotals: () => PlayerTotal[];
  lastBets: Record<string, number>;
}

const initialState: GameState = {
  players: [],
  rounds: [],
  currentDealerId: null,
};

export const useGameStore = create<GameStore>((set, get) => {
  // Load initial state from localStorage
  const savedState = loadState();
  
  return {
    ...initialState,
    ...savedState,
    lastBets: {},

    addPlayer: (name: string) => {
      set((state) => {
        const newState = {
          ...state,
          players: [...state.players, { id: crypto.randomUUID(), name }],
        };
        saveState(newState);
        return newState;
      });
    },

    removePlayer: (id: string) => {
      set((state) => {
        const newState = {
          ...state,
          players: state.players.filter((player) => player.id !== id),
          currentDealerId: state.currentDealerId === id ? null : state.currentDealerId,
          lastBets: Object.fromEntries(
            Object.entries(state.lastBets).filter(([playerId]) => playerId !== id)
          ),
        };
        saveState(newState);
        return newState;
      });
    },

    setDealer: (playerId: string) => {
      set((state) => {
        const newState = {
          ...state,
          currentDealerId: playerId,
          lastBets: {},
        };
        saveState(newState);
        return newState;
      });
    },

    addRound: (round) => {
      const newRound = {
        ...round,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      set((state) => {
        const newState = {
          ...state,
          rounds: [...state.rounds, newRound],
          lastBets: Object.fromEntries(
            round.bets.map(bet => [bet.playerId, bet.amount])
          ),
        };
        saveState(newState);
        return newState;
      });
    },

    resetGame: () => {
      set(() => {
        const newState = { ...initialState, lastBets: {} };
        saveState(newState);
        return newState;
      });
    },

    getPlayerTotals: () => {
      const state = get();
      const totals: Record<string, PlayerTotal> = {};

      state.players.forEach((player) => {
        totals[player.id] = {
          playerId: player.id,
          name: player.name,
          totalWin: 0,
          totalLoss: 0,
          netAmount: 0,
        };
      });

      state.rounds.forEach((round) => {
        const dealer = totals[round.dealerId];
        if (dealer) {
          if (round.dealerAmount >= 0) {
            dealer.totalWin += round.dealerAmount;
          } else {
            dealer.totalLoss += Math.abs(round.dealerAmount);
          }
          dealer.netAmount += round.dealerAmount;
        }

        round.bets.forEach((bet) => {
          const player = totals[bet.playerId];
          if (!player) return;

          const amount = calculatePlayerAmount(bet);
          if (amount >= 0) {
            player.totalWin += amount;
          } else {
            player.totalLoss += Math.abs(amount);
          }
          player.netAmount += amount;
        });
      });

      return Object.values(totals);
    },
  };
});