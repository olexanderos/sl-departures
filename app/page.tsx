'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DepartureList } from '@/components/departures/DepartureList';
import { TransportTypeFilter } from '@/components/departures/TransportTypeFilter';
import { DirectionFilter } from '@/components/departures/DirectionFilter';
import { DisruptionAlert } from '@/components/departures/DisruptionAlert';
import { RefreshTimer } from '@/components/common/RefreshTimer';
import { CurrentTimeCard } from '@/components/common/CurrentTimeCard';
import { useDepartures } from '@/hooks/useDepartures';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function Home() {
  const {
    departures,
    disruptions,
    isLoading,
    isError,
    refetch,
    sortConfig,
    handleSort,
    transportFilter,
    setTransportFilter,
    directionFilter,
    setDirectionFilter,
  } = useDepartures();

  return (
    <PageContainer>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark-text-primary mb-2">Live Departures</h2>
        <p className="text-dark-text-secondary">
          Real-time departures from Råcksta station
        </p>
      </div>

      <DisruptionAlert departures={departures} disruptions={disruptions} />

      <CurrentTimeCard />

      <div className="bg-dark-bg-secondary rounded-lg shadow-md p-4 mb-6 border border-dark-border">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-dark-text-primary mb-3">Filters</h3>
          <TransportTypeFilter 
            selected={transportFilter} 
            onChange={setTransportFilter} 
          />
          <DirectionFilter 
            departures={departures} 
            selected={directionFilter} 
            onChange={setDirectionFilter} 
          />
        </div>
        
        <RefreshTimer onRefresh={refetch} />
      </div>

      <ErrorBoundary>
        <DepartureList
          departures={departures}
          isLoading={isLoading}
          isError={isError}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </ErrorBoundary>
    </PageContainer>
  );
} 