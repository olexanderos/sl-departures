'use client';

import React from 'react';
import { Departure } from '@/lib/types';
import { TransportIcon } from './TransportIcon';

interface DepartureCardProps {
  departure: Departure;
}

export const DepartureCard: React.FC<DepartureCardProps> = ({ departure }) => {
  const hasDeviations = departure.deviations && departure.deviations.length > 0;
  const isRealtime = departure.state === 'EXPECTED';
  
  return (
    <div className="bg-dark-bg-card p-4 rounded-lg shadow-md border border-dark-border hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <TransportIcon 
              mode={departure.line.transport_mode} 
              lineNumber={departure.line.designation} 
            />
            <span className="ml-2 text-xs text-dark-text-secondary">
              {departure.stop_point.designation && `Platform ${departure.stop_point.designation}`}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mt-2 text-dark-text-primary">{departure.destination}</h3>
          <p className="text-sm text-dark-text-secondary">{departure.direction}</p>
        </div>
        
        <div className="text-right">
          <div className={`text-xl font-bold ${isRealtime ? 'text-green-400' : 'text-dark-text-primary'}`}>
            {departure.display}
          </div>
          
          <div className="text-xs text-dark-text-secondary mt-1">
            {isRealtime ? 'Real-time' : 'Scheduled'}
          </div>
        </div>
      </div>
      
      {hasDeviations && (
        <div className="mt-3 pt-3 border-t border-dark-border">
          <div className="flex items-center text-yellow-500">
            <span className="material-icons text-sm mr-1">warning</span>
            <span className="text-sm">Service disruption</span>
          </div>
        </div>
      )}
    </div>
  );
}; 