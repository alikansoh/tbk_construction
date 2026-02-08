'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

type ServiceDetailProps = {
  title: string;
  imageSrc: string;
  summary: string;
  description: string;
  startingPrice?: string;
  features?: string[];
  benefits?: string[];
  process?: { title: string; detail: string }[];
  faqs?: { q: string; a: string }[];
};

// Smooth easing curve for all animations
const smoothEasing: [number, number, number, number] = [0.4, 0, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEasing },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: smoothEasing },
  },
};

export default function ServiceDetail({
  title,
  imageSrc,
  summary,
  description,
  startingPrice,
  features = [],
  benefits = [],
  process = [],
  faqs = [],
}: ServiceDetailProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: title, name, phone, postcode, message }),
      });

      if (res.ok) {
        setFormMessage('Thank you! We will contact you within 24 hours.');
        setName('');
        setPhone('');
        setPostcode('');
        setMessage('');
      } else {
        setFormMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormMessage('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden min-h-screen">
      {/* Enhanced Animated Background with Multiple Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Gradients */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-orange-500/20 via-orange-500/10 to-transparent rounded-full blur-[120px] animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-radial from-red-500/15 via-red-500/8 to-transparent rounded-full blur-[100px] animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-gradient-radial from-orange-600/12 via-orange-600/6 to-transparent rounded-full blur-[110px] animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Secondary Accent Lights */}
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-gradient-radial from-amber-500/10 to-transparent rounded-full blur-[80px] animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-radial from-rose-500/8 to-transparent rounded-full blur-[90px] animate-pulse" 
             style={{ animationDuration: '9s', animationDelay: '3s' }} />
      </div>

      {/* Refined Grid Pattern with Gradient Fade */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.15) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(249, 115, 22, 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Noise Texture Overlay for Depth */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
           }} />

      {/* Fixed CTA Button - Bottom Right Corner - ALWAYS VISIBLE */}
      <motion.button
        onClick={scrollToForm}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4, ease: smoothEasing }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white rounded-full shadow-[0_10px_40px_rgba(249,115,22,0.7)] hover:shadow-[0_15px_60px_rgba(249,115,22,0.9)] transition-all backdrop-blur-sm border-2 border-white/30 hover:border-white/50 flex items-center gap-2 group"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span>Get Free Quote</span>
        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 pb-28 lg:pb-24">
        {/* Header Section - Enhanced Typography */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={fadeUp} 
          className="mb-20 lg:mb-24"
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: smoothEasing }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gradient-to-r from-orange-500/15 via-orange-500/20 to-red-500/15 backdrop-blur-xl border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-shadow duration-500"
          >
            <span className="relative flex h-2 w-2 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
            </span>
            PROFESSIONAL SERVICE
          </motion.div>

          {/* Main Title with Enhanced Gradient */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEasing }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-br from-white via-slate-50 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              {title}
            </span>
          </motion.h1>
          
          {/* Subtitle with Better Spacing */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-slate-300/90 max-w-4xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEasing }}
            viewport={{ once: true }}
          >
            {summary}
          </motion.p>

          {/* Optional Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEasing }}
            viewport={{ once: true }}
            className="h-[2px] w-24 bg-gradient-to-r from-orange-500 to-transparent mt-8 origin-left"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 mb-20">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-14">
            {/* Hero Image - Enhanced with Better Shadow and Border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: smoothEasing }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative w-full h-[380px] sm:h-[480px] lg:h-[550px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_35px_110px_rgba(249,115,22,0.35),0_0_1px_rgba(249,115,22,0.3)] transition-all duration-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <Image 
                src={imageSrc} 
                alt={title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90" />

              {startingPrice && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: smoothEasing }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 left-8 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 px-8 py-5 rounded-2xl shadow-[0_15px_50px_rgba(249,115,22,0.7),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/20 backdrop-blur-md"
                >
                  <span className="text-xs text-white/80 block font-semibold tracking-wide uppercase mb-1">Starting From</span>
                  <span className="text-4xl lg:text-5xl font-black text-white drop-shadow-lg">{startingPrice}</span>
                </motion.div>
              )}

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Description Card - Refined */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEasing }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-10 lg:p-12 border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-orange-500/20 hover:shadow-[0_25px_90px_rgba(249,115,22,0.15)] transition-all duration-700 group overflow-hidden"
            >
              {/* Ambient Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-radial from-orange-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-red-500/20 border border-orange-400/30 flex items-center justify-center shadow-[0_8px_30px_rgba(249,115,22,0.15)]">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">About This Service</h2>
                </div>
                
                <p className="text-slate-200/90 text-base lg:text-lg leading-relaxed font-light">{description}</p>
              </div>
            </motion.div>

            {/* COMPLETELY REDESIGNED Full-Width Features Section */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: smoothEasing }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative -mx-4 sm:-mx-6 lg:-mx-8"
              >
                {/* Full-Width Container with Dark Gradient Background */}
                <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-black/90 backdrop-blur-xl py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                  
                  {/* Dramatic Background Effects */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.15),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.1),transparent_50%)]" />
                  
                  {/* Animated Gradient Orbs */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-orange-500/20 via-orange-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-red-500/15 via-red-500/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                  
                  {/* Diagonal Lines Pattern */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(249,115,22,0.5) 35px, rgba(249,115,22,0.5) 36px)`
                  }} />
                  
                  <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Bold Header Section */}
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: smoothEasing }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 mb-6"
                      >
                        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-orange-500 to-orange-500 rounded-full" />
                        <span className="text-orange-400 text-xs sm:text-sm font-bold tracking-widest uppercase">Service Includes</span>
                        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent via-orange-500 to-orange-500 rounded-full" />
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: smoothEasing }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-5 tracking-tight"
                      >
                        <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
                          What&apos;s Included
                        </span>
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: smoothEasing }}
                        viewport={{ once: true }}
                        className="text-slate-300/80 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-light"
                      >
                        Premium features designed to deliver exceptional results
                      </motion.p>
                    </div>
                    
                    {/* Wide Feature Grid - Up to 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
                      {features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: idx * 0.05, 
                            ease: smoothEasing 
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                          className="group/item relative"
                        >
                          {/* Feature Card */}
                          <div className="relative h-full bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 lg:p-7 border border-white/10 hover:border-orange-400/50 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(249,115,22,0.4)]">
                            
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />
                            
                            {/* Top Glow Line */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                              {/* Large Icon */}
                              <div className="mb-5">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-orange-500/30 via-orange-500/20 to-red-500/30 border-2 border-orange-400/40 flex items-center justify-center group-hover/item:scale-110 group-hover/item:rotate-3 group-hover/item:shadow-[0_12px_30px_rgba(249,115,22,0.5)] transition-all duration-500">
                                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-orange-300 group-hover/item:text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              
                              {/* Feature Text */}
                              <h4 className="text-white group-hover/item:text-orange-100 text-base sm:text-lg lg:text-xl font-bold leading-tight mb-2 transition-colors duration-500">
                                {feature}
                              </h4>
                              
                              {/* Decorative Line */}
                              <div className="h-[2px] w-0 group-hover/item:w-12 bg-gradient-to-r from-orange-500 to-transparent transition-all duration-500" />
                            </div>
                            
                            {/* Corner Accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-orange-500/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Bottom Info Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: smoothEasing }}
                      viewport={{ once: true }}
                      className="mt-12 sm:mt-16 text-center"
                    >
                      <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-orange-500/20 to-red-500/15 border border-orange-400/30 backdrop-blur-lg shadow-[0_8px_30px_rgba(249,115,22,0.3)]">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-[0_4px_15px_rgba(249,115,22,0.5)]">
                          <span className="text-white text-lg font-black">{features.length}</span>
                        </div>
                        <div className="text-left">
                          <div className="text-xs text-orange-300/80 font-medium uppercase tracking-wide">Total Features</div>
                          <div className="text-sm text-white font-bold">Premium Service Package</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Benefits - Premium Card */}
            {benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEasing }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-red-500/10 backdrop-blur-2xl rounded-3xl p-10 lg:p-12 border border-orange-400/20 shadow-[0_25px_80px_rgba(249,115,22,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden group"
              >
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-orange-500/15 to-transparent rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-red-500/10 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-9">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 border border-orange-400/40 flex items-center justify-center shadow-[0_10px_35px_rgba(249,115,22,0.4)]">
                      <svg className="w-7 h-7 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Why Choose Us</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {benefits.map((benefit, idx) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.05, ease: smoothEasing }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex items-start gap-4 group/item"
                      >
                        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white text-sm font-bold shadow-[0_6px_20px_rgba(249,115,22,0.4)] border border-white/20 group-hover/item:scale-110 transition-transform duration-500">
                          {idx + 1}
                        </div>
                        <span className="text-slate-100/90 text-sm lg:text-base pt-1.5 font-light leading-relaxed">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Process Steps - Enhanced Timeline */}
            {process.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEasing }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex items-center gap-4 mb-9">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-red-500/20 border border-orange-400/30 flex items-center justify-center shadow-[0_8px_30px_rgba(249,115,22,0.15)]">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">How It Works</h3>
                </div>
                
                <div className="space-y-6 relative">
                  {/* Enhanced Connecting Line with Gradient */}
                  <div className="absolute left-7 top-20 bottom-20 w-[2px] bg-gradient-to-b from-orange-500/60 via-orange-400/40 to-orange-500/60 hidden sm:block" />
                  
                  {process.map((step, idx) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: smoothEasing }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="relative flex gap-6 bg-white/[0.03] backdrop-blur-xl p-7 lg:p-9 rounded-2xl border border-white/10 hover:border-orange-400/40 hover:bg-white/[0.06] transition-all duration-500 shadow-lg hover:shadow-[0_15px_55px_rgba(249,115,22,0.2)] group"
                    >
                      {/* Step Number Badge */}
                      <div className="relative z-10 w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white text-2xl font-bold shadow-[0_12px_40px_rgba(249,115,22,0.5)] border-2 border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        {idx + 1}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight">{step.title}</h4>
                        <p className="text-slate-300/90 text-sm lg:text-base leading-relaxed font-light">{step.detail}</p>
                      </div>

                      {/* Hover Accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ Section - Professional Accordion */}
            {faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEasing }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex items-center gap-4 mb-9">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-red-500/20 border border-orange-400/30 flex items-center justify-center shadow-[0_8px_30px_rgba(249,115,22,0.15)]">
                    <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Frequently Asked Questions</h3>
                </div>
                
                <div className="space-y-4">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <motion.div
                        key={faq.q}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05, ease: smoothEasing }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 hover:border-orange-400/30 overflow-hidden transition-all duration-500 shadow-lg hover:shadow-[0_10px_40px_rgba(249,115,22,0.15)]"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-6 lg:p-7 text-left hover:bg-white/[0.03] transition-colors duration-200 group"
                        >
                          <span className="font-semibold text-white text-base lg:text-lg pr-6 group-hover:text-orange-300 transition-colors duration-200">
                            {faq.q}
                          </span>
                          <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-orange-500/15 border border-orange-400/30 text-orange-400 font-bold text-xl transition-all duration-500 ${isOpen ? 'rotate-180 bg-orange-500/25' : ''}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, ease: smoothEasing }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 lg:px-7 pb-6 lg:pb-7">
                            <div className="pl-5 border-l-2 border-orange-500/40">
                              <p className="text-slate-300/90 text-sm lg:text-base leading-relaxed font-light">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Premium Quote Form */}
          <div className="lg:col-span-1">
            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: smoothEasing }}
              viewport={{ once: true, margin: "-100px" }}
              className="sticky top-8 bg-white/[0.04] backdrop-blur-2xl rounded-3xl p-8 lg:p-9 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_35px_120px_rgba(249,115,22,0.3)] transition-all duration-500 overflow-hidden group"
            >
              {/* Ambient Glow Effects */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-radial from-orange-500/15 to-transparent rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-radial from-red-500/10 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              
              <div className="relative z-10">
                {/* Icon and Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    viewport={{ once: true }}
                    className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 flex items-center justify-center shadow-[0_15px_50px_rgba(249,115,22,0.6)] border-2 border-white/20"
                  >
                    <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">Quick Contact</h3>
                  <p className="text-sm text-slate-300/80 font-light">Get a free quote in 24 hours</p>
                </div>

                {/* Form - Simplified */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Your Name <span className="text-orange-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all font-light"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Phone <span className="text-orange-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all font-light"
                      placeholder="07123 456789"
                    />
                  </div>

                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium text-slate-300 mb-2">
                      Postcode <span className="text-orange-400">*</span>
                    </label>
                    <input
                      id="postcode"
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all uppercase font-light"
                      placeholder="SW1A 1AA"
                      maxLength={8}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all resize-none font-light"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-bold text-base rounded-xl shadow-[0_15px_50px_rgba(249,115,22,0.6)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.8)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Quote
                          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  </motion.button>

                  {formMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-center text-white bg-orange-500/20 border border-orange-400/40 p-4 rounded-xl backdrop-blur-sm shadow-lg"
                    >
                      {formMessage}
                    </motion.div>
                  )}
                </form>

                {/* Trust Badges */}
                <div className="mt-9 pt-7 border-t border-white/10">
                  <div className="space-y-4">
                    {[
                      { icon: '✓', text: 'Licensed & Insured' },
                      { icon: '✓', text: 'Free Estimates' },
                      { icon: '✓', text: 'No Obligation' },
                    ].map((badge, idx) => (
                      <motion.div
                        key={badge.text}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-sm text-slate-300/90"
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/40 flex items-center justify-center shadow-[0_4px_15px_rgba(34,197,94,0.2)]">
                          <span className="text-green-400 text-xs font-bold">{badge.icon}</span>
                        </div>
                        <span className="font-light">{badge.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}