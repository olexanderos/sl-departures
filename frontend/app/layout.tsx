'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from '@/context/FilterContext';

const inter = Inter({ subsets: ['latin'] });

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Departures | Live Transport Information</title>
        <meta name="description" content="Check real-time train and bus departures" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
            {children}
          </FilterProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
} 