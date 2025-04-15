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
  [TRANSPORT_MODES.METRO]: 'bg-metro text-white',
  [TRANSPORT_MODES.BUS]: 'bg-bus text-white',
  [TRANSPORT_MODES.TRAIN]: 'bg-yellow-600 text-white',
  [TRANSPORT_MODES.TRAM]: 'bg-purple-600 text-white',
  [TRANSPORT_MODES.SHIP]: 'bg-blue-700 text-white',
  [TRANSPORT_MODES.OTHER]: 'bg-gray-600 text-white',
};

export const API_ENDPOINTS = {
  DEPARTURES: '/api/departures',
}; 