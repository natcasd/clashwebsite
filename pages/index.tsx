import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CLAN_TAG } from '@/utils/api';
import { useClanInfo } from '@/utils/swr-hooks';

const Home: React.FC = () => {
  const { data: clanInfo, error, isLoading } = useClanInfo();
  const clanName = clanInfo?.name || 'Clash Champions';

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-clash-dark text-white rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-clash-gold">{clanName}</span> Tracker
            </h1>
            <p className="text-lg mb-6">
              Track our clan's progress, monitor member performance, and analyze war statistics all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="clash" asChild>
                <Link href="/clan">View Clan</Link>
              </Button>
              <Button variant="clashGold" asChild>
                <Link href="/members">Member Stats</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 bg-gray-800 min-h-[300px] flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-xl font-semibold mb-2">Clan Tag: {CLAN_TAG}</p>
              <p className="text-sm text-gray-400">Join us in-game using this tag</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Clan Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-clash-gold rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">👥</span>
              </div>
              <CardTitle>Member Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep track of all our clan members, their donations, activity, and performance in wars.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-clash-red rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">⚔️</span>
              </div>
              <CardTitle>War Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Analyze our war performance, track win rates, and identify our strongest attackers.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="h-12 w-12 bg-clash-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">📊</span>
              </div>
              <CardTitle>Progress Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                View our clan's overall progress, including trophy counts, donation statistics, and more.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-clash-gold text-clash-dark p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Clan!</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          We're always looking for active players who love to participate in wars and donate troops.
        </p>
        <div className="flex justify-center">
          <Button variant="default" className="bg-clash-dark hover:bg-gray-800" asChild>
            <Link href="/clan">View Clan Details</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home; 