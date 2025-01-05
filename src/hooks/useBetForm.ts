import { useState, useEffect } from 'react';
import type { BetFormData } from '../types/bet';

export function useBetForm(lastBets: Record<string, number>) {
  const [bets, setBets] = useState<Record<string, BetFormData>>(() => 
    Object.fromEntries(
      Object.entries(lastBets).map(([playerId, amount]) => [
        playerId,
        {
          amount: amount.toString(),
          multiplier: 1,
          isWin: false,
          showCustomMultiplier: false,
          customMultiplier: ''
        }
      ])
    )
  );

  // Update bets when lastBets changes (e.g., when dealer changes)
  useEffect(() => {
    setBets(Object.fromEntries(
      Object.entries(lastBets).map(([playerId, amount]) => [
        playerId,
        {
          amount: amount.toString(),
          multiplier: 1,
          isWin: false,
          showCustomMultiplier: false,
          customMultiplier: ''
        }
      ])
    ));
  }, [lastBets]);

  const updateBet = (playerId: string, field: keyof BetFormData, value: string | number | boolean) => {
    setBets(prev => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || {
          amount: '',
          multiplier: 1,
          isWin: false,
          showCustomMultiplier: false,
          customMultiplier: ''
        }),
        [field]: value,
      },
    }));
  };

  const handleMultiplierClick = (playerId: string, multiplier: number) => {
    setBets(prev => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || {
          amount: '',
          isWin: false,
          showCustomMultiplier: false,
          customMultiplier: ''
        }),
        multiplier,
        showCustomMultiplier: false,
        customMultiplier: '',
      },
    }));
  };

  const handleCustomMultiplier = (playerId: string, value: string) => {
    const numValue = parseFloat(value);
    setBets(prev => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || {
          amount: '',
          multiplier: 1,
          isWin: false,
          showCustomMultiplier: true
        }),
        customMultiplier: value,
        multiplier: !isNaN(numValue) && numValue > 0 ? numValue : prev[playerId]?.multiplier || 1,
      },
    }));
  };

  const toggleCustomMultiplier = (playerId: string) => {
    setBets(prev => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || {
          amount: '',
          multiplier: 1,
          isWin: false,
          customMultiplier: ''
        }),
        showCustomMultiplier: !prev[playerId]?.showCustomMultiplier,
        customMultiplier: '',
      },
    }));
  };

  const resetBetsAfterSubmit = () => {
    setBets(prev => 
      Object.fromEntries(
        Object.entries(prev).map(([id, bet]) => [
          id,
          {
            ...bet,
            multiplier: 1,
            isWin: false,
            showCustomMultiplier: false,
            customMultiplier: ''
          }
        ])
      )
    );
  };

  return {
    bets,
    updateBet,
    handleMultiplierClick,
    handleCustomMultiplier,
    toggleCustomMultiplier,
    resetBetsAfterSubmit,
  };
}