'use client';

import { useState, useEffect } from 'react';

const DESKTOP_BREAKPOINT = 768;

/**
 * Hook to detect viewport size and determine if the screen is desktop-sized.
 * Handles SSR safely and debounces resize events for performance.
 * 
 * @returns {boolean} isDesktop - True if viewport width is >= 768px
 */
export const useViewportSize = (): boolean => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    // Set initial value
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    // Check on mount
    checkViewport();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkViewport, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isDesktop;
};
