import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPlayerByTag } from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PlayerPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [player, setPlayer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlayerData = async () => {
      try {
        const playerData = await getPlayerByTag(id as string);
        setPlayer(playerData);
      } catch (err) {
        console.error('Error fetching player data:', err);
        setError('Failed to load player data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [id]);

  if (loading) {
    return <p>Loading player data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Player Stats</h1>

      {player && (
        <Card>
          <CardHeader>
            <CardTitle>{player.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tag: {player.tag}</p>
            <p>Role: {player.role}</p>
            <p>Trophies: {player.trophies}</p>
            <p>Donations: {player.donations}</p>
            <p>Received: {player.donationsReceived}</p>
            <p>War Stars: {player.warStars}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlayerPage; 