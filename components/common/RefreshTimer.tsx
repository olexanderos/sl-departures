'use client';

import React from 'react';
import { useRefreshTimer } from '@/hooks/useRefreshTimer';

interface RefreshTimerProps {
  onRefresh: () => void;
}

export const RefreshTimer: React.FC<RefreshTimerProps> = ({ onRefresh }) => {
  const { timeLeft, progressPercentage, isPaused, togglePause, refreshNow } = useRefreshTimer(onRefresh);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-1 bg-dark-bg-secondary rounded overflow-hidden mb-2">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePause}
          className="text-sm text-dark-text-secondary flex items-center hover:text-dark-text-primary"
          aria-label={isPaused ? "Resume auto-refresh" : "Pause auto-refresh"}
        >
          {isPaused ? (
            <>
              <span className="material-icons text-lg mr-1">play_arrow</span>
              <span>Paused</span>
            </>
          ) : (
            <>
              <span className="material-icons text-lg mr-1">pause</span>
              <span>Auto-refreshing in {timeLeft}s</span>
            </>
          )}
        </button>
        
        <button
          onClick={refreshNow}
          className="text-sm text-primary flex items-center hover:text-primary-dark"
          aria-label="Refresh now"
        >
          <span className="material-icons text-lg mr-1">refresh</span>
          <span>Refresh now</span>
        </button>
      </div>
    </div>
  );
}; 