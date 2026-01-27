import { Hono } from 'hono';

const VERSION = '0.1.0';

/**
 * Create health check routes
 */
export function createHealthRoutes(): Hono {
  const app = new Hono();

  /**
   * GET /health
   * Basic health check endpoint for Docker/monitoring
   */
  app.get('/', (c) => {
    return c.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: VERSION,
    });
  });

  /**
   * GET /health/ready
   * Readiness check - confirms the service is ready to accept traffic
   */
  app.get('/ready', (c) => {
    return c.json({
      status: 'ok',
      ready: true,
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * GET /health/live
   * Liveness check - confirms the service is running
   */
  app.get('/live', (c) => {
    return c.json({
      status: 'ok',
      alive: true,
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}
