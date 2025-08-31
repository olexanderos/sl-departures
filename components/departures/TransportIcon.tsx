'use client';

import React from 'react';
import { TRANSPORT_COLORS, TRANSPORT_MODES } from '@/lib/constants';
import { getTransportIcon } from '@/lib/helpers';

interface TransportIconProps {
  mode: string;
  lineNumber: string;
  className?: string;
}

export const TransportIcon: React.FC<TransportIconProps> = ({ 
  mode, 
  lineNumber,
  className = '',
}) => {
  const iconName = getTransportIcon(mode);
  const upperMode = mode.toUpperCase();
  const colorClass = TRANSPORT_COLORS[upperMode as keyof typeof TRANSPORT_COLORS] || 'bg-gray-600 text-white';
  
  // Make different shapes for metro and bus
  const isMetro = upperMode === TRANSPORT_MODES.METRO;
  const isBus = upperMode === TRANSPORT_MODES.BUS;
  
  const iconContainerStyle = isMetro 
    ? 'rounded-lg' // Square-ish shape for metro
    : isBus 
      ? 'rounded-full' // Circle for bus
      : 'rounded-md'; // Default for others
  
  const lineNumberStyle = isMetro
    ? 'rounded px-2 py-1 font-bold'
    : isBus
      ? 'rounded-full px-2 py-1 font-bold'
      : 'rounded px-2 py-1 font-semibold';
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex items-center justify-center p-2 ${colorClass} ${iconContainerStyle}`}>
        <span className="material-icons text-xl">{iconName}</span>
      </div>
      <span className={`ml-2 ${colorClass} ${lineNumberStyle}`}>
        {lineNumber}
      </span>
    </div>
  );
}; 