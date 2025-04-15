'use client';

import React from 'react';
import { TransportMode } from '@/lib/types';
import { TRANSPORT_MODES } from '@/lib/constants';
import { getTransportIcon } from '@/lib/helpers';

interface TransportTypeFilterProps {
  selected: TransportMode | undefined;
  onChange: (mode: TransportMode | undefined) => void;
}

export const TransportTypeFilter: React.FC<TransportTypeFilterProps> = ({ 
  selected, 
  onChange 
}) => {
  const handleSelect = (mode: TransportMode) => {
    // Toggle off if already selected
    if (selected === mode) {
      onChange(undefined);
    } else {
      onChange(mode);
    }
  };

  const transportTypes = [
    { mode: TRANSPORT_MODES.METRO, label: 'Metro' },
    { mode: TRANSPORT_MODES.BUS, label: 'Bus' },
    { mode: TRANSPORT_MODES.TRAIN, label: 'Train' },
    { mode: TRANSPORT_MODES.TRAM, label: 'Tram' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {transportTypes.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => handleSelect(mode as TransportMode)}
          className={`flex items-center px-3 py-2 rounded-full text-sm border 
            ${selected === mode ? 'bg-primary text-white border-primary' : 'bg-dark-bg-secondary text-dark-text-secondary border-dark-border'}`}
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