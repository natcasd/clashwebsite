// Hardcoded clan tag - replace with your actual clan tag
export const CLAN_TAG = '#2RRPJGQOR';

// Function to fetch clan information for the hardcoded clan
export async function getClanInfo() {
  try {
    const response = await fetch('/api/clan/info');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clan info:', error);
    throw error;
  }
}

// Function to fetch clan members for the hardcoded clan
export async function getClanMembers() {
  try {
    const response = await fetch('/api/clan/members');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clan members:', error);
    throw error;
  }
}

// Function to fetch clan war log for the hardcoded clan
export async function getClanWarLog() {
  try {
    const response = await fetch('/api/clan/wars?type=log');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching war log:', error);
    throw error;
  }
}

// Function to fetch current war information for the hardcoded clan
export async function getCurrentWar() {
  try {
    const response = await fetch('/api/clan/wars?type=current');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current war:', error);
    throw error;
  }
}

// Function to fetch player information by player tag
export async function getPlayerByTag(playerTag: string) {
  try {
    const response = await fetch(`/api/players/info?playerTag=${encodeURIComponent(playerTag)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching player:', error);
    throw error;
  }
} 