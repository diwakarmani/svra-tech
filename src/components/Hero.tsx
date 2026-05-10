'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/home.webp"
        alt="SVRA Technology Solutions"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="text-sm uppercase tracking-widest text-white/70 mb-4 font-medium">
          Security · Network · Support · Development
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Guiding You to the Best{' '}
          <span style={{ color: '#FFC90E' }}>IT</span>
          <br />
          <span style={{ color: '#FFC90E' }}>Solutions</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/90">
          Customized, proactive IT services tailored to your business goals — available 24/7,
          on-site or remote.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/contact"
            className="rounded-full px-8 py-3 font-semibold text-black transition hover:opacity-90"
            style={{ backgroundColor: '#FFC90E' }}
          >
            Get Started
          </Link>
          <Link
            href="/#services"
            className="rounded-full border border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Our Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
