import React, { useState, useEffect } from 'react';
import MemberList from '../../components/member-list';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getClanMembers } from '@/utils/api';

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

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const memberData = await getClanMembers();
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
        console.error('Error fetching member data:', err);
        setError('Failed to load member data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort members based on sort criteria
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'role':
        comparison = a.role.localeCompare(b.role);
        break;
      case 'townHallLevel':
        comparison = a.townHallLevel - b.townHallLevel;
        break;
      case 'trophies':
        comparison = a.trophies - b.trophies;
        break;
      case 'donations':
        comparison = a.donations - b.donations;
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clan Members</h1>
        <div className="flex space-x-4">
          <div>
            <Input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-clash-blue"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="townHallLevel">Town Hall Level</option>
              <option value="trophies">Trophies</option>
              <option value="donations">Donations</option>
            </select>
          </div>
          <Button 
            variant="clash"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <MemberList members={sortedMembers} loading={loading} error={error} />
        </CardContent>
      </Card>

      <div className="text-center text-gray-500 text-sm">
        <p>Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}</p>
      </div>
    </div>
  );
};

export default MembersPage; 