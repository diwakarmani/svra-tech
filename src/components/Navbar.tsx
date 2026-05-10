'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home',     href: '/',         hash: ''         },
  { name: 'About',    href: '/#about',   hash: '#about'   },
  { name: 'Services', href: '/#services',hash: '#services' },
  { name: 'Contact',  href: '/contact',  hash: ''         },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Also clear hash state when navigating to a non-home page
  useEffect(() => {
    if (pathname !== '/') setActiveHash('');
  }, [pathname]);

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.href === '/contact') return pathname === '/contact';
    if (item.hash) return pathname === '/' && activeHash === item.hash;
    // Home: active on '/' only when no hash is set
    return pathname === '/' && activeHash === '';
  };

  const handleHashClick = (hash: string) => {
    setActiveHash(hash);
    setIsMobileMenuOpen(false);
  };

  const headerStyle = {
    '--nav-link-text-color': 'rgb(86, 88, 94)',
    '--nav-link-text-color-hover': 'rgb(13, 20, 26)',
    '--width': '1240px',
    '--padding': '21px 16px',
    '--m-padding': '24px 16px',
    '--link-spacing': '32px',
  } as React.CSSProperties;

  return (
    <motion.header
      className="w-full bg-white sticky top-0 z-50 shadow-sm"
      style={headerStyle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Desktop */}
      <div
        className="hidden md:flex items-center justify-between"
        style={{ padding: 'var(--padding)', maxWidth: 'var(--width)', margin: '0 auto' }}
      >
        <Link
          href="/"
          className="font-semibold text-lg"
          onClick={() => handleHashClick('')}
        >
          <span style={{ color: '#FFC90E' }}>SVRA</span>
          <span className="text-black"> Technology Solutions</span>
        </Link>

        <nav>
          <ul className="flex items-center gap-[var(--link-spacing)]">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => handleHashClick(item.hash)}
                    className={`text-sm transition-colors pb-0.5 ${
                      active
                        ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/contact"
          onClick={() => handleHashClick('')}
          className="bg-black text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Get a Quote
        </Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden" style={{ padding: 'var(--m-padding)' }}>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold"
            onClick={() => handleHashClick('')}
          >
            <span style={{ color: '#FFC90E' }}>SVRA</span>
            <span className="text-black"> Tech</span>
          </Link>
          <button
            type="button"
            className="flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Menu"
          >
            <span className={`w-6 h-0.5 bg-black mb-1.5 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-black mb-1.5 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-black transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40">
            <nav>
              <ul className="flex flex-col py-2">
                {navItems.map((item) => {
                  const active = isActive(item);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => handleHashClick(item.hash)}
                        className={`block px-4 py-3 text-sm transition-colors ${
                          active
                            ? 'bg-gray-100 border-l-4 border-gray-900 font-medium text-gray-900'
                            : 'text-gray-600'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
                <li className="px-4 py-3">
                  <Link
                    href="/contact"
                    onClick={() => handleHashClick('')}
                    className="inline-block bg-black text-white text-sm px-5 py-2.5 rounded-full font-medium"
                  >
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
