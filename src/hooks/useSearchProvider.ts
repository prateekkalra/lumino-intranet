import { useEffect, useRef } from 'react';
import { searchService } from '../lib/searchService';
import { SearchDataProvider } from '../types/search';

export function useSearchProvider(widgetName: string, provider: SearchDataProvider) {
  const providerRef = useRef(provider);
  const registeredRef = useRef(false);

  // Update provider reference when it changes
  useEffect(() => {
    providerRef.current = provider;
    
    // Re-register with updated provider
    if (registeredRef.current) {
      searchService.registerDataProvider(widgetName, provider);
    }
  }, [provider, widgetName]);

  // Register provider on mount, unregister on unmount
  useEffect(() => {
    searchService.registerDataProvider(widgetName, providerRef.current);
    registeredRef.current = true;

    return () => {
      searchService.unregisterDataProvider(widgetName);
      registeredRef.current = false;
    };
  }, [widgetName]);

  return {
    refreshData: () => {
      if (registeredRef.current) {
        searchService.registerDataProvider(widgetName, providerRef.current);
      }
    }
  };
}