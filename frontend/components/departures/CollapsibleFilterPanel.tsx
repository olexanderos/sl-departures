'use client';

import React from 'react';

interface CollapsibleFilterPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeFilters: string[];
  children: React.ReactNode;
}

/**
 * Collapsible panel wrapper for filter components.
 * Shows active filter names when collapsed and animates expand/collapse.
 */
export const CollapsibleFilterPanel: React.FC<CollapsibleFilterPanelProps> = ({
  isCollapsed,
  onToggle,
  activeFilters,
  children,
}) => {
  return (
    <div className="bg-dark-bg-secondary rounded-lg shadow-md border border-dark-border mb-6 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-dark-bg-primary transition-colors rounded-t-lg"
        aria-expanded={!isCollapsed}
        aria-controls="filter-panel-content"
        aria-label={isCollapsed ? 'Expand direction filter' : 'Collapse direction filter'}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-lg font-medium text-dark-text-primary">Direction</h3>
          {isCollapsed && activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {activeFilters.map((filter, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-white"
                  aria-label={`Active direction: ${filter}`}
                >
                  {filter}
                </span>
              ))}
            </div>
          )}
        </div>
        <span 
          className="material-icons text-dark-text-secondary transition-transform duration-300"
          style={{ transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          expand_more
        </span>
      </button>

      <div
        id="filter-panel-content"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0' : 'max-h-[1000px]'
        }`}
        aria-hidden={isCollapsed}
      >
        <div className="px-4 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};
