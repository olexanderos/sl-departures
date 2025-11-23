export const REFRESH_INTERVAL = 60 * 1000; // 1 minute in milliseconds

export const TRANSPORT_MODES = {
  METRO: 'METRO',
  BUS: 'BUS',
  TRAIN: 'TRAIN',
  TRAM: 'TRAM',
  SHIP: 'SHIP',
  OTHER: 'OTHER',
} as const;

export const TRANSPORT_COLORS = {
  [TRANSPORT_MODES.METRO]: 'bg-green-600 text-white',
  [TRANSPORT_MODES.BUS]: 'bg-blue-600 text-white',
  [TRANSPORT_MODES.TRAIN]: 'bg-yellow-600 text-white',
  [TRANSPORT_MODES.TRAM]: 'bg-purple-600 text-white',
  [TRANSPORT_MODES.SHIP]: 'bg-blue-700 text-white',
  [TRANSPORT_MODES.OTHER]: 'bg-gray-600 text-white',
};

export const TRANSPORT_LABELS = {
  [TRANSPORT_MODES.METRO]: 'Metro',
  [TRANSPORT_MODES.BUS]: 'Bus',
  [TRANSPORT_MODES.TRAIN]: 'Train',
  [TRANSPORT_MODES.TRAM]: 'Tram',
  [TRANSPORT_MODES.SHIP]: 'Ship',
  [TRANSPORT_MODES.OTHER]: 'Other',
};

const DEFAULT_DEPARTURES_API = 'https://transport.integration.sl.se/v1/sites/9104/departures';

export const API_ENDPOINTS = {
  DEPARTURES: process.env.NEXT_PUBLIC_DEPARTURES_API || DEFAULT_DEPARTURES_API,
}; 