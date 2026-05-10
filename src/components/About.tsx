'use client';

import React from 'react';
import Image from 'next/image';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

const fadeIn: MotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const About = () => {
  return (
    <section id="about" className="bg-[#fafafa] py-16 md:py-24">
      {/* Who We Are */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 md:mb-24">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Who We{' '}
              <span style={{ color: '#FFC90E' }}>Are.</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We understand that IT needs are unique and can&apos;t be addressed with a
              &ldquo;one size fits all&rdquo; approach. That&apos;s why we customize our services
              to align with each partner&apos;s specific goals. We recommend only what you truly
              need and continuously evaluate your business to enhance your Technology solutions.
            </p>
          </motion.div>
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src="/images/about1.webp"
              alt="SVRA Network Solutions"
              width={700}
              height={450}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* What We Believe */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-md order-2 md:order-1"
          >
            <Image
              src="/images/about2.webp"
              alt="SVRA Managed IT"
              width={700}
              height={450}
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div {...fadeIn} className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What We{' '}
              <span style={{ color: '#FFC90E' }}>Believe</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experience the advantages of managed IT solutions with SVRA Technology Solutions.
              Whether on-site or remote, we&apos;re here for you 24/7, with your satisfaction as
              our top priority. As a growing business, you depend on your systems every day, so
              eliminate downtime with SVRA Technology Solutions. We provide a comprehensive range
              of IT services at highly affordable rates and take pride in being proactive, not
              reactive.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
