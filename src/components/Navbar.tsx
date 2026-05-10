'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home',     href: '/' },
    { name: 'About',    href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact',  href: '/contact' },
  ];

  const headerStyle = {
    '--nav-link-font-weight': '400',
    '--nav-link-text-color': 'rgb(86, 88, 94)',
    '--nav-link-text-color-hover': 'rgb(13, 20, 26)',
    '--header-height-mobile': '66px',
    '--width': '1240px',
    '--padding': '21px 16px 21px 16px',
    '--m-padding': '24px 16px 24px 16px',
    '--logo-width': '148px',
    '--link-spacing': '32px',
    '--m-logo-width': '55px',
    '--background-color': '#ffffff',
  } as React.CSSProperties;

  return (
    <motion.header
      className="block-header w-full bg-white sticky top-0 z-50 shadow-sm"
      style={headerStyle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="background absolute inset-0 bg-white" />

      {/* Desktop */}
      <div
        className="hidden md:flex items-center justify-between relative"
        style={{ padding: 'var(--padding)', maxWidth: 'var(--width)', margin: '0 auto' }}
      >
        <Link href="/" className="text-black font-semibold text-lg">
          <span style={{ color: '#FFC90E' }}>SVRA</span>
          <span className="text-black"> Technology Solutions</span>
        </Link>

        <nav>
          <ul className="flex items-center gap-[var(--link-spacing)]">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(item.href.replace('/#', '/'));
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors ${
                      isActive ? 'border-b-2 border-gray-900 text-gray-900 font-medium' : ''
                    }`}
                    style={{ color: isActive ? 'rgb(13,20,26)' : 'var(--nav-link-text-color)' }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.color = 'var(--nav-link-text-color-hover)')
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.color = isActive
                        ? 'rgb(13,20,26)'
                        : 'var(--nav-link-text-color)')
                    }
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
          className="bg-black text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Get a Quote
        </Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative" style={{ padding: 'var(--m-padding)' }}>
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold">
            <span style={{ color: '#FFC90E' }}>SVRA</span>
            <span className="text-black"> Tech</span>
          </Link>
          <button
            type="button"
            className="flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Menu"
          >
            <span
              className={`w-6 h-0.5 bg-black mb-1.5 transition-transform ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black mb-1.5 transition-opacity ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-transform ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40">
            <nav>
              <ul className="flex flex-col py-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 text-sm transition-colors ${
                          isActive
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
