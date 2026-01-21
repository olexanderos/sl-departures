'use client';

import React, { useMemo } from 'react';
import { Departure, SortConfig } from '@/lib/types';
import { DirectionColumn } from './DirectionColumn';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { groupByDirectionCode } from '@/lib/helpers';

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
  // Split departures by direction_code
  const { direction1, direction2 } = useMemo(() => {
    return groupByDirectionCode(departures);
  }, [departures]);

  // Group by transport mode if needed (for each direction separately)
  const groupedDirection1 = useMemo(() => {
    if (sortConfig.option !== 'transport') {
      return null;
    }

    const groups: Record<string, Departure[]> = {};
    direction1.forEach(departure => {
      const mode = departure.line.transport_mode.toUpperCase();
      if (!groups[mode]) {
        groups[mode] = [];
      }
      groups[mode].push(departure);
    });

    return groups;
  }, [direction1, sortConfig.option]);

  const groupedDirection2 = useMemo(() => {
    if (sortConfig.option !== 'transport') {
      return null;
    }

    const groups: Record<string, Departure[]> = {};
    direction2.forEach(departure => {
      const mode = departure.line.transport_mode.toUpperCase();
      if (!groups[mode]) {
        groups[mode] = [];
      }
      groups[mode].push(departure);
    });

    return groups;
  }, [direction2, sortConfig.option]);

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
            className={`px-3 py-2 border-b-2 ${sortConfig.option === 'time'
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
            className={`px-3 py-2 border-b-2 ${sortConfig.option === 'line'
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
            className={`px-3 py-2 border-b-2 ${sortConfig.option === 'transport'
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

      {/* Two-column layout: direction_code=2 on left/top, direction_code=1 on right/bottom */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
        <DirectionColumn
          departures={direction2}
          groupedDepartures={groupedDirection2}
        />
        <DirectionColumn
          departures={direction1}
          groupedDepartures={groupedDirection1}
        />
      </div>
    </div>
  );
}; 