import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const CLAN_TAG = '#2RRPJGQOR';
const API_BASE_URL = 'https://api.clashofclans.com/v1';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.NEXT_PUBLIC_COC_API_KEY) {
    return res.status(500).json({ message: 'API key not configured' });
  }

  const { type = 'current' } = req.query; // 'current' or 'log'
  const formattedTag = encodeURIComponent(CLAN_TAG.replace('#', ''));
  
  try {
    const endpoint = type === 'current' 
      ? `/clans/%23${formattedTag}/currentwar`
      : `/clans/%23${formattedTag}/warlog`;
    
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COC_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // For war log, return the items array; for current war, return the full response
    const data = type === 'log' ? response.data.items : response.data;
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching war data:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: `Failed to fetch ${type === 'current' ? 'current war' : 'war log'} data`,
      error: error.response?.data || error.message
    });
  }
} 