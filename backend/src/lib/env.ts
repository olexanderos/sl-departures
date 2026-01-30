import { z } from 'zod';

/**
 * Environment variable schema with validation
 */
const envSchema = z.object({
  OPENWEATHERMAP_API_KEY: z.string().min(1, 'API key is required'),
  WEATHER_LAT: z.string().transform((val) => parseFloat(val)),
  WEATHER_LON: z.string().transform((val) => parseFloat(val)),
  CACHE_TTL_MINUTES: z
    .string()
    .optional()
    .default('15')
    .transform((val) => parseInt(val, 10)),
  PORT: z
    .string()
    .optional()
    .default('3001')
    .transform((val) => parseInt(val, 10)),
  CORS_ORIGINS: z
    .string()
    .optional()
    .default('*')
    .transform((val): string | string[] => 
      val === '*' ? '*' : val.split(',').map((o) => o.trim())
    ),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Load and validate environment variables
 */
export function loadEnv(): Env {
  const result = envSchema.safeParse({
    OPENWEATHERMAP_API_KEY: Deno.env.get('OPENWEATHERMAP_API_KEY'),
    WEATHER_LAT: Deno.env.get('WEATHER_LAT') || '59.3293',
    WEATHER_LON: Deno.env.get('WEATHER_LON') || '18.0686',
    CACHE_TTL_MINUTES: Deno.env.get('CACHE_TTL_MINUTES'),
    PORT: Deno.env.get('PORT'),
    CORS_ORIGINS: Deno.env.get('CORS_ORIGINS'),
  });

  if (!result.success) {
    console.error('Environment validation failed:');
    console.error(result.error.format());
    Deno.exit(1);
  }

  return result.data;
}
