import type { GameState } from '../types/game';

const STORAGE_KEY = 'gambling-tracker-state';

export function loadState(): Partial<GameState> {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return {};
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return {};
  }
}

export function saveState(state: GameState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
}