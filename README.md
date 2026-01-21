# Departures - Transport Information Web App

## Project Overview
A modern single-page web application to display train and bus departures and potential disruptions. The app fetches real-time data from the SL transport API and refreshes it every minute.

## Technical Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state + Context API for app state
- **API Communication**: REST calls directly to the SL public transport API

## Project Structure
```
departures/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Main page component
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── RefreshTimer.tsx
│   ├── departures/          # Departure-specific components
│   │   ├── DepartureCard.tsx
│   │   ├── DepartureList.tsx
│   │   ├── DirectionFilter.tsx
│   │   ├── DisruptionAlert.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TransportIcon.tsx
│   │   └── TransportTypeFilter.tsx
│   └── layout/              # Layout components
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── PageContainer.tsx
├── lib/
│   ├── constants.ts         # App constants
│   ├── helpers.ts           # Helper functions 
│   └── types.ts             # TypeScript interfaces
├── hooks/
│   ├── useDepartures.ts     # Custom hook for departures data
│   └── useRefreshTimer.ts   # Custom hook for refresh logic
├── context/
│   └── FilterContext.tsx    # Context for filter state
├── styles/
│   └── tailwind.css         # Custom Tailwind styles
├── public/
│   └── icons/               # Transport icons
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages pipeline
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Core Features
1. **Real-time Departure Information**
   - Display upcoming departures with time, destination, and transport type
   - Show "minutes until departure" or "Now" for imminent departures
   - Visual differentiation between transport types (metro, bus, etc.)

2. **Auto-Refresh Functionality**
   - Refresh data automatically every 60 seconds

3. **Sorting**
   - Sort by transport type (metro, bus), direction, departure time

4. **Disruption Alerts**
   - Prominent display of any service disruptions

5. **Responsive Design**
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
3. Implement auto-refresh functionality (useRefreshTimer hook)
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
Create a `.env.local` file in the root directory with the following variables:

```bash
# SL Transport API Configuration
NEXT_PUBLIC_API_BASE_URL=https://transport.integration.sl.se/v1
NEXT_PUBLIC_SITE_ID=9104

# GitHub Pages base path (only for deployment)
NEXT_PUBLIC_BASE_PATH=
```

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the SL transport API (default: `https://transport.integration.sl.se/v1`)
- `NEXT_PUBLIC_SITE_ID`: Station/site ID for departures (default: `9104`)
- `NEXT_PUBLIC_BASE_PATH`: Base path for GitHub Pages deployment (e.g., `/departures`)

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