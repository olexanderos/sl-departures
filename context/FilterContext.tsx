'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { SortConfig, TransportMode } from '@/lib/types';

interface FilterContextType {
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  transportFilter: TransportMode | undefined;
  setTransportFilter: (mode: TransportMode | undefined) => void;
  directionFilter: string | undefined;
  setDirectionFilter: (direction: string | undefined) => void;
}

const defaultValues: FilterContextType = {
  sortConfig: { option: 'time', direction: 'asc' },
  setSortConfig: () => {},
  transportFilter: undefined,
  setTransportFilter: () => {},
  directionFilter: undefined,
  setDirectionFilter: () => {},
};

const FilterContext = createContext<FilterContextType>(defaultValues);

export const useFilterContext = () => useContext(FilterContext);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    option: 'time', 
    direction: 'asc' 
  });
  
  const [transportFilter, setTransportFilter] = useState<TransportMode | undefined>(undefined);
  const [directionFilter, setDirectionFilter] = useState<string | undefined>(undefined);

  return (
    <FilterContext.Provider
      value={{
        sortConfig,
        setSortConfig,
        transportFilter,
        setTransportFilter,
        directionFilter,
        setDirectionFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}; 