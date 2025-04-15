'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg-secondary border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-dark-text-secondary">
          <div>
            <p>© {new Date().getFullYear()} Departures App</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p>Data provided by SL Transport API</p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 