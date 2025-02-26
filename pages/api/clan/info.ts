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

  try {
    const formattedTag = encodeURIComponent(CLAN_TAG.replace('#', ''));
    
    const response = await axios.get(`${API_BASE_URL}/clans/%23${formattedTag}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COC_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error fetching clan info:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch clan information',
      error: error.response?.data || error.message
    });
  }
} 