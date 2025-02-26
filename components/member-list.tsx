import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Member {
  id: string;
  name: string;
  role: string;
  townHallLevel: number;
  trophies: number;
  donations: number;
  donationsReceived: number;
}

interface MemberListProps {
  members: Member[];
  loading?: boolean;
  error?: string;
}

const MemberList: React.FC<MemberListProps> = ({ members, loading = false, error }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-lg">Loading members...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border border-red-200">
        <CardContent className="p-8 text-center">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!members || members.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-lg">No members found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-center">TH Level</TableHead>
            <TableHead className="text-center">Trophies</TableHead>
            <TableHead className="text-center">Donations</TableHead>
            <TableHead className="text-center">Received</TableHead>
            <TableHead className="text-center">Ratio</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            const donationRatio = member.donationsReceived > 0 
              ? (member.donations / member.donationsReceived).toFixed(2) 
              : member.donations > 0 ? '∞' : '0';
              
            return (
              <TableRow key={member.id}>
                <TableCell>
                  <Link href={`/members/${member.id}`} className="font-medium text-clash-blue hover:underline">
                    {member.name}
                  </Link>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell className="text-center">{member.townHallLevel}</TableCell>
                <TableCell className="text-center">{member.trophies}</TableCell>
                <TableCell className="text-center">{member.donations}</TableCell>
                <TableCell className="text-center">{member.donationsReceived}</TableCell>
                <TableCell className="text-center">
                  <span className={`
                    ${parseFloat(donationRatio as string) >= 1 ? 'text-green-600' : 'text-red-600'}
                    ${donationRatio === '∞' ? 'text-clash-blue' : ''}
                  `}>
                    {donationRatio}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="clash" size="sm" asChild>
                    <Link href={`/members/${member.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList; 