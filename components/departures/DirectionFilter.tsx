'use client';

import React, { useState, useEffect } from 'react';
import { Departure } from '@/lib/types';

interface DirectionFilterProps {
  departures: Departure[];
  selected: string | undefined;
  onChange: (direction: string | undefined) => void;
}

export const DirectionFilter: React.FC<DirectionFilterProps> = ({
  departures,
  selected,
  onChange,
}) => {
  const [directions, setDirections] = useState<string[]>([]);

  // Extract unique directions from departures
  useEffect(() => {
    if (!departures || departures.length === 0) {
      setDirections([]);
      return;
    }

    const uniqueDirections = Array.from(
      new Set(departures.map(d => d.direction))
    ).sort();

    setDirections(uniqueDirections);
  }, [departures]);

  if (directions.length <= 1) {
    return null; // Don't show filter if there's only one or no direction
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(undefined)}
        className={`px-3 py-1 text-sm rounded-full ${
          selected === undefined
            ? 'bg-primary text-white'
            : 'bg-dark-bg-secondary text-dark-text-secondary'
        }`}
      >
        All
      </button>
      
      {directions.map(direction => (
        <button
          key={direction}
          onClick={() => onChange(direction)}
          className={`px-3 py-1 text-sm rounded-full ${
            selected === direction
              ? 'bg-primary text-white'
              : 'bg-dark-bg-secondary text-dark-text-secondary'
          }`}
        >
          {direction}
        </button>
      ))}
    </div>
  );
}; 