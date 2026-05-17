'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Brand */}
          <div>
            <h5 className="text-lg font-bold mb-3">
              <span style={{ color: '#FFC90E' }}>SVRA</span> Technology Solutions
            </h5>
            <p className="text-sm text-gray-400 mb-4">
              Customized, proactive managed IT services — security, networking, remote support,
              and app development — for businesses that depend on their systems every day.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-lg font-bold mb-3">Services</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Security', 'Network Solutions', 'Remote Support', 'App Development'].map(s => (
                <li key={s}>
                  <Link href="/#services" className="hover:text-white transition">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-lg font-bold mb-3">Contact</h5>
            <address className="not-italic space-y-2 text-sm text-gray-400">
              <p>Challapalli, AP, India</p>
              <p className="pt-1">
                <a href="tel:+916301444782" className="hover:text-white transition">
                  +91 63014 44782
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@svra-tech.com"
                  className="underline hover:text-white transition"
                >
                  info@svra-tech.com
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-bold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { label: 'Home',    href: '/' },
                { label: 'About',   href: '/#about' },
                { label: 'Services',href: '/#services' },
                { label: 'Contact', href: '/contact' },
              ].map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="border-t border-gray-700 mt-12 pt-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <span>
            © {new Date().getFullYear()} SVRA Technology Solutions. All rights reserved.
          </span>
          <span>
            <Link href="/contact" className="hover:text-gray-300 transition">
              Contact
            </Link>
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
