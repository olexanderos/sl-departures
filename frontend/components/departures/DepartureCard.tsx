'use client';

import React, { useState } from 'react';
import { Departure } from '@/lib/types';
import { TransportIcon } from './TransportIcon';
import { TRANSPORT_LABELS, TRANSPORT_MODES } from '@/lib/constants';

interface DepartureCardProps {
  departure: Departure;
}

export const DepartureCard: React.FC<DepartureCardProps> = ({ departure }) => {
  const [showDeviationDetails, setShowDeviationDetails] = useState(false);
  const hasDeviations = departure.deviations && departure.deviations.length > 0;
  const isRealtime = departure.state === 'EXPECTED';
  const isCancelled = departure.state === 'CANCELLED';
  const transportMode = departure.line.transport_mode.toUpperCase();
  const isMetro = transportMode === TRANSPORT_MODES.METRO;
  const isBus = transportMode === TRANSPORT_MODES.BUS;
  
  // Apply different styling based on transport mode
  const cardStyle = isMetro 
    ? 'border-l-4 border-l-green-600' 
    : isBus 
      ? 'border-l-4 border-l-blue-600' 
      : '';
      
  // Get unique deviation messages to avoid duplicates
  const uniqueDeviations = hasDeviations 
    ? Array.from(new Set(departure.deviations.map(d => d.message)))
    : [];
    
  // Check if this departure is cancelled
  const hasCancellation = hasDeviations && 
    departure.deviations.some(d => d.consequence === 'CANCELLED');
  
  return (
    <div className={`bg-dark-bg-card p-4 rounded-lg shadow-md border border-dark-border hover:shadow-lg transition-shadow animate-fade-in ${cardStyle} ${isCancelled ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <TransportIcon 
              mode={departure.line.transport_mode} 
              lineNumber={departure.line.designation} 
            />
            <div className="ml-3 flex flex-col">
              <span className="text-xs font-medium text-dark-text-secondary uppercase">
                {TRANSPORT_LABELS[transportMode as keyof typeof TRANSPORT_LABELS] || transportMode}
              </span>
              <span className="text-xs text-dark-text-secondary">
                {departure.stop_point.designation && `Platform ${departure.stop_point.designation}`}
              </span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mt-2 text-dark-text-primary">{departure.destination}</h3>
          <p className="text-sm text-dark-text-secondary">{departure.direction}</p>
        </div>
        
        <div className="text-right">
          {hasCancellation ? (
            <div className="bg-red-900/30 text-red-400 px-2 py-1 rounded font-medium text-sm mb-1">
              Cancelled
            </div>
          ) : null}
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
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowDeviationDetails(!showDeviationDetails)}
          >
            <div className="flex items-center text-yellow-500">
              <span className="material-icons text-sm mr-1">warning</span>
              <span className="text-sm">Service disruption</span>
            </div>
            <span className="material-icons text-yellow-500 text-sm">
              {showDeviationDetails ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </div>
          
          {showDeviationDetails && (
            <div className="mt-2 space-y-2 pl-5">
              {uniqueDeviations.map((message, index) => (
                <div key={index} className="text-sm text-dark-text-secondary">
                  • {message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 