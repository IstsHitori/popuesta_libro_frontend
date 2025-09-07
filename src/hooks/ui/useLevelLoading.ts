import { useState, useEffect, useRef } from 'react';

interface UseLevelLoadingProps {
  duration?: number;
  autoStart?: boolean;
}

export function useLevelLoading({ 
  duration = 3500, 
  autoStart = true 
}: UseLevelLoadingProps = {}) {
  const [isLoading, setIsLoading] = useState(autoStart);
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasStartedRef = useRef(false);

  const startLoading = () => {
    setIsLoading(true);
    setHasLoaded(false);
    hasStartedRef.current = true;
  };

  const completeLoading = () => {
    setIsLoading(false);
    setHasLoaded(true);
  };

  useEffect(() => {
    // Solo ejecutar una vez por montaje del componente
    if (autoStart && !hasStartedRef.current && !hasLoaded) {
      hasStartedRef.current = true;
      
      const timer = setTimeout(() => {
        completeLoading();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoStart, duration, hasLoaded]);

  return {
    isLoading,
    hasLoaded,
    startLoading,
    completeLoading
  };
}
