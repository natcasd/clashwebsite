import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-clash-dark text-white shadow-md">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-clash-gold">
              Clash of Clans Tracker
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-clash-gold transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/clan" className="hover:text-clash-gold transition-colors">
                    Clan
                  </Link>
                </li>
                <li>
                  <Link href="/members" className="hover:text-clash-gold transition-colors">
                    Members
                  </Link>
                </li>
                <li>
                  <Link href="/wars" className="hover:text-clash-gold transition-colors">
                    Wars
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="container py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 