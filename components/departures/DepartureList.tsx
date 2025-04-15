'use client';

import React from 'react';
import { Departure, SortConfig } from '@/lib/types';
import { DepartureCard } from './DepartureCard';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface DepartureListProps {
  departures: Departure[];
  isLoading: boolean;
  isError: boolean;
  sortConfig: SortConfig;
  onSort: (option: SortConfig['option']) => void;
}

export const DepartureList: React.FC<DepartureListProps> = ({
  departures,
  isLoading,
  isError,
  sortConfig,
  onSort,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-900/20 rounded-lg text-center">
        <p className="text-red-400">Failed to load departures</p>
        <p className="mt-2 text-dark-text-secondary">Please try again later</p>
      </div>
    );
  }

  if (departures.length === 0) {
    return (
      <div className="p-6 bg-dark-bg-secondary rounded-lg text-center">
        <p className="text-dark-text-secondary">No departures found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex text-sm border-b border-dark-border">
          <button
            onClick={() => onSort('time')}
            className={`px-3 py-2 border-b-2 ${
              sortConfig.option === 'time' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-dark-text-secondary'
            }`}
          >
            Time {sortConfig.option === 'time' && (
              <span className="ml-1">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onSort('line')}
            className={`px-3 py-2 border-b-2 ${
              sortConfig.option === 'line' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-dark-text-secondary'
            }`}
          >
            Line {sortConfig.option === 'line' && (
              <span className="ml-1">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onSort('transport')}
            className={`px-3 py-2 border-b-2 ${
              sortConfig.option === 'transport' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-dark-text-secondary'
            }`}
          >
            Type {sortConfig.option === 'transport' && (
              <span className="ml-1">
                {sortConfig.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {departures.map((departure) => (
          <DepartureCard 
            key={`${departure.journey.id}-${departure.line.designation}`} 
            departure={departure} 
          />
        ))}
      </div>
    </div>
  );
}; 