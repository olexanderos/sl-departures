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
  
  // Initialize collapsed state - default to true for desktop/kiosk mode
  const [isFilterCollapsed, setIsFilterCollapsedState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true; // SSR default
    
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState !== null) {
      return savedState === 'true';
    }
    
    // Default to collapsed on desktop/kiosk (>= 768px)
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  });

  // Update collapse state on viewport changes
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      const savedState = localStorage.getItem(STORAGE_KEY);
      
      // Only auto-adjust if user hasn't manually set a preference
      if (savedState === null) {
        setIsFilterCollapsedState(isDesktop);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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