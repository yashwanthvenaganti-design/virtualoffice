import { addressService } from '../services/addressService';

/**
 * Cache management utilities
 */
export const cacheUtils = {
  /**
   * Clear all application caches
   */
  clearAllCaches(): void {
    try {
      // Clear countries cache
      addressService.clearCountriesCache();

      // Add other cache clearing logic here as needed
      console.log('✅ All caches cleared successfully');
    } catch (error) {
      console.error('❌ Failed to clear caches:', error);
    }
  },

  /**
   * Clear only countries cache
   */
  clearCountriesCache(): void {
    addressService.clearCountriesCache();
  },

  /**
   * Get cache information for debugging
   */
  getCacheInfo(): Record<string, any> {
    const info: Record<string, any> = {};

    try {
      // Countries cache info
      const countriesCache = localStorage.getItem('app_countries_cache');
      if (countriesCache) {
        const parsed = JSON.parse(countriesCache);
        info.countries = {
          hasCache: true,
          timestamp: new Date(parsed.timestamp).toISOString(),
          itemCount: parsed.data?.length || 0,
          isExpired: Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000,
        };
      } else {
        info.countries = { hasCache: false };
      }
    } catch (error) {
      info.countries = { hasCache: false, error: error.message };
    }

    return info;
  },

  /**
   * Export cache data for debugging
   */
  exportCacheData(): string {
    try {
      const cacheData = {
        countries: localStorage.getItem('app_countries_cache'),
        timestamp: new Date().toISOString(),
      };
      return JSON.stringify(cacheData, null, 2);
    } catch (error) {
      return `Error exporting cache: ${error.message}`;
    }
  },
};

// Development helper - add to window for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).cacheUtils = cacheUtils;
}
