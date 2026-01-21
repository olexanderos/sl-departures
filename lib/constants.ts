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

// API Configuration
const DEFAULT_API_BASE_URL = 'https://transport.integration.sl.se/v1';
const DEFAULT_SITE_ID = '9104';

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL,
  SITE_ID: process.env.NEXT_PUBLIC_SITE_ID || DEFAULT_SITE_ID,
};

/**
 * Full URL for the departures API endpoint
 */
export const DEPARTURES_URL = `${API_CONFIG.BASE_URL}/sites/${API_CONFIG.SITE_ID}/departures`; 