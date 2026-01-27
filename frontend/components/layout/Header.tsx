'use client';

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-dark-bg-secondary shadow-sm border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="material-icons text-primary text-2xl mr-2">departure_board</span>
            <h1 className="text-xl font-bold text-dark-text-primary">Departures</h1>
          </div>
          <div className="text-sm text-dark-text-secondary">
            Live Transport Information
          </div>
        </div>
      </div>
    </header>
  );
}; 