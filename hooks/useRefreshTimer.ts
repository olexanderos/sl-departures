'use client';

import { useState, useEffect, useCallback } from 'react';
import { REFRESH_INTERVAL } from '@/lib/constants';

export const useRefreshTimer = (onRefresh: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number>(REFRESH_INTERVAL / 1000);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Manually trigger a refresh
  const refreshNow = useCallback(() => {
    setTimeLeft(REFRESH_INTERVAL / 1000);
    onRefresh();
  }, [onRefresh]);

  // Toggle the timer paused state
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // When we reach zero, trigger the refresh
          onRefresh();
          return REFRESH_INTERVAL / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onRefresh]);

  // Calculate progress percentage for visual indicators
  const progressPercentage = Math.floor((timeLeft / (REFRESH_INTERVAL / 1000)) * 100);

  return {
    timeLeft,
    progressPercentage,
    isPaused,
    togglePause,
    refreshNow,
  };
}; 