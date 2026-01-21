'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { ApiResponse, Departure, SortConfig, TransportMode } from '@/lib/types';
import { DEPARTURES_URL, REFRESH_INTERVAL } from '@/lib/constants';
import { filterByDirection, filterByTransportMode, sortDepartures } from '@/lib/helpers';

const fetchDepartures = async (): Promise<ApiResponse> => {
  const { data } = await axios.get<ApiResponse>(DEPARTURES_URL);
  return data;
};

export const useDepartures = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    option: 'time',
    direction: 'asc',
  });

  const [transportFilter, setTransportFilter] = useState<TransportMode | undefined>(undefined);
  const [directionFilter, setDirectionFilter] = useState<string | undefined>(undefined);

  // Fetch departures with React Query, which handles caching and refetching
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['departures'],
    queryFn: fetchDepartures,
    refetchInterval: REFRESH_INTERVAL,
    refetchOnWindowFocus: true,
  });

  // Filter and sort departures
  const processedDepartures: Departure[] = (() => {
    if (!data?.departures) return [];

    let filtered = data.departures;

    // Apply filters
    filtered = filterByTransportMode(filtered, transportFilter);
    filtered = filterByDirection(filtered, directionFilter);

    // Apply sorting
    return sortDepartures(filtered, sortConfig);
  })();

  // Toggle sort direction or change sort option
  const handleSort = (option: SortConfig['option']) => {
    setSortConfig(prev => {
      if (prev.option === option) {
        // Toggle direction if same option clicked
        return {
          ...prev,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        // New option selected, start with ascending
        return {
          option,
          direction: 'asc',
        };
      }
    });
  };

  // Get disruptions
  const disruptions = data?.stop_deviations || [];

  return {
    departures: processedDepartures,
    disruptions,
    isLoading,
    isError,
    error,
    refetch,
    sortConfig,
    handleSort,
    transportFilter,
    setTransportFilter,
    directionFilter,
    setDirectionFilter,
  };
}; 