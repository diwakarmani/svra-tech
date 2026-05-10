'use client';

import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_ENQUIRY_API_URL ||
  'https://svra-tms-native-latest.onrender.com/api/public/enquiry';
const ENTITY_CODE = process.env.NEXT_PUBLIC_ENTITY_CODE || 'TECH';

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_MS = 60 * 60 * 1000;
const LS_KEY = 'svra_tech_enquiry_ts';

const COUNTRY_CODES = [
  { code: '+1',   label: 'US/CA (+1)' },
  { code: '+44',  label: 'UK (+44)' },
  { code: '+91',  label: 'IN (+91)' },
  { code: '+61',  label: 'AU (+61)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+65',  label: 'SG (+65)' },
  { code: '+46',  label: 'SE (+46)' },
  { code: '+49',  label: 'DE (+49)' },
  { code: '+33',  label: 'FR (+33)' },
  { code: '+81',  label: 'JP (+81)' },
  { code: '+86',  label: 'CN (+86)' },
  { code: '+55',  label: 'BR (+55)' },
  { code: '+27',  label: 'ZA (+27)' },
  { code: '+234', label: 'NG (+234)' },
  { code: '+60',  label: 'MY (+60)' },
];

function getSubmissionTimestamps(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function isRateLimited(): boolean {
  const now = Date.now();
  const recent = getSubmissionTimestamps().filter(ts => now - ts < RATE_LIMIT_MS);
  return recent.length >= RATE_LIMIT_MAX;
}

function recordSubmission() {
  const now = Date.now();
  const recent = getSubmissionTimestamps().filter(ts => now - ts < RATE_LIMIT_MS);
  recent.push(now);
  localStorage.setItem(LS_KEY, JSON.stringify(recent));
}

interface SubmitResult {
  ticketNumber: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    subject: '',
    description: '',
    _hp: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData._hp) return;

    if (isRateLimited()) {
      setStatus('error');
      setErrorMsg('Too many enquiries submitted. Please wait an hour before trying again.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    try {
      const payload = {
        name: fullName,
        email: formData.email.trim(),
        phone: formData.phone ? `${formData.countryCode}${formData.phone.trim()}` : undefined,
        subject: formData.subject.trim() || `Enquiry from ${fullName}`,
        description: formData.description.trim(),
        entityCode: ENTITY_CODE,
      };

      const res = await axios.post(API_URL, payload, {
        timeout: 20_000,
        headers: { 'Content-Type': 'application/json' },
      });

      const data = res.data?.data;
      recordSubmission();
      setResult({ ticketNumber: data?.ticketNumber ?? '', message: data?.message ?? '' });
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+1',
        phone: '',
        subject: '',
        description: '',
        _hp: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.message;
        setErrorMsg(msg || 'Something went wrong. Please try again.');
      } else {
        setErrorMsg('Network error. Please check your connection and try again.');
      }
    }
  };

  return (
    <section className="relative py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/about.png"
          alt="Contact Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <motion.div
        className="max-w-3xl mx-auto px-4 text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          Get in Touch with<br />
          <span style={{ color: '#FFC90E' }}>SVRA Technology Solutions</span>
        </h1>
        <p className="text-lg mt-4 mb-12 text-white/90">
          Tell us about your IT needs — we&apos;ll get back to you within one business day.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' && result ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl text-gray-900 text-left"
            >
              <button
                onClick={() => { setStatus('idle'); setResult(null); }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X size={18} className="text-gray-500" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={32} />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    Enquiry Submitted!
                  </h2>
                  <p className="text-gray-600">
                    Thank you for reaching out. Your enquiry has been received and a support
                    ticket has been created to track it.
                  </p>
                </div>
              </div>

              {result.ticketNumber && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-5">
                  <p className="text-sm text-gray-500 mb-1">Your ticket reference</p>
                  <p className="text-lg font-mono font-semibold text-gray-900">
                    {result.ticketNumber}
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6 text-sm text-blue-700">
                <strong>What happens next?</strong> Our team will review your enquiry and
                respond to <strong>{formData.email || 'your email'}</strong> within one business
                day.
              </div>

              <button
                onClick={() => { setStatus('idle'); setResult(null); }}
                className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
              >
                Submit Another Enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl text-left space-y-5 shadow-xl text-gray-900"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              />

              {/* First / Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-900 text-sm"
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="302-596-1418"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Network Setup, Security Audit, App Development…"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="description"
                  rows={5}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your IT requirements or questions…"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 text-black px-8 py-3 rounded-full font-medium transition disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: '#FFC90E' }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Submitting…
                  </>
                ) : (
                  'Submit Enquiry'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ContactForm;
