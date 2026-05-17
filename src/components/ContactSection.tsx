'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-16 md:py-24"
      style={{ backgroundColor: '#1A1A1A', color: '#fff' }}
    >
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span style={{ color: '#FFC90E' }}>Contact</span> Us
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Ready to improve your IT infrastructure? Reach out — we respond within one business
            day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin size={18} style={{ color: '#FFC90E' }} />
              <span>Challapalli, AP, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} style={{ color: '#FFC90E' }} />
              <a href="tel:+916301444782" className="hover:text-white transition">
                +91 63014 44782
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} style={{ color: '#FFC90E' }} />
              <a
                href="mailto:info@svra-tech.com"
                className="hover:text-white transition underline"
              >
                info@svra-tech.com
              </a>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-block rounded-full px-10 py-3 font-semibold text-black transition hover:opacity-90"
            style={{ backgroundColor: '#FFC90E' }}
          >
            Send an Enquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
