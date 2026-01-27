'use client';

import React from 'react';
import { Departure } from '@/lib/types';
import { DepartureCard } from './DepartureCard';
import { TRANSPORT_LABELS, TRANSPORT_MODES } from '@/lib/constants';

interface DirectionColumnProps {
  departures: Departure[];
  groupedDepartures?: Record<string, Departure[]> | null;
}

/**
 * Renders a column of departures, optionally grouped by transport mode
 */
export const DirectionColumn: React.FC<DirectionColumnProps> = ({
  departures,
  groupedDepartures,
}) => {
  if (departures.length === 0) {
    return (
      <div className="p-6 bg-dark-bg-secondary rounded-lg text-center">
        <p className="text-dark-text-secondary">No departures in this direction</p>
      </div>
    );
  }

  if (groupedDepartures) {
    // Render grouped by transport mode
    return (
      <div className="space-y-6">
        {Object.entries(groupedDepartures).map(([mode, groupDepartures]) => (
          <div key={mode} className="space-y-3">
            <div className={`py-2 px-3 rounded-md inline-block mb-2 ${
              mode === TRANSPORT_MODES.METRO 
                ? 'bg-green-600/20 text-green-400'
                : mode === TRANSPORT_MODES.BUS 
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'bg-dark-bg-secondary text-dark-text-secondary'
            }`}>
              <span className="material-icons align-middle mr-1 text-sm">
                {mode === TRANSPORT_MODES.METRO ? 'train' : 
                 mode === TRANSPORT_MODES.BUS ? 'directions_bus' : 'directions_transit'}
              </span>
              <span className="font-medium">
                {TRANSPORT_LABELS[mode as keyof typeof TRANSPORT_LABELS] || mode}
              </span>
            </div>
            
            {groupDepartures.map((departure) => (
              <DepartureCard 
                key={`${departure.journey.id}-${departure.line.designation}`} 
                departure={departure} 
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Render regular list
  return (
    <div className="space-y-3">
      {departures.map((departure) => (
        <DepartureCard 
          key={`${departure.journey.id}-${departure.line.designation}`} 
          departure={departure} 
        />
      ))}
    </div>
  );
};
