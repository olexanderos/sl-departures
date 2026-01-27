# Weather API Backend

A Deno-based REST API that provides weather data from OpenWeatherMap with in-memory caching.

## Tech Stack

- **Runtime**: Deno 2.x
- **Framework**: Hono
- **Validation**: Zod
- **Deployment**: Docker + Docker Compose

## Features

- Current weather data for a configured location
- Hourly forecast (next 24 hours, 3-hour intervals)
- In-memory caching with configurable TTL
- CORS support for frontend integration
- Health check endpoints for Docker/monitoring

## API Endpoints

| Endpoint                   | Method | Description                      |
| -------------------------- | ------ | -------------------------------- |
| `/`                        | GET    | API info and available endpoints |
| `/health`                  | GET    | Health check                     |
| `/health/ready`            | GET    | Readiness check                  |
| `/health/live`             | GET    | Liveness check                   |
| `/api/weather/current`     | GET    | Current weather                  |
| `/api/weather/forecast`    | GET    | Hourly forecast                  |
| `/api/weather/cache-stats` | GET    | Cache statistics                 |

## Configuration

Create a `.env` file based on `env.example`:

```env
# Required
OPENWEATHERMAP_API_KEY=your_api_key_here

# Optional (defaults shown)
WEATHER_LAT=59.3293
WEATHER_LON=18.0686
CACHE_TTL_MINUTES=15
PORT=3001
```

## Development

### Prerequisites

- [Deno 2.x](https://deno.land/manual/getting_started/installation)

### Running Locally

```bash
# Set environment variables
export OPENWEATHERMAP_API_KEY=your_api_key

# Run with watch mode
deno task dev

# Or run without watch
deno task start
```

### Type Checking

```bash
deno task check
```

### Linting & Formatting

```bash
deno task lint
deno task fmt
```

## Docker

### Build and Run

```bash
# Build image
docker build -t departures-weather-api ./backend

# Run container
docker run -p 3001:3001 \
  -e OPENWEATHERMAP_API_KEY=your_key \
  -e WEATHER_LAT=59.3293 \
  -e WEATHER_LON=18.0686 \
  departures-weather-api
```

### Docker Compose

From the project root:

```bash
# Create .env file with your API key
echo "OPENWEATHERMAP_API_KEY=your_key" > .env

# Start the service
docker compose up -d

# View logs
docker compose logs -f weather-api

# Stop the service
docker compose down
```

## Project Structure

```
backend/
├── src/
│   ├── main.ts           # Application entry point
│   ├── lib/
│   │   ├── cache.ts      # In-memory TTL cache
│   │   └── env.ts        # Environment validation
│   ├── routes/
│   │   ├── health.ts     # Health check routes
│   │   └── weather.ts    # Weather API routes
│   ├── schemas/
│   │   └── weather.ts    # Zod schemas
│   └── services/
│       └── openweathermap.ts  # OpenWeatherMap client
├── deno.json             # Deno configuration
├── Dockerfile            # Multi-stage Docker build
├── env.example           # Environment template
└── README.md
```

## API Response Examples

### Current Weather

```json
{
  "temperature": 15,
  "feelsLike": 13,
  "humidity": 65,
  "description": "Partly cloudy",
  "icon": "02d",
  "windSpeed": 5.2,
  "pressure": 1015,
  "clouds": 40,
  "sunrise": "06:15",
  "sunset": "20:45",
  "location": "Stockholm",
  "timestamp": "2024-01-26T10:30:00.000Z"
}
```

### Hourly Forecast

```json
{
  "location": "Stockholm",
  "hours": [
    {
      "time": "12:00",
      "temperature": 16,
      "feelsLike": 14,
      "description": "Clear sky",
      "icon": "01d",
      "precipitation": 0,
      "humidity": 60,
      "windSpeed": 4.5
    }
  ],
  "timestamp": "2024-01-26T10:30:00.000Z"
}
```

## Getting an OpenWeatherMap API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Navigate to your API keys page
3. Generate a new API key (free tier includes 1000 calls/day)
4. Copy the key to your `.env` file

## Raspberry Pi Deployment

The Docker image is optimized for ARM architecture and includes resource limits suitable for Raspberry Pi:

- CPU: 0.5 cores limit
- Memory: 256MB limit

To deploy:

```bash
# Copy files to Pi
scp -r backend/ docker-compose.yml .env pi@your-pi-ip:~/departures/

# SSH to Pi
ssh pi@your-pi-ip

# Build and run
cd ~/departures
docker compose up -d
```
