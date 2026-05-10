'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Security',
    highlightWord: null,
    image: '/images/security.jpg',
    description:
      'Protecting your information is our highest priority. Let us help you operate efficiently and securely.',
  },
  {
    title: 'Network',
    highlightWord: 'Solutions',
    image: '/images/network.jpg',
    description:
      'We design, implement, secure, and maintain your network to ensure continuous connectivity around the clock.',
  },
  {
    title: 'Remote',
    highlightWord: 'Support',
    image: '/images/remote.jpg',
    description:
      "Supporting remote employees is easy with us. We've chosen top-notch software to provide assistance to your team, wherever they may be.",
  },
  {
    title: 'App',
    highlightWord: 'Development',
    image: '/images/app.jpg',
    description:
      'Transform your ideas into powerful apps with our expert development services. From concept to launch, we work closely with you to create customized applications tailored to your specific needs.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Services We{' '}
            <span style={{ color: '#FFC90E' }}>Offer</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={svc.image}
                  alt={`${svc.title} ${svc.highlightWord ?? ''}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">
                  {svc.title}{' '}
                  {svc.highlightWord && (
                    <span style={{ color: '#FFC90E' }}>{svc.highlightWord}</span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{svc.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/contact"
            className="inline-block rounded-full px-8 py-3 font-semibold text-black transition hover:opacity-90"
            style={{ backgroundColor: '#FFC90E' }}
          >
            Request a Service
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
