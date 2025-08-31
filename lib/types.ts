export interface Departure {
  destination: string;
  direction_code: number;
  direction: string;
  state: string;
  display: string;
  scheduled: string;
  expected: string;
  journey: {
    id: number;
    state: string;
    prediction_state?: string;
  };
  stop_area: {
    id: number;
    name: string;
    type: string;
  };
  stop_point: {
    id: number;
    name: string;
    designation?: string;
  };
  line: {
    id: number;
    designation: string;
    transport_mode: string;
    group_of_lines: string;
  };
  deviations: Deviation[];
}

export interface Deviation {
  importance_level: number;
  consequence: string;
  message: string;
}

export interface ApiResponse {
  departures: Departure[];
  stop_deviations: Deviation[];
}

export type TransportMode = 'METRO' | 'BUS' | 'TRAIN' | 'TRAM' | 'SHIP' | 'OTHER';

export type DeviationConsequence = 'INFORMATION' | 'CANCELLED' | 'DELAYED' | 'OTHER';

export type SortOption = 'time' | 'line' | 'transport';

export interface SortConfig {
  option: SortOption;
  direction: 'asc' | 'desc';
} 