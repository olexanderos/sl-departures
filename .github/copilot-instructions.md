# Departures - Transport Information Web App

## Project Overview
A modern single-page web application to display train and bus departures and potential disruptions. The app fetches real-time data from the SL transport API and refreshes it every minute.

## Technical Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state + Context API for app state
- **API Communication**: REST via Next.js API routes

## Project Structure
```
departures/
├── app/
│   ├── api/
│   │   └── departures/
│   │       └── route.ts     # API route to fetch departures
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
   - Visual countdown timer showing time until next refresh

3. **Sorting**
   - Sort by transport type (metro, bus), direction, departure time

4. **Disruption Alerts**
   - Prominent display of any service disruptions
   - Details view for disruption information

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

