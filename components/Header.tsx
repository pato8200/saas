'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              WORKOUT SYSTEM
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;