'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { SortConfig, TransportMode } from '@/lib/types';
import { TRANSPORT_MODES } from '@/lib/constants';

interface FilterContextType {
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  transportFilter: TransportMode | undefined;
  setTransportFilter: (mode: TransportMode | undefined) => void;
  directionFilter: string | undefined;
  setDirectionFilter: (direction: string | undefined) => void;
  isFilterCollapsed: boolean;
  setIsFilterCollapsed: (collapsed: boolean) => void;
}

const defaultValues: FilterContextType = {
  sortConfig: { option: 'time', direction: 'asc' },
  setSortConfig: () => {},
  transportFilter: 'METRO',
  setTransportFilter: () => {},
  directionFilter: undefined,
  setDirectionFilter: () => {},
  isFilterCollapsed: false,
  setIsFilterCollapsed: () => {},
};

const FilterContext = createContext<FilterContextType>(defaultValues);

export const useFilterContext = () => useContext(FilterContext);

interface FilterProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'departures-filter-collapsed';
const DESKTOP_BREAKPOINT = 768;

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    option: 'time', 
    direction: 'asc' 
  });
  
  const [transportFilter, setTransportFilter] = useState<TransportMode | undefined>(TRANSPORT_MODES.METRO);
  const [directionFilter, setDirectionFilter] = useState<string | undefined>(undefined);
  const [isFilterCollapsed, setIsFilterCollapsedState] = useState<boolean>(false);

  // Initialize collapse state based on viewport and localStorage
  useEffect(() => {
    const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
    const savedState = localStorage.getItem(STORAGE_KEY);
    
    if (savedState !== null) {
      setIsFilterCollapsedState(savedState === 'true');
    } else {
      setIsFilterCollapsedState(isDesktop);
    }
  }, []);

  // Persist collapse state to localStorage
  const setIsFilterCollapsed = (collapsed: boolean) => {
    setIsFilterCollapsedState(collapsed);
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  };

  return (
    <FilterContext.Provider
      value={{
        sortConfig,
        setSortConfig,
        transportFilter,
        setTransportFilter,
        directionFilter,
        setDirectionFilter,
        isFilterCollapsed,
        setIsFilterCollapsed,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}; 