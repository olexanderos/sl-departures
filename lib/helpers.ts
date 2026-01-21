import { Departure, SortConfig, TransportMode } from './types';
import { TRANSPORT_MODES } from './constants';

/**
 * Formats a departure time for display
 */
export const formatDepartureTime = (departure: Departure): string => {
  // The API already provides a formatted display time
  return departure.display;
};

/**
 * Extracts the transport mode icon name
 */
export const getTransportIcon = (transportMode: string): string => {
  switch (transportMode.toUpperCase()) {
    case TRANSPORT_MODES.METRO:
      return 'train';  // More specific icon for metro
    case TRANSPORT_MODES.BUS:
      return 'directions_bus';
    case TRANSPORT_MODES.TRAIN:
      return 'railway_alert';  // Different train icon
    case TRANSPORT_MODES.TRAM:
      return 'tram';
    case TRANSPORT_MODES.SHIP:
      return 'directions_boat';
    default:
      return 'directions_transit';
  }
};

/**
 * Sorts departures based on the provided sort configuration
 */
export const sortDepartures = (departures: Departure[], sortConfig: SortConfig): Departure[] => {
  return [...departures].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    
    switch (sortConfig.option) {
      case 'time':
        // Sort by expected departure time
        return (new Date(a.expected).getTime() - new Date(b.expected).getTime()) * direction;
      
      case 'line':
        // Sort by line designation (usually a number, but could be alphanumeric)
        return a.line.designation.localeCompare(b.line.designation, undefined, { numeric: true }) * direction;
      
      case 'transport':
        // Sort by transport mode
        return a.line.transport_mode.localeCompare(b.line.transport_mode) * direction;
      
      default:
        return 0;
    }
  });
};

/**
 * Filter departures by transport mode
 */
export const filterByTransportMode = (departures: Departure[], transportMode?: TransportMode): Departure[] => {
  if (!transportMode) return departures;
  
  return departures.filter(departure => 
    departure.line.transport_mode.toUpperCase() === transportMode
  );
};

/**
 * Filter departures by direction
 */
export const filterByDirection = (departures: Departure[], direction?: string): Departure[] => {
  if (!direction) return departures;
  
  return departures.filter(departure => 
    departure.direction.includes(direction) || departure.destination.includes(direction)
  );
};

/**
 * Groups departures by direction_code (1 or 2)
 */
export const groupByDirectionCode = (departures: Departure[]): {
  direction1: Departure[];
  direction2: Departure[];
} => {
  return departures.reduce((acc, departure) => {
    if (departure.direction_code === 1) {
      acc.direction1.push(departure);
    } else if (departure.direction_code === 2) {
      acc.direction2.push(departure);
    }
    return acc;
  }, { direction1: [] as Departure[], direction2: [] as Departure[] });
}; 