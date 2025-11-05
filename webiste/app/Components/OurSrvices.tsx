'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Import your service images
import homeMaintenanceImg from '../../public/maintenance.jpg';
import kitchenRemodelingImg from '../../public/kitchen.jpg';
import carpenter from '../../public/carpenter.jpg';
import electric from '../../public/electric.jpg';
import plumber from '../../public/plumber.jpg';
import painter from '../../public/painter.jpg';

const SERVICES = [
  {
    image: homeMaintenanceImg,
    title: 'Home Maintenance',
    description: 'Keep your home in perfect condition with our comprehensive maintenance services.',
    features: ['Regular Inspections', 'Preventive Care', 'Emergency Repairs'],
    link: '/services/home-maintenance',
  },
  {
    image: kitchenRemodelingImg,
    title: 'Kitchen Remodeling',
    description: 'Transform your kitchen into a modern, functional space that adds value to your home.',
    features: ['Custom Designs', 'Quality Materials', 'Professional Install'],
    link: '/services/kitchen-remodeling',
  },
  {
    image: carpenter,
    title: 'Carpeting & Flooring',
    description: 'Expert installation for carpets, hardwood, tile, laminate, and luxury vinyl.',
    features: ['Free Consultation', 'Quick Installation', 'Lifetime Warranty'],
    link: '/services/carpeting-flooring',
  },
  {
    image: electric,
    title: 'Electrical Work',
    description: 'Licensed electricians for safe, code-compliant electrical installations and repairs.',
    features: ['24/7 Emergency', 'Licensed & Insured', 'Safety Certified'],
    link: '/services/electrical-work',
  },
  {
    image: plumber,
    title: 'Plumbing',
    description: 'Professional plumbing services from routine maintenance to major installations.',
    features: ['Fast Response', 'Quality Workmanship', 'Upfront Pricing'],
    link: '/services/plumbing',
  },
  {
    image: painter,
    title: 'Painting & Finishing',
    description: 'Interior and exterior painting services that bring new life to your property.',
    features: ['Premium Paints', 'Clean Process', 'Color Consulting'],
    link: '/services/painting-finishing',
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements - matching hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      {/* Noise texture - matching hero */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }} 
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Section Header with Hero-style Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
            </svg>
            OUR SERVICES
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1]">
            Professional Solutions for
            <span className="block mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(249,115,22,0.5)]">
              Every Project
            </span>
          </h2>
          
          <p className="text-lg text-slate-200/90 max-w-2xl mx-auto leading-relaxed">
            From small repairs to complete renovations, our skilled professionals deliver exceptional results
          </p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Link key={service.title} href={service.link}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer"
              >
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-orange-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.3)] transition-all duration-500 h-full">
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Image Container */}
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0, x: hoveredIndex === index ? 0 : 20 }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.6)]"
                    >
                      <span className="text-xs font-bold text-white">Premium</span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 mb-5 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                          className="flex items-center text-sm text-slate-200 group/item"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-md bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center mr-3 border border-orange-400/30 group-hover/item:scale-110 group-hover/item:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all">
                            <svg className="w-3 h-3 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <span className="font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_45px_rgba(249,115,22,0.6)] transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Enhanced Bottom CTA - Hero Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 relative"
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
                Ready to Start Your Project?
              </h3>
              <p className="text-slate-200/90 mb-8 max-w-2xl mx-auto text-lg">
                Get a <span className="text-orange-300 font-semibold">free consultation</span> and quote from our expert team today
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r  cursor-pointer from-orange-500 via-orange-600 to-red-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_rgba(249,115,22,0.8)] transition-all flex items-center gap-3 group/cta"
                  onClick={() => {
                    if (window.innerWidth >= 1024) {
                      window.location.href = '#quotes';
                    } else {
                      // For mobile screens
                      window.location.href = '/contact';
                    }
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Get Free quote</span>
                  <svg
                    className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
                <a href="tel:07340170864" >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/15 border border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>  
                  07340170864</span>
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
                  <span className="font-semibold">24/7 Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-600/30 flex items-center justify-center border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/30 to-red-600/30 flex items-center justify-center border border-orange-400/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    <svg className="w-3.5 h-3.5 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold" >Free Estimates</span>
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