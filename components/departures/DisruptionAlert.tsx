'use client';

import React, { useState } from 'react';

interface DisruptionAlertProps {
  disruptions: any[];
}

export const DisruptionAlert: React.FC<DisruptionAlertProps> = ({ disruptions }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!disruptions || disruptions.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 bg-yellow-900/30 border-l-4 border-yellow-600 p-4 rounded">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <span className="material-icons text-yellow-500 mr-3">warning</span>
          <div>
            <h3 className="font-medium text-yellow-400">
              Service Disruption{disruptions.length > 1 ? 's' : ''}
            </h3>
            {!isExpanded && (
              <p className="text-sm text-yellow-300 mt-1">
                {disruptions.length} {disruptions.length === 1 ? 'disruption' : 'disruptions'} reported
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
        <div className="mt-3 pl-8">
          {disruptions.map((disruption, index) => (
            <div key={index} className="mb-2 pb-2 border-b border-yellow-800 last:border-0">
              <p className="text-sm text-yellow-300">
                {disruption.message || 'No details available'}
              </p>
              {disruption.from_date && disruption.to_date && (
                <p className="text-xs text-yellow-500 mt-1">
                  {new Date(disruption.from_date).toLocaleString()} 
                  {' - '} 
                  {new Date(disruption.to_date).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 