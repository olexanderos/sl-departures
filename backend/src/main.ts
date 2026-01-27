import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { loadEnv } from './lib/env.ts';
import { createWeatherRoutes } from './routes/weather.ts';
import { createHealthRoutes } from './routes/health.ts';

// Load and validate environment variables
const env = loadEnv();

// Create Hono app
const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', prettyJSON());

// CORS configuration - allow requests from frontend
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', '*'],
    allowMethods: ['GET', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 86400,
    credentials: true,
  })
);

// Mount routes
app.route('/health', createHealthRoutes());
app.route('/api/weather', createWeatherRoutes(env));

// Root endpoint
app.get('/', (c) => {
  return c.json({
    name: 'Weather API',
    version: '0.1.0',
    endpoints: {
      health: '/health',
      currentWeather: '/api/weather/current',
      forecast: '/api/weather/forecast',
      cacheStats: '/api/weather/cache-stats',
    },
    documentation: 'https://github.com/your-repo/departures',
  });
});

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      error: 'Not Found',
      message: `Route ${c.req.path} not found`,
      statusCode: 404,
    },
    404
  );
});

// Global error handler
app.onError((err, c) => {
  console.error('[Global Error]', err);

  return c.json(
    {
      error: 'Internal Server Error',
      message: err.message || 'An unexpected error occurred',
      statusCode: 500,
    },
    500
  );
});

// Start server
const port = env.PORT;

console.log(`
╔═══════════════════════════════════════════════════╗
║           Weather API Server Starting             ║
╠═══════════════════════════════════════════════════╣
║  Port:     ${port.toString().padEnd(38)}║
║  Location: ${env.WEATHER_LAT}, ${env.WEATHER_LON.toString().padEnd(24)}║
║  Cache:    ${env.CACHE_TTL_MINUTES} minutes TTL${' '.repeat(26)}║
╚═══════════════════════════════════════════════════╝
`);

Deno.serve({ port }, app.fetch);
