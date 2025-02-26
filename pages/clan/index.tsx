import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MemberList from '../../components/member-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CLAN_TAG } from '@/utils/api';
import { useApiCache } from '@/utils/ApiCacheContext';

// Fallback mock data in case API fails
const mockClan = {
  tag: CLAN_TAG,
  name: 'Clash Champions',
  type: 'inviteOnly',
  description: 'A friendly clan looking for active players. War twice a week. Donations required.',
  location: {
    id: 32000006,
    name: 'International',
    isCountry: false
  },
  badgeUrls: {
    small: 'https://api-assets.clashofclans.com/badges/70/h8Hj8FDhG0cWmRzRR6JJcEScqQnXBiWWLo8IfDNXJNA.png',
    large: 'https://api-assets.clashofclans.com/badges/512/h8Hj8FDhG0cWmRzRR6JJcEScqQnXBiWWLo8IfDNXJNA.png',
    medium: 'https://api-assets.clashofclans.com/badges/200/h8Hj8FDhG0cWmRzRR6JJcEScqQnXBiWWLo8IfDNXJNA.png'
  },
  clanLevel: 10,
  clanPoints: 32750,
  clanVersusPoints: 24800,
  requiredTrophies: 2000,
  warFrequency: 'always',
  warWinStreak: 3,
  warWins: 150,
  warTies: 10,
  warLosses: 75,
  isWarLogPublic: true,
  warLeague: {
    id: 48000012,
    name: 'Crystal League I'
  },
  members: 42,
  labels: [
    {
      id: 56000000,
      name: 'Clan Wars'
    },
    {
      id: 56000001,
      name: 'Clan War League'
    },
    {
      id: 56000004,
      name: 'Friendly'
    }
  ]
};

// Fallback mock members in case API fails
const mockMembers = [
  {
    id: '1',
    name: 'ClashKing',
    role: 'Leader',
    townHallLevel: 14,
    trophies: 5200,
    donations: 1500,
    donationsReceived: 800
  },
  {
    id: '2',
    name: 'BarbarianQueen',
    role: 'Co-leader',
    townHallLevel: 13,
    trophies: 4800,
    donations: 2200,
    donationsReceived: 1100
  },
  {
    id: '3',
    name: 'DragonSlayer',
    role: 'Elder',
    townHallLevel: 12,
    trophies: 4200,
    donations: 950,
    donationsReceived: 1200
  },
  {
    id: '4',
    name: 'WizardMaster',
    role: 'Member',
    townHallLevel: 11,
    trophies: 3800,
    donations: 600,
    donationsReceived: 800
  },
  {
    id: '5',
    name: 'GoblinThief',
    role: 'Member',
    townHallLevel: 10,
    trophies: 3200,
    donations: 300,
    donationsReceived: 900
  }
];

const ClanPage: React.FC = () => {
  const [clanData, setClanData] = useState(mockClan);
  const [members, setMembers] = useState(mockMembers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { fetchClanInfo, fetchClanMembers } = useApiCache();

  useEffect(() => {
    const loadClanData = async () => {
      setLoading(true);
      try {
        const clanInfo = await fetchClanInfo();
        setClanData(clanInfo);
        
        const memberData = await fetchClanMembers();
        // Transform API data to match our component's expected format
        const formattedMembers = memberData.map((member: any) => ({
          id: member.tag.replace('#', ''),
          name: member.name,
          role: member.role,
          townHallLevel: member.townHallLevel,
          trophies: member.trophies,
          donations: member.donations,
          donationsReceived: member.donationsReceived
        }));
        setMembers(formattedMembers);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error fetching clan data:', err);
        setError('Failed to load clan data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadClanData();
  }, [fetchClanInfo, fetchClanMembers]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading clan data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
        <p>{error}</p>
        <p className="mt-2">Using mock data instead.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Clan Header */}
      <Card>
        <CardHeader className="bg-clash-dark text-white">
          <div className="flex items-center space-x-6">
            <img 
              src={clanData.badgeUrls.medium} 
              alt={`${clanData.name} badge`} 
              className="w-24 h-24 rounded-full bg-white p-1"
            />
            <div>
              <CardTitle className="text-3xl">{clanData.name}</CardTitle>
              <CardDescription className="text-clash-gold">{clanData.tag}</CardDescription>
              <div className="flex space-x-4 mt-2">
                <span className="bg-clash-gold text-clash-dark px-2 py-1 rounded text-sm font-medium">
                  Level {clanData.clanLevel}
                </span>
                <span className="bg-clash-blue text-white px-2 py-1 rounded text-sm font-medium">
                  {clanData.warLeague?.name || 'No League'}
                </span>
                <span className="bg-white text-clash-dark px-2 py-1 rounded text-sm font-medium">
                  {clanData.members}/50 Members
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="wars">Wars</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Clan Information</h2>
                <p className="text-gray-700 mb-4">{clanData.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-500 mb-1">Location</h3>
                      <p>{clanData.location?.name || 'Not specified'}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-500 mb-1">Type</h3>
                      <p className="capitalize">{clanData.type}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-500 mb-1">Required Trophies</h3>
                      <p>{clanData.requiredTrophies}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-500 mb-1">War Frequency</h3>
                      <p className="capitalize">{clanData.warFrequency}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-500 mb-1">War Log</h3>
                      <p>{clanData.isWarLogPublic ? 'Public' : 'Private'}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-500 mb-1">Labels</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {clanData.labels && clanData.labels.map(label => (
                          <span key={label.id} className="bg-clash-dark text-white px-2 py-1 rounded text-xs">
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Clan Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-clash-gold text-clash-dark">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold mb-1">Clan Points</h3>
                      <p className="text-3xl font-bold">{clanData.clanPoints}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-clash-blue text-white">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold mb-1">Versus Points</h3>
                      <p className="text-3xl font-bold">{clanData.clanVersusPoints}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-clash-red text-white">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold mb-1">War Win Streak</h3>
                      <p className="text-3xl font-bold">{clanData.warWinStreak}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-clash-dark text-white">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold mb-1">War Record</h3>
                      <p className="text-3xl font-bold">
                        {clanData.warWins}W - {clanData.warLosses}L - {clanData.warTies}T
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="members" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Clan Members</h2>
              <MemberList members={members} loading={loading} />
            </TabsContent>
            
            <TabsContent value="wars" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">War History</h2>
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  <p>
                    War history data would be displayed here.
                    <br />
                    This would include recent wars, results, and performance metrics.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="text-center text-gray-500 text-sm">
        <p>Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}</p>
      </div>
    </div>
  );
};

export default ClanPage; 