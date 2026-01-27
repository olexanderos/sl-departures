# Departures - Transport Information Web App

## Project Overview
A modern single-page web application to display train and bus departures, potential disruptions, and weather information. The app fetches real-time data from the SL transport API and a custom weather backend, refreshing automatically.

## Technical Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state + Context API for app state
- **API Communication**: REST calls to SL public transport API and Weather API

### Backend (Weather API)
- **Runtime**: Deno 2.x
- **Framework**: Hono
- **Validation**: Zod
- **Deployment**: Docker + Docker Compose
- **Data Source**: OpenWeatherMap API

## Project Structure
```
departures/
├── frontend/                 # Next.js frontend application
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   ├── departures/
│   │   ├── layout/
│   │   └── weather/          # Weather display components
│   ├── hooks/
│   │   ├── useDepartures.ts
│   │   └── useWeather.ts     # Weather data hooks
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── types.ts
│   └── context/
├── backend/                  # Deno + Hono weather API
│   ├── src/
│   │   ├── main.ts           # Entry point
│   │   ├── lib/
│   │   │   ├── cache.ts      # In-memory TTL cache
│   │   │   └── env.ts        # Environment validation
│   │   ├── routes/
│   │   │   ├── health.ts
│   │   │   └── weather.ts
│   │   ├── schemas/
│   │   │   └── weather.ts    # Zod schemas
│   │   └── services/
│   │       └── openweathermap.ts
│   ├── deno.json
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml        # Docker Compose for backend
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## Core Features
1. **Real-time Departure Information**
   - Display upcoming departures with time, destination, and transport type
   - Show "minutes until departure" or "Now" for imminent departures
   - Visual differentiation between transport types (metro, bus, etc.)

2. **Weather Information**
   - Current weather with temperature, conditions, and details
   - Hourly forecast for the next 24 hours
   - Auto-refresh every 15 minutes with in-memory caching

3. **Auto-Refresh Functionality**
   - Departures refresh automatically every 60 seconds
   - Weather data refresh every 15 minutes

4. **Sorting**
   - Sort by transport type (metro, bus), direction, departure time

5. **Disruption Alerts**
   - Prominent display of any service disruptions

6. **Responsive Design**
   - Mobile-first approach
   - Accessible interface

## Data Model
```typescript
interface Departure {
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
  deviations: any[];
}

interface ApiResponse {
  departures: Departure[];
  stop_deviations: any[];
}
```

## Implementation Plan

### Phase 1: Setup & Basic Structure
1. Initialize Next.js project with TypeScript and Tailwind CSS
2. Set up project structure and core files
3. Create basic layout components
4. Define TypeScript interfaces based on API response

### Phase 2: Data Fetching
1. Connect to the SL departures endpoint with React Query
2. Create useDepartures hook with React Query
3. Implement auto-refresh functionality with React Query
4. Add error handling for API failures

### Phase 3: UI Components
1. Develop DepartureList and DepartureCard components
2. Create TransportIcon component for visual transport type representation
3. Add loading states and error boundaries

### Phase 4: Sorting & UI Enhancements
1. Implement sorting functionality
2. Develop responsive styling for all screen sizes

### Phase 5: Polish & Optimization
1. Implement disruption alerts display
2. Add animations for departures list updates
3. Optimize performance (memo, useMemo, etc.)
4. Ensure accessibility compliance
5. Add unit tests for critical components

## Environment Variables

### Frontend (frontend/.env.local)
```bash
# SL Transport API Configuration
NEXT_PUBLIC_API_BASE_URL=https://transport.integration.sl.se/v1
NEXT_PUBLIC_SITE_ID=9104

# Weather API Configuration
NEXT_PUBLIC_WEATHER_API_URL=http://localhost:3001

# GitHub Pages base path (only for deployment)
NEXT_PUBLIC_BASE_PATH=
```

### Backend (.env)
```bash
# Required: OpenWeatherMap API key
OPENWEATHERMAP_API_KEY=your_api_key_here

# Location (default: Stockholm)
WEATHER_LAT=59.3293
WEATHER_LON=18.0686

# Cache TTL in minutes (default: 15)
CACHE_TTL_MINUTES=15

# Server port (default: 3001)
PORT=3001
```

## Running the Application

### Backend (Weather API)

**Option 1: With Deno (Development)**
```bash
cd backend

# Set environment variable
export OPENWEATHERMAP_API_KEY=your_api_key

# Run with watch mode
deno task dev
```

**Option 2: With Docker Compose (Production)**
```bash
# Create .env file in project root
echo "OPENWEATHERMAP_API_KEY=your_api_key" > .env

# Start the service
docker compose up -d

# View logs
docker compose logs -f weather-api
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Getting an OpenWeatherMap API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Navigate to your API keys page
3. Generate a new API key (free tier includes 1000 calls/day)
4. Add it to your environment configuration

## Deployment Strategy
1. Build a fully static bundle with `npm run build:static`
2. Deploy `out/` to GitHub Pages via `.github/workflows/deploy.yml`
3. Configure environment variables in GitHub repository settings:
   - `NEXT_PUBLIC_API_BASE_URL` (optional, uses default if not set)
   - `NEXT_PUBLIC_SITE_ID` (optional, uses default if not set)
   - `NEXT_PUBLIC_BASE_PATH` (required for GitHub Pages subdirectory)
4. Use GitHub Pages environments for preview + production URLs

## Future Enhancements
- Geolocation to show nearest stations
- Dark/light theme toggle
- Push notifications for service disruptions
- Additional transport information (platform changes, etc.) 

## Continuous Deployment (GitHub Pages)
- Push to `main` to trigger `.github/workflows/deploy.yml`
- Workflow installs deps, lints, and runs `npm run build:static`
- `NEXT_PUBLIC_BASE_PATH` ensures assets resolve under `/sl-departures`
- Artifact in `out/` uploads to GitHub Pages with `.nojekyll` to keep Next.js paths intact