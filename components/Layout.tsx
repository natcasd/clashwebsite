import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/clan', label: 'Clan' },
    { href: '/members', label: 'Members' },
    { href: '/wars', label: 'Wars' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-clash-dark text-white shadow-md">
        <div className="container py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-clash-gold">
              Bring on the Ruckus🐻
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={`hover:text-clash-gold transition-colors ${
                        router.pathname === link.href ? 'text-clash-gold' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-clash-dark text-white border-clash-gold w-1/3">
                <nav className="flex flex-col mt-4">
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className={`text-lg hover:text-clash-gold transition-colors block py-2 ${
                            router.pathname === link.href ? 'text-clash-gold' : ''
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="container py-6 px-4 sm:px-6 lg:px-8 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 