import useSWR from 'swr';

// Define fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Add extra info to the error object
    error.message = await res.json();
    throw error;
  }
  
  return res.json();
};

// SWR configuration for all hooks
const swrConfig = {
  revalidateOnFocus: false, // Don't revalidate when window focuses
  revalidateOnReconnect: true, // Revalidate when browser regains connection
  refreshInterval: 300000, // Refresh data every 5 minutes (300000ms)
  dedupingInterval: 10000, // Dedupe requests with the same key in 10 seconds
};

// Clan Info hook
export function useClanInfo() {
  return useSWR('/api/clan/info', fetcher, swrConfig);
}

// Clan Members hook
export function useClanMembers() {
  return useSWR('/api/clan/members', fetcher, swrConfig);
}

// War Log hook
export function useWarLog() {
  return useSWR('/api/clan/wars?type=log', fetcher, swrConfig);
}

// Current War hook
export function useCurrentWar() {
  return useSWR('/api/clan/wars?type=current', fetcher, swrConfig);
}

// Player Info hook
export function usePlayerInfo(playerTag: string) {
  return useSWR(playerTag ? `/api/players/info?playerTag=${playerTag}` : null, fetcher, swrConfig);
} 