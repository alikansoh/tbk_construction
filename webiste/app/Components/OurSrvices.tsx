'use client';

import React, { useState ,JSX } from 'react';
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
  description: string;
  features: string[];
  link: string;
}

const SERVICES: ServiceItem[] = [
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

// Use numeric easing arrays (cubic-bezier like) which match the Transition type
const cubicEasing: [number, number, number, number] = [0.22, 0.8, 0.32, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cubicEasing },
  },
};

// cardVariant uses a function so we type as Variants and return a variant object from visible
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  // visible can be a function that receives custom (we pass index as custom)
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: cubicEasing,
    },
  }),
};

export default function ServicesSection(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-10 w-[28rem] h-[28rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-24 right-10 w-[28rem] h-[28rem] bg-red-500/15 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'3.5\\' numOctaves=\\'4\\' /%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\' /%3E%3C/svg%3E')",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: cubicEasing }}
            className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-6"
          >
            OUR SERVICES
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: cubicEasing }}
          >
            Professional Solutions for
            <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent mt-3">
              Every Project
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-200/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: cubicEasing }}
          >
            From small repairs to complete renovations, our skilled professionals deliver exceptional results.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Link key={service.title} href={service.link}>
              <motion.div
                custom={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative cursor-pointer"
                whileHover={{ y: -8, transition: { duration: 0.25, ease: cubicEasing } }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-orange-400/40 transition-all duration-500 shadow-lg hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <div className="relative w-full h-52 overflow-hidden">
                    <Image src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                    {/* Premium badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0, x: hoveredIndex === index ? 0 : 20 }}
                      transition={{ duration: 0.28, ease: cubicEasing }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                    >
                      <span className="text-xs font-bold text-white">Premium</span>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">{service.title}</h3>

                    <p className="text-slate-300 text-sm mb-4">{service.description}</p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center text-sm text-slate-200">
                          <div className="w-5 h-5 flex items-center justify-center rounded-md bg-orange-500/30 border border-orange-400/30 mr-3">✓</div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-3 rounded-xl text-center font-bold shadow-[0_0_25px_rgba(249,115,22,0.4)]">
                      Learn More →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
