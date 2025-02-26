import React, { useState, useEffect } from 'react';
import { getClanWarLog, getCurrentWar } from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { parseISO, format } from 'date-fns';

const WarsPage: React.FC = () => {
  const [warLog, setWarLog] = useState<any[]>([]);
  const [currentWar, setCurrentWar] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarData = async () => {
      try {
        const log = await getClanWarLog();
        const current = await getCurrentWar();
        setWarLog(log);
        setCurrentWar(current);
      } catch (err) {
        console.error('Error fetching war data:', err);
        setError('Failed to load war data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWarData();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'PPpp');
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return <p>Loading war data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Clan Wars</h1>

      {currentWar && (
        <Card>
          <CardHeader>
            <CardTitle>Current War</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Opponent: {currentWar.opponent.name}</p>
            <p>State: {currentWar.state}</p>
            <p>End Time: {formatDate(currentWar.endTime)}</p>
          </CardContent>
        </Card>
      )}

      <h2 className="text-2xl font-bold">War Log</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warLog.map((war, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{war.opponent.name}</CardTitle>
            </CardHeader>
            <CardContent className={`p-4 ${war.result === 'win' ? 'bg-green-100 border border-green-500' : 'bg-red-100 border border-red-500'}`}>
              <p>Result: {war.result === 'win' ? 'Win' : 'Lose'}</p>
              <p>End Time: {formatDate(war.endTime)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WarsPage; 