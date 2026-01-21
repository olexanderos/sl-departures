'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DepartureList } from '@/components/departures/DepartureList';
import { TransportTypeFilter } from '@/components/departures/TransportTypeFilter';
import { DirectionFilter } from '@/components/departures/DirectionFilter';
import { DisruptionAlert } from '@/components/departures/DisruptionAlert';
import { RefreshTimer } from '@/components/common/RefreshTimer';
import { CurrentTimeCard } from '@/components/common/CurrentTimeCard';
import { CollapsibleFilterPanel } from '@/components/departures/CollapsibleFilterPanel';
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
    isFilterCollapsed,
    setIsFilterCollapsed,
  } = useDepartures();

  // Build list of active filter names
  const activeFilters: string[] = [];
  if (transportFilter) {
    // Capitalize first letter and lowercase rest (e.g., "METRO" -> "Metro")
    const filterName = transportFilter.charAt(0) + transportFilter.slice(1).toLowerCase();
    activeFilters.push(filterName);
  }
  if (directionFilter) {
    activeFilters.push(directionFilter);
  }

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

      <CollapsibleFilterPanel
        isCollapsed={isFilterCollapsed}
        onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
        activeFilters={activeFilters}
      >
        <div className="mb-4">
          <TransportTypeFilter 
            selected={transportFilter} 
            onChange={setTransportFilter} 
          />
        </div>
        <DirectionFilter 
          departures={departures} 
          selected={directionFilter} 
          onChange={setDirectionFilter} 
        />
      </CollapsibleFilterPanel>

      <div className="bg-dark-bg-secondary rounded-lg shadow-md p-4 mb-6 border border-dark-border">
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