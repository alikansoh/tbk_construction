'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

export default function AboutUsSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }} 
      />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8"
          >
            <svg className="w-4 h-4 " fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
            ABOUT US
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1]">
            Building Dreams,
            <span className="block mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(249,115,22,0.5)]">
              Crafting Excellence
            </span>
          </h2>
          
          <p className="text-lg text-slate-200/90 max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we&apos;ve been transforming houses into homes with dedication, expertise, and an unwavering commitment to quality craftsmanship.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-orange-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] transition-all duration-500 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative text-center">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold text-slate-300">
                    {stat.label}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
           <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.2)] transition-all duration-500">
  <h3 className="text-3xl font-black text-white mb-4">Our Story</h3>
  <div className="space-y-4 text-slate-200/90 leading-relaxed">
    <p>
      What started as a small family business has grown into a well-established company in construction and renovation. 
      Our journey began with a simple belief: every homeowner deserves exceptional craftsmanship and honest service.
    </p>
    <p>
      Today, we&apos;re proud to serve our community with a team of skilled professionals who share our passion for excellence. 
      From minor repairs to complete home transformations, we approach every project with the same dedication and attention to detail.
    </p>
    <p>
      Our success is built on relationships – with our clients, our team, and our community. 
      We don&apos;t just complete projects; we create lasting partnerships and spaces where memories are made.
    </p>
  </div>
</div>


            {/* Team Highlights */}
            <div className="space-y-4">
              {TEAM_HIGHLIGHTS.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-orange-400/30 shadow-lg hover:shadow-[0_10px_40px_rgba(249,115,22,0.2)] transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center border border-orange-400/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all">
                      <svg className="w-6 h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                        {highlight.title}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-black text-white mb-6">Our Core Values</h3>
            
            <div className="grid gap-6">
              {VALUES.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredValue(index)}
                  onHoverEnd={() => setHoveredValue(null)}
                  whileHover={{ x: 8 }}
                  className="relative group"
                >
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-orange-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] transition-all duration-500 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-400/30 text-orange-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300">
                        {value.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                          {value.title}
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: hoveredValue === index ? 1 : 0, x: hoveredValue === index ? 0 : -10 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_100px_rgba(249,115,22,0.2)] transition-all duration-500 relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

            <div className="relative text-center">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                Experience the Difference
              </h3>
              <p className="text-slate-200/90 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of satisfied homeowners who trust us with their most important projects
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_rgba(249,115,22,0.8)] transition-all flex items-center gap-3 group/cta cursor-pointer"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      if (window.innerWidth >= 1024) {
                        window.location.href = '#quotes';
                      } else {
                        window.location.href = '/contact';
                      }
                    }
                  }}
                >
                  <span>Schedule Consultation</span>
                  <svg
                    className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
                
                <a href="tel:07340170864">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-md hover:bg-white/15 border border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center gap-3 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>07340170864</span>
                  </motion.button>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center border border-green-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <svg className="w-3.5 h-3.5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold">Family Owned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-600/30 flex items-center justify-center border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span className="font-semibold">5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/30 to-red-600/30 flex items-center justify-center border border-orange-400/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    <svg className="w-3.5 h-3.5 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold">Certified Experts</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.08); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
}