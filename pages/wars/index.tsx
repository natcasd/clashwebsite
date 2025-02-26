import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { parseISO, format } from 'date-fns';
import { useWarLog, useCurrentWar } from '@/utils/swr-hooks';

// Define war interface
interface War {
  opponent: {
    name: string;
  };
  result: string;
  endTime: string;
}

const WarsPage: React.FC = () => {
  const { data: warLog = [], error: warLogError, isLoading: warLogLoading } = useWarLog();
  const { data: currentWar, error: currentWarError, isLoading: currentWarLoading } = useCurrentWar();
  
  const loading = warLogLoading || currentWarLoading;
  const error = warLogError || currentWarError ? 'Failed to load war data. Please try again later.' : null;

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
        {warLog.map((war: War, index: number) => (
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