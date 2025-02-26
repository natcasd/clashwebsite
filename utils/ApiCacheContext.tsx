import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getClanInfo, getClanMembers, getClanWarLog, getCurrentWar } from './api';

type CacheData = {
  clanInfo: any | null;
  clanMembers: any[] | null;
  warLog: any[] | null;
  currentWar: any | null;
  lastFetched: {
    clanInfo: number | null;
    clanMembers: number | null;
    warLog: number | null;
    currentWar: number | null;
  };
};

interface ApiCacheContextType {
  cache: CacheData;
  fetchClanInfo: () => Promise<any>;
  fetchClanMembers: () => Promise<any>;
  fetchWarLog: () => Promise<any>;
  fetchCurrentWar: () => Promise<any>;
  clearCache: () => void;
}

const initialCache: CacheData = {
  clanInfo: null,
  clanMembers: null,
  warLog: null,
  currentWar: null,
  lastFetched: {
    clanInfo: null,
    clanMembers: null,
    warLog: null,
    currentWar: null,
  }
};

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

const ApiCacheContext = createContext<ApiCacheContextType | undefined>(undefined);

export function ApiCacheProvider({ children }: { children: ReactNode }) {
  const [cache, setCache] = useState<CacheData>(initialCache);

  const isCacheValid = useCallback(
    (key: keyof CacheData['lastFetched']) => {
      const lastFetched = cache.lastFetched[key];
      if (!lastFetched) return false;
      return Date.now() - lastFetched < CACHE_EXPIRATION;
    },
    [cache.lastFetched]
  );

  const fetchClanInfo = useCallback(async () => {
    if (cache.clanInfo && isCacheValid('clanInfo')) {
      return cache.clanInfo;
    }

    const data = await getClanInfo();
    setCache(prev => ({
      ...prev,
      clanInfo: data,
      lastFetched: {
        ...prev.lastFetched,
        clanInfo: Date.now()
      }
    }));
    return data;
  }, [cache.clanInfo, isCacheValid]);

  const fetchClanMembers = useCallback(async () => {
    if (cache.clanMembers && isCacheValid('clanMembers')) {
      return cache.clanMembers;
    }

    const data = await getClanMembers();
    setCache(prev => ({
      ...prev,
      clanMembers: data,
      lastFetched: {
        ...prev.lastFetched,
        clanMembers: Date.now()
      }
    }));
    return data;
  }, [cache.clanMembers, isCacheValid]);

  const fetchWarLog = useCallback(async () => {
    if (cache.warLog && isCacheValid('warLog')) {
      return cache.warLog;
    }

    const data = await getClanWarLog();
    setCache(prev => ({
      ...prev,
      warLog: data,
      lastFetched: {
        ...prev.lastFetched,
        warLog: Date.now()
      }
    }));
    return data;
  }, [cache.warLog, isCacheValid]);

  const fetchCurrentWar = useCallback(async () => {
    if (cache.currentWar && isCacheValid('currentWar')) {
      return cache.currentWar;
    }

    const data = await getCurrentWar();
    setCache(prev => ({
      ...prev,
      currentWar: data,
      lastFetched: {
        ...prev.lastFetched,
        currentWar: Date.now()
      }
    }));
    return data;
  }, [cache.currentWar, isCacheValid]);

  const clearCache = useCallback(() => {
    setCache(initialCache);
  }, []);

  return (
    <ApiCacheContext.Provider
      value={{
        cache,
        fetchClanInfo,
        fetchClanMembers,
        fetchWarLog,
        fetchCurrentWar,
        clearCache
      }}
    >
      {children}
    </ApiCacheContext.Provider>
  );
}

export function useApiCache() {
  const context = useContext(ApiCacheContext);
  if (context === undefined) {
    throw new Error('useApiCache must be used within an ApiCacheProvider');
  }
  return context;
} 