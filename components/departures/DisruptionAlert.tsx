'use client';

import React, { useState, useMemo } from 'react';
import { Departure, Deviation } from '@/lib/types';
import { TRANSPORT_LABELS, TRANSPORT_MODES } from '@/lib/constants';

interface DisruptionAlertProps {
  departures: Departure[];
  disruptions: Deviation[];
}

export const DisruptionAlert: React.FC<DisruptionAlertProps> = ({ departures, disruptions }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get all deviations from departures, group them by message to avoid duplicates
  const departureDeviations = useMemo(() => {
    const deviationMap = new Map<string, { 
      message: string, 
      consequence: string,
      importance: number,
      affectedLines: Set<string>,
      affectedTransports: Set<string>
    }>();
    
    departures.forEach(departure => {
      if (departure.deviations && departure.deviations.length > 0) {
        departure.deviations.forEach(deviation => {
          const key = `${deviation.consequence}:${deviation.message}`;
          
          if (!deviationMap.has(key)) {
            deviationMap.set(key, {
              message: deviation.message,
              consequence: deviation.consequence,
              importance: deviation.importance_level,
              affectedLines: new Set([departure.line.designation]),
              affectedTransports: new Set([departure.line.transport_mode.toUpperCase()])
            });
          } else {
            const existing = deviationMap.get(key)!;
            existing.affectedLines.add(departure.line.designation);
            existing.affectedTransports.add(departure.line.transport_mode.toUpperCase());
          }
        });
      }
    });
    
    return Array.from(deviationMap.values());
  }, [departures]);
  
  // Combine departures deviations with stop_deviations
  const allDeviations = useMemo(() => {
    return [
      ...departureDeviations,
      ...disruptions.map(d => ({
        message: d.message,
        consequence: d.consequence,
        importance: d.importance_level,
        affectedLines: new Set<string>(),
        affectedTransports: new Set<string>()
      }))
    ];
  }, [departureDeviations, disruptions]);

  // Determine severity of alert based on consequence types
  const hasCancelled = allDeviations.some(d => d.consequence === 'CANCELLED');
  const hasDelayed = allDeviations.some(d => d.consequence === 'DELAYED');
  
  if (allDeviations.length === 0) {
    return null;
  }
  
  // Set alert style based on severity
  const alertStyle = hasCancelled 
    ? 'bg-red-900/30 border-l-4 border-red-600' 
    : hasDelayed 
      ? 'bg-orange-900/30 border-l-4 border-orange-600'
      : 'bg-yellow-900/30 border-l-4 border-yellow-600';
      
  const alertTextStyle = hasCancelled 
    ? 'text-red-400' 
    : hasDelayed 
      ? 'text-orange-400'
      : 'text-yellow-400';

  return (
    <div className={`mb-6 ${alertStyle} p-4 rounded`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <span className="material-icons text-yellow-500 mr-3">
            {hasCancelled ? 'cancel' : hasDelayed ? 'schedule' : 'warning'}
          </span>
          <div>
            <h3 className={`font-medium ${alertTextStyle}`}>
              {hasCancelled 
                ? 'Service Disruption - Cancellations' 
                : hasDelayed 
                  ? 'Service Disruption - Delays'
                  : 'Service Information'}
            </h3>
            {!isExpanded && (
              <p className="text-sm text-yellow-300 mt-1">
                {allDeviations.length} {allDeviations.length === 1 ? 'issue' : 'issues'} reported
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="text-yellow-500 hover:text-yellow-400"
        >
          <span className="material-icons">
            {isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </span>
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pl-8 space-y-4">
          {allDeviations.map((deviation, index) => {
            const isCancel = deviation.consequence === 'CANCELLED';
            const isDelay = deviation.consequence === 'DELAYED';
            const deviationStyle = isCancel 
              ? 'text-red-300' 
              : isDelay 
                ? 'text-orange-300'
                : 'text-yellow-300';
                
            return (
              <div key={index} className="pb-3 border-b border-yellow-800 last:border-0">
                <div className="flex items-start">
                  <span className="material-icons text-sm mr-2 mt-1">
                    {isCancel ? 'cancel' : isDelay ? 'schedule' : 'info'}
                  </span>
                  <div>
                    <p className={`text-sm ${deviationStyle} font-medium`}>
                      {deviation.message}
                    </p>
                    
                    {/* Show affected lines if any */}
                    {deviation.affectedLines.size > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-dark-text-secondary mb-1">
                          Affected lines:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(deviation.affectedLines).map(line => {
                            const transport = Array.from(deviation.affectedTransports)[0] || '';
                            const colorClass = transport === TRANSPORT_MODES.METRO 
                              ? 'bg-green-800/40 text-green-400'
                              : transport === TRANSPORT_MODES.BUS
                                ? 'bg-blue-800/40 text-blue-400'
                                : 'bg-gray-800/40 text-gray-400';
                                
                            return (
                              <span 
                                key={line}
                                className={`text-xs px-2 py-1 rounded ${colorClass}`}
                              >
                                {transport && TRANSPORT_LABELS[transport as keyof typeof TRANSPORT_LABELS]} {line}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}; 