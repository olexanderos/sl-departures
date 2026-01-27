'use client';

import React, { useState, useEffect } from 'react';
import { TransportMode, Departure } from '@/lib/types';
import { TRANSPORT_MODES } from '@/lib/constants';
import { getTransportIcon } from '@/lib/helpers';

interface TransportTypeFilterProps {
  departures: Departure[];
  selected: TransportMode | undefined;
  onChange: (mode: TransportMode | undefined) => void;
}

export const TransportTypeFilter: React.FC<TransportTypeFilterProps> = ({ 
  departures,
  selected, 
  onChange 
}) => {
  const [availableTransportTypes, setAvailableTransportTypes] = useState<
    Array<{ mode: TransportMode; label: string }>
  >([]);

  // Extract unique transport modes from departures
  useEffect(() => {
    if (!departures || departures.length === 0) {
      setAvailableTransportTypes([]);
      return;
    }

    const uniqueModes = Array.from(
      new Set(departures.map(d => d.line.transport_mode.toUpperCase() as TransportMode))
    );

    const transportTypeMap: Record<string, string> = {
      [TRANSPORT_MODES.METRO]: 'Metro',
      [TRANSPORT_MODES.BUS]: 'Bus',
      [TRANSPORT_MODES.TRAIN]: 'Train',
      [TRANSPORT_MODES.TRAM]: 'Tram',
      [TRANSPORT_MODES.SHIP]: 'Ship',
      [TRANSPORT_MODES.OTHER]: 'Other',
    };

    // Define the display order: metro, bus, train, tram, ship, other
    const displayOrder = [
      TRANSPORT_MODES.METRO,
      TRANSPORT_MODES.BUS,
      TRANSPORT_MODES.TRAIN,
      TRANSPORT_MODES.TRAM,
      TRANSPORT_MODES.SHIP,
      TRANSPORT_MODES.OTHER,
    ];

    const available = uniqueModes
      .filter(mode => transportTypeMap[mode])
      .map(mode => ({
        mode,
        label: transportTypeMap[mode],
      }))
      .sort((a, b) => {
        const indexA = displayOrder.indexOf(a.mode);
        const indexB = displayOrder.indexOf(b.mode);
        return indexA - indexB;
      });

    setAvailableTransportTypes(available);
  }, [departures]);

  const handleSelect = (mode: TransportMode) => {
    // Toggle off if already selected
    if (selected === mode) {
      onChange(undefined);
    } else {
      onChange(mode);
    }
  };

  if (availableTransportTypes.length === 0) {
    return null; // Don't show filter if there are no transport types
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {availableTransportTypes.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => handleSelect(mode)}
          className={`flex items-center px-3 py-1 text-sm rounded-full ${
            selected === mode
              ? 'bg-primary text-white'
              : 'bg-dark-bg-primary text-dark-text-secondary'
          }`}
          aria-pressed={selected === mode}
          aria-label={`Filter by ${label}`}
        >
          <span className="material-icons text-sm mr-1">
            {getTransportIcon(mode)}
          </span>
          {label}
        </button>
      ))}
    </div>
  );
}; 