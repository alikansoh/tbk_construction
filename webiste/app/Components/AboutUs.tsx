// Updated AboutUsSectionComponent with smoother Framer Motion animations
'use client';

import React, { useCallback, memo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const STATS = [
  { number: '10+', label: 'Years Experience', icon: '📅' },
  { number: '300+', label: 'Happy Clients', icon: '😊' },
  { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
  { number: '85%', label: 'Repeat Clients', icon: '🔁' },
];

const VALUES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Quality Craftsmanship',
    description: 'Every project reflects our commitment to excellence and attention to detail.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'On-Time Delivery',
    description: 'We respect your time and consistently meet deadlines without compromising quality.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprises. Clear, upfront quotes for every project.',
  },
];

const TEAM_HIGHLIGHTS = [
  {
    title: 'Licensed Professionals',
    description: 'All our team members are fully licensed, insured, and continuously trained in the latest techniques.',
  },
  {
    title: 'Local Expertise',
    description: 'Based in your community, we understand local building codes and architectural styles.',
  },
  {
    title: 'Sustainable Practices',
    description: 'We prioritize eco-friendly materials and methods that are better for you and the environment.',
  },
];

function AboutUsSectionComponent() {
  const reduceMotion = useReducedMotion();

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const staggerParent: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const handlePrimaryClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.location.href = window.innerWidth >= 1024 ? '#quotes' : '/contact';
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated glowing circles using motion instead of CSS keyframes */}
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.26, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerParent}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold mb-8">
            ABOUT US
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl font-black text-white mb-4">
            Building Dreams,
            <span className="block mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Crafting Excellence
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-slate-200/90 max-w-3xl mx-auto">
            For over 15 years, we&apos;ve been transforming houses into homes with dedication and craftsmanship.
          </motion.p>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerParent}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {STATS.map((stat) => (
            <motion.div
              variants={fadeUp}
              key={stat.label}
              className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-slate-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* LEFT */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerParent} className="space-y-6">
            <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-black text-white mb-4">Our Story</h3>
              <p className="text-slate-200/90 leading-relaxed">
                What started as a small family business has grown into a well-respected construction company.
              </p>
              <p className="text-slate-200/90 leading-relaxed">
                We believe every homeowner deserves exceptional craftsmanship and honest service.
              </p>
            </motion.div>

            <motion.div variants={staggerParent} className="space-y-4">
              {TEAM_HIGHLIGHTS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                >
                  <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerParent} className="space-y-6">
            <motion.h3 variants={fadeUp} className="text-3xl font-black text-white mb-6">
              Our Core Values
            </motion.h3>

            <motion.div variants={staggerParent} className="grid gap-6">
              {VALUES.map((value) => (
                <motion.div
                  variants={fadeUp}
                  key={value.title}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex gap-4"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-orange-500/20 rounded-2xl border border-orange-400/30 text-orange-300">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Experience the Difference</h3>
          <p className="text-slate-200/90 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied homeowners!
          </p>

          <button
            onClick={handlePrimaryClick}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg"
          >
            Schedule Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AboutUsSectionComponent);
