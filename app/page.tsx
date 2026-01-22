'use client';

import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DepartureList } from '@/components/departures/DepartureList';
import { TransportTypeFilter } from '@/components/departures/TransportTypeFilter';
import { DirectionFilter } from '@/components/departures/DirectionFilter';
import { DisruptionAlert } from '@/components/departures/DisruptionAlert';
import { CurrentTimeCard } from '@/components/common/CurrentTimeCard';
import { CollapsibleFilterPanel } from '@/components/departures/CollapsibleFilterPanel';
import { useDepartures } from '@/hooks/useDepartures';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function Home() {
  const {
    departures,
    rawDepartures,
    disruptions,
    isLoading,
    isError,
    sortConfig,
    handleSort,
    transportFilter,
    setTransportFilter,
    directionFilter,
    setDirectionFilter,
    isFilterCollapsed,
    setIsFilterCollapsed,
  } = useDepartures();

  // Build list of active filter names (only direction now, transport is always visible)
  const activeFilters: string[] = [];
  if (directionFilter) {
    activeFilters.push(directionFilter);
  } else {
    // Show "All" when no specific direction is selected
    activeFilters.push('All');
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

      <TransportTypeFilter
        departures={rawDepartures}
        selected={transportFilter}
        onChange={setTransportFilter}
      />

      <CollapsibleFilterPanel
        isCollapsed={isFilterCollapsed}
        onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
        activeFilters={activeFilters}
      >
        <DirectionFilter
          departures={rawDepartures}
          selected={directionFilter}
          onChange={setDirectionFilter}
        />
      </CollapsibleFilterPanel>

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