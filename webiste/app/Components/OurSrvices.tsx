'use client';

import React, { useState, JSX } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// Import images (ensure these paths are correct in your project)
import homeMaintenanceImg from '../../public/maintenance.jpg';
import kitchenRemodelingImg from '../../public/kitchen.jpg';
import carpenter from '../../public/carpenter.jpg';
import electric from '../../public/electric.jpg';
import plumber from '../../public/plumber.jpg';
import painter from '../../public/painter.jpg';

interface ServiceItem {
  image: StaticImageData;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  link: string;
  badge?: string;
  popular?: boolean;
}

const SERVICES: ServiceItem[] = [
  {
    image: homeMaintenanceImg,
    title: 'Home Maintenance Services',
    subtitle: 'Comprehensive Property Care',
    description: 'Keep your property in pristine condition with our proactive maintenance programs. We handle everything from routine inspections to urgent repairs, ensuring your home remains safe, functional, and valuable.',
    features: ['Annual Maintenance Plans', 'Preventive Inspections', 'Priority Emergency Response', 'Warranty on All Work'],
    link: '/services/home-maintenance',
    badge: 'Most Popular',
    popular: true,
  },
  {
    image: kitchenRemodelingImg,
    title: 'Kitchen Remodeling & Design',
    subtitle: 'Transform Your Culinary Space',
    description: 'Create the kitchen of your dreams with our full-service remodeling solutions. From initial design to final installation, we deliver stunning, functional kitchens that increase your home\'s value.',
    features: ['3D Design Visualization', 'Premium Appliances & Fixtures', 'Custom Cabinetry', 'Project Management Included'],
    link: '/services/kitchen-remodeling',
  },
  {
    image: carpenter,
    title: 'Carpentry & Flooring Installation',
    subtitle: 'Expert Woodwork & Floor Fitting',
    description: 'Bespoke carpentry and professional flooring installation services. We specialize in hardwood, laminate, vinyl, and tile flooring, plus custom built-ins, shelving, and joinery work.',
    features: ['Free Design Consultation', 'Premium Material Selection', 'Precision Installation', 'Lifetime Craftsmanship Guarantee'],
    link: '/services/carpentry-flooring',
  },
  {
    image: electric,
    title: 'Licensed Electrical Services',
    subtitle: 'Safe & Code-Compliant Solutions',
    description: 'Fully licensed and insured electricians for residential and commercial projects. From rewiring to smart home installations, we ensure safety, efficiency, and compliance with all regulations.',
    features: ['Emergency Call-Out Service', 'Part P Certified', 'Smart Home Integration', 'Safety Inspections & Testing'],
    link: '/services/electrical-work',
    badge: 'Fast Response',
  },
  {
    image: plumber,
    title: 'Professional Plumbing Services',
    subtitle: 'Reliable Installations & Repairs',
    description: 'Comprehensive plumbing solutions for homes and businesses. Our experienced plumbers handle everything from leak repairs to complete bathroom installations with minimal disruption.',
    features: ['Same-Day Service Available', 'Gas Safe Registered', 'Fixed-Price Quotes', 'Clean & Tidy Guarantee'],
    link: '/services/plumbing',
  },
  {
    image: painter,
    title: 'Painting & Decorating',
    subtitle: 'Interior & Exterior Finishing',
    description: 'Professional painting and decorating services that transform your property. We use premium materials and meticulous techniques to deliver flawless, long-lasting finishes.',
    features: ['Colour Consultation Service', 'Eco-Friendly Paint Options', 'Furniture Protection', 'No-Mess Guarantee'],
    link: '/services/painting-finishing',
  },
];

const cubicEasing: [number, number, number, number] = [0.22, 0.8, 0.32, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cubicEasing },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: cubicEasing,
    },
  }),
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: cubicEasing },
  },
};

export default function ServicesSection(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-24 left-10 w-[32rem] h-[32rem] bg-orange-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-24 right-10 w-[32rem] h-[32rem] bg-red-500/15 rounded-full blur-[120px] animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-orange-400/10 rounded-full blur-[150px] animate-pulse-slowest" />
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={fadeUp} 
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: cubicEasing }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-6 py-3 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400"></span>
            </span>
            COMPREHENSIVE SERVICES
          </motion.div>

          <motion.h2
            id="services-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: cubicEasing }}
          >
            Expert Solutions for
            <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent mt-2">
              Every Home Project
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: cubicEasing }}
          >
            From minor repairs to complete home transformations, our certified professionals deliver 
            exceptional craftsmanship with{' '}
            <span className="text-orange-300 font-semibold">genuine care for your home</span>.
          </motion.p>

          {/* Trust Indicators - More Humanized */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: cubicEasing }}
          >
            {[
              { icon: '1', text: 'Fully Licensed & Insured' },
              { icon: '2', text: 'Customer Satisfaction First' },
              { icon: '3', text: 'Responsive & Reliable' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/30 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link href={service.link} className="block h-full">
                <motion.div
                  whileHover={{ y: -12, transition: { duration: 0.3, ease: cubicEasing } }}
                  className="relative h-full bg-gradient-to-b from-white/8 to-white/4 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-orange-400/40 transition-all duration-500 shadow-2xl hover:shadow-[0_25px_80px_rgba(249,115,22,0.3)]"
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 px-4 py-1.5 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.6)]">
                      <span className="text-xs font-bold text-white uppercase tracking-wide">⭐ Most Popular</span>
                    </div>
                  )}

                  {/* Badge */}
                  {service.badge && !service.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0.9, 
                        scale: hoveredIndex === index ? 1 : 0.95 
                      }}
                      transition={{ duration: 0.3, ease: cubicEasing }}
                      className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full"
                    >
                      <span className="text-xs font-bold text-orange-300 uppercase tracking-wide">{service.badge}</span>
                    </motion.div>
                  )}

                  {/* Image Section */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={`${service.title} - Professional home services`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                    
                    {/* Animated overlay on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-orange-950/80 via-slate-900/40 to-transparent"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-7">
                    {/* Title Section */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-orange-300/80 font-medium">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          variants={iconVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-3 text-sm text-slate-200"
                        >
                          <div className="mt-0.5 w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-md bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-400/40 group-hover:from-orange-500/40 group-hover:to-red-500/40 transition-all">
                            <svg className="w-3 h-3 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="leading-snug">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-3.5 px-6 rounded-xl text-center font-bold shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        View Service Details
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: hoveredIndex === index ? 4 : 0 }}
                          transition={{ duration: 0.3, ease: cubicEasing }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </span>
                      
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: hoveredIndex === index ? ['0%', '200%'] : '0%',
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Bottom gradient accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: cubicEasing }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: cubicEasing }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl max-w-4xl">
            <div className="text-left sm:text-left flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                Not Sure Which Service You Need?
              </h3>
              <p className="text-slate-300 text-sm md:text-base">
                Get a free consultation with our team — we&apos;ll listen to your needs and recommend the right solution for your home.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new Event('open-quote-modal'))}
              className="flex-shrink-0 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_rgba(249,115,22,0.7)] transition-all whitespace-nowrap"
            >
              Get Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse-slowest {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-pulse-slowest {
          animation: pulse-slowest 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}