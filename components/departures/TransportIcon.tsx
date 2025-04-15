'use client';

import React from 'react';
import { TRANSPORT_COLORS } from '@/lib/constants';
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
  const colorClass = TRANSPORT_COLORS[mode as keyof typeof TRANSPORT_COLORS] || 'bg-gray-600 text-white';
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex items-center justify-center rounded-full p-1 ${colorClass}`}>
        <span className="material-icons text-xl">{iconName}</span>
      </div>
      <span className={`ml-2 font-semibold ${colorClass} rounded px-2 py-1`}>
        {lineNumber}
      </span>
    </div>
  );
}; 