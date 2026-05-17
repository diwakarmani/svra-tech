'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const info = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Challapalli, AP, India',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 63014 44782',
    href: 'tel:+916301444782',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@svra-tech.com',
    href: 'mailto:info@svra-tech.com',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: '24/7 – On-site & Remote',
  },
];

const ContactInfo = () => {
  return (
    <section className="py-16 bg-[#fafafa]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {info.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-3"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFF4CC' }}
              >
                <Icon size={22} style={{ color: '#FFC90E' }} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="text-sm font-medium text-gray-800 hover:underline break-all"
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm font-medium text-gray-800">{value}</p>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
