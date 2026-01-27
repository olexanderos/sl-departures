'use client';

import React, { useState, useEffect } from 'react';
import { formatCurrentTime } from '@/lib/helpers';

/**
 * Displays the current time in HH:MM format, updating every minute.
 * Optimized for kiosk displays with large, readable text.
 */
export const CurrentTimeCard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on mount (client-side only)
    setCurrentTime(new Date());

    // Update time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Don't render until client-side hydration is complete
  if (!currentTime) {
    return (
      <div className="text-right">
        <div className="text-5xl sm:text-6xl font-bold text-green-500">
          --:--
        </div>
      </div>
    );
  }

  const formattedTime = formatCurrentTime(currentTime);
  const [hours, minutes] = formattedTime.split(':');

  return (
    <div
      className="text-right"
      role="timer"
      aria-live="polite"
      aria-label="Current time"
    >
      <time
        className="text-5xl sm:text-6xl font-bold text-green-500"
        dateTime={currentTime.toISOString()}
      >
        {hours}
        <span className="animate-pulse">:</span>
        {minutes}
      </time>
    </div>
  );
};
