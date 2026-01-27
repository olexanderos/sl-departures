'use client';

import React, { useMemo } from 'react';
import { Departure } from '@/lib/types';
import { DirectionColumn } from './DirectionColumn';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { groupByDirectionCode } from '@/lib/helpers';

interface DepartureListProps {
  departures: Departure[];
  isLoading: boolean;
  isError: boolean;
}

export const DepartureList: React.FC<DepartureListProps> = ({
  departures,
  isLoading,
  isError,
}) => {
  // Split departures by direction_code
  const { direction1, direction2 } = useMemo(() => {
    return groupByDirectionCode(departures);
  }, [departures]);

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
      {/* Two-column layout: direction_code=2 on left/top, direction_code=1 on right/bottom */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
        <DirectionColumn
          departures={direction2}
          groupedDepartures={null}
        />
        <DirectionColumn
          departures={direction1}
          groupedDepartures={null}
        />
      </div>
    </div>
  );
}; 