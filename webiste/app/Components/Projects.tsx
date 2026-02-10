'use client';

import React, { useState, useEffect, useRef, JSX } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  category: string;
  description: string;
  stats: {
    duration: string;
    budget: string;
  };
  images: string[];
}

const PROJECTS: Project[] = [
  {
    title: 'Modern Kitchen Renovation',
    category: 'Kitchen',
    description: 'Complete kitchen transformation with custom cabinetry and premium finishes',
    stats: { duration: '3 weeks', budget: '£12k' },
    images: ['/kitchen2.jpeg','/kitchen1.mp4', '/kitchen3.jpeg']
  },
  {
    title: 'Luxury Room Design',
    category: 'Interior Design',
    description: 'A beautifully designed room featuring modern painting, stylish décor elements, and a refined aesthetic finish',
    stats: { duration: '2 days', budget: '£500' },
    images: ['room.jpeg']
  },
  {
    title: "Modern Room Redesign",
    category: "Interior Design",
    description: "A full room redesign featuring freshly painted built-in wardrobes, soft neutral wall finishes, modern lighting, and minimalistic décor to enhance brightness and space.",
    stats: { duration: "3 weeks", budget: "£12k" },
    images: ["room2.jpeg"]
  },
  {
    title: "Bedroom Remodelling",
    category: "Bedroom",
    description: "A complete bedroom remodelling project featuring new premium wood flooring and custom-built floor-to-ceiling wardrobes, finished in a modern neutral palette for a clean and elegant look.",
    stats: { duration: "4 weeks", budget: "£10k" },
    images: ["bedroom.jpeg","bedroom2.jpeg"]
  },
  {
    title: 'new cabinet design',
    category: 'Conversion',
    description: 'Bespoke oak media cabinet and floating storage system installed in Harrow. Custom joinery with concealed TV mounting, integrated warm LED accent lighting, soft‑close doors and tailored shelving to maximise storage and display. Completed in 10 weeks — contact TBK Construction for free quotes on bespoke cabinets and living‑room joinery across Greater London.',
    stats: { duration: '1weeks', budget: '£500' },
    images: ['cabinet.jpeg']
  },
  {
    title: ' kitchen refurbishment',
    category: 'Kitchen Remodel',
    description: 'Contemporary kitchen refurbishment in Harrow with matte-black handleless base units, bespoke extractor hood, integrated stainless-steel ovens and newly installed oak herringbone flooring. Includes supply & fit of cabinetry, electrical for recessed LED downlights and appliance circuits, plumbing for a new sink, and floor sanding & finishing. Completed in 8 weeks.',
    stats: { duration: '8 weeks', budget: '£18,500' },
    images: ['kitchen.jpeg']
  },
  {
    title: 'underfloor heating',
    category: 'Flooring & Heating',
    description: 'Supply and install reflective foil underlay and electric foil heating mats beneath engineered oak flooring. Work includes taped seams, careful mat placement through narrow runs and room areas, preparation of plastered walls, cable management and staged laying of oak planks. Ideal for homeowners seeking efficient electric underfloor heating combined with a premium herringbone oak finish .',
    stats: { duration: '3 days', budget: '£1,800' },
    images: ['under1.jpeg', 'under2.jpeg', 'under3.jpeg']
  }
];

/** helpers **/
const isVideoFile = (src?: string) => !!src && /\.(mp4|webm|mov|ogg)$/i.test(src);

/** Truncate helper - returns approximately the first 15 words for carousel preview */
const truncatePreview = (text: string, wordLimit: number = 15) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return { text, isTruncated: false };
  return { text: words.slice(0, wordLimit).join(' '), isTruncated: true };
};

/** Truncate helper - returns approximately the first half of the content by words for modal (optional) */
const truncateHalfWords = (text: string) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= 8) return text; // short copy - don't truncate
  const half = Math.ceil(words.length / 2);
  return words.slice(0, half).join(' ');
};

/**
 * Media component - unified:
 */
const Media = ({
  src,
  alt = '',
  className = '',
  hero = false,
  controls = false,
  asThumbnail = false,
}: {
  src?: string;
  alt?: string;
  className?: string;
  hero?: boolean;
  controls?: boolean;
  asThumbnail?: boolean;
}) => {
  if (!src) return null;
  const path = src.startsWith('/') ? src : `/${src}`;
  const isVideo = isVideoFile(path);

  if (isVideo && asThumbnail) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center bg-slate-800 ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/40 to-slate-900/20" />
            <div className="flex items-center justify-center gap-2 p-2">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
        <video
          className={`w-full h-full object-contain ${className}`}
          src={path}
          {...(hero ? { autoPlay: true, loop: true, muted: true, playsInline: true } : {})}
          controls={controls}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      <Image
        src={path}
        alt={alt}
        fill
        className="object-cover"
        priority={hero ? true : false}
      />
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }: { value: string | number; duration?: number }) => {
  const [count, setCount] = useState<number>(0);
  const countRef = useRef<number>(0);

  useEffect(() => {
    const startTime = Date.now();
    const endValue = typeof value === 'string' ? parseInt(String(value).replace(/\D/g, '')) : Number(value);

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * (isNaN(endValue) ? 0 : endValue));

      countRef.current = current;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value, duration]);

  if (typeof value === 'string') {
    if (value.includes('+')) return <>{count}+ </>;
    if (value.includes('%')) return <>{count}% </>;
    if (value.includes('/')) return <>{value}</>;
  }

  return <>{count}</>;
};

export default function ProjectsSection(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // refs to handle deferred actions
  const pendingScrollRef = useRef<boolean>(false);
  const pendingOpenModalRef = useRef<boolean>(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const openProjectModal = (project: Project, index: number) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
    if (typeof document !== 'undefined') document.body.style.overflow = 'unset';
  };

  // doScroll function used by both immediate and deferred flows
  const doScrollToQuote = () => {
    if (typeof document === 'undefined') return;

    const el = document.getElementById('quotes') as HTMLElement | null;

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      } catch (e) {}
    } else {
      if (typeof window !== 'undefined') window.location.hash = '#quotes';
    }
  };

  // OPEN QUOTE: if modal open, defer until modal exits; otherwise dispatch event immediately
  const handleGoToQuote = () => {
    if (isModalOpen) {
      pendingOpenModalRef.current = true;
      closeModal();
    } else {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-quote-modal'));
      }
      doScrollToQuote();
    }
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
    }),
  };

  const currentProject = PROJECTS[currentIndex];

  return (
    <section id="projects" className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-6 sm:mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            OUR PORTFOLIO
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-[1.1] px-4">
            Transforming Visions into
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(249,115,22,0.5)]">
              Beautiful Reality
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl mx-auto leading-relaxed px-4">
            Explore our collection of completed projects showcasing quality craftsmanship and attention to detail
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slide */}
          <div
            className="relative h-[480px] sm:h-[520px] md:h-[560px] lg:h-[650px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait" custom={direction} onExitComplete={() => {
              if (pendingScrollRef.current) {
                pendingScrollRef.current = false;
                setTimeout(doScrollToQuote, 20);
              }
            }}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 35 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                  {/* Image Section */}
                  <div className="relative h-3/5 sm:h-2/3 bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
                      <Media
                        src={currentProject.images && currentProject.images[0]}
                        alt={`${currentProject.title} hero`}
                        hero
                        className=""
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.6)]">
                      <span className="text-xs sm:text-sm font-bold text-white">{currentProject.category}</span>
                    </div>

                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full overflow-hidden">
                      <div className="flex items-center gap-1">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="text-xs sm:text-sm font-bold text-white inline-block"
                          >
                            {String(currentIndex + 1).padStart(2, '0')}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-xs sm:text-sm font-bold text-white/70">/</span>
                        <span className="text-xs sm:text-sm font-bold text-white/70">
                          {String(PROJECTS.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative h-2/5 sm:h-1/3 p-4 sm:p-6 lg:p-8 flex flex-col">
                    {/* Text content with flexible height but limited */}
                    <div className="flex-1 min-h-0 flex flex-col mb-3">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2 leading-tight flex-shrink-0">
                        {currentProject.title}
                      </h3>

                      {/* Truncated preview description with line-clamp */}
                      <div className="flex-1 min-h-0 overflow-hidden">
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {(() => {
                            const full = currentProject.description || '';
                            const { text: preview, isTruncated } = truncatePreview(full, 15);
                            return (
                              <>
                                <span>{preview}</span>
                                {isTruncated && <span>…</span>}
                              </>
                            );
                          })()}
                        </p>
                        {(() => {
                          const full = currentProject.description || '';
                          const { isTruncated } = truncatePreview(full, 15);
                          return isTruncated ? (
                            <button
                              onClick={() => openProjectModal(currentProject, currentIndex)}
                              className="mt-1 text-orange-300 underline font-semibold text-sm hover:text-orange-400 transition-colors inline-block"
                              aria-label={`Read more about ${currentProject.title}`}
                            >
                              Read more
                            </button>
                          ) : null;
                        })()}
                      </div>
                    </div>

                    {/* Button - always visible at bottom */}
                    <div className="flex-shrink-0">
                      <motion.button
                        onClick={() => openProjectModal(currentProject, currentIndex)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 sm:py-2.5 lg:py-3 px-3 sm:px-4 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-xs sm:text-sm lg:text-base truncate">View Full Project ({currentProject.images.length} {currentProject.images.length === 1 ? 'photo' : 'photos'})</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 z-10 group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 z-10 group"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Navigation - Infinite Loop for Mobile */}
          <div className="mt-6 sm:mt-8">
            <div className="relative">
              {/* Desktop: Standard Grid */}
              <div className="hidden sm:flex justify-center gap-3 flex-wrap">
                {PROJECTS.map((project, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? 'border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.6)]'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    aria-label={`Go to ${project.title}`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={(project.images && (project.images[0].startsWith('/') ? project.images[0] : `/${project.images[0]}`)) || ''}
                        alt={`${project.title} thumbnail`}
                        fill
                        className={`object-cover ${index === currentIndex ? '' : 'opacity-90'}`}
                        priority={index === currentIndex}
                      />
                    </div>

                    {index === currentIndex && (
                      <motion.div
                        layoutId="activeSlide"
                        className="absolute inset-0 bg-orange-500/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile: Infinite Loop Slider */}
              <div className="sm:hidden relative overflow-hidden">
                <div className="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
                  <div className="flex gap-2 px-4 pb-2">
                    {[...PROJECTS, ...PROJECTS, ...PROJECTS].map((project, idx) => {
                      const actualIndex = idx % PROJECTS.length;
                      return (
                        <motion.button
                          key={`${actualIndex}-${idx}`}
                          onClick={() => goToSlide(actualIndex)}
                          whileTap={{ scale: 0.95 }}
                          className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 snap-center ${
                            actualIndex === currentIndex
                              ? 'border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.6)]'
                              : 'border-white/20'
                          }`}
                          aria-label={`Go to ${project.title}`}
                        >
                          <Image
                            src={(project.images && (project.images[0].startsWith('/') ? project.images[0] : `/${project.images[0]}`)) || ''}
                            alt={`${project.title} thumb`}
                            fill
                            className={`object-cover ${actualIndex === currentIndex ? '' : 'opacity-90'}`}
                          />
                          {actualIndex === currentIndex && (
                            <div className="absolute inset-0 bg-orange-500/20"></div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { number: '500+', label: 'Projects Completed', icon: 'M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z' },
            { number: '98%', label: 'Client Satisfaction', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { number: '15+', label: 'Years Experience', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { number: '24/7', label: 'Support Available', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-orange-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(249,115,22,0.2)] transition-all duration-300 group text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-400/30 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2 group-hover:text-orange-300 transition-colors">
                <AnimatedCounter value={stat.number} />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r cursor-pointer from-orange-500 via-orange-600 to-red-500 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-xl shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_rgba(249,115,22,0.8)] transition-all inline-flex items-center gap-2 sm:gap-3 group"
            onClick={handleGoToQuote}
          >
            <span className="text-base sm:text-lg">get your free quote</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence onExitComplete={() => {
        if (pendingOpenModalRef.current) {
          pendingOpenModalRef.current = false;
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('open-quote-modal'));
          }
          setTimeout(doScrollToQuote, 20);
        }
      }}>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-6xl max-h-[95vh] bg-slate-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-110 group"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 overflow-y-auto">
                {/* Image Gallery Side */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Main Image / Video Player */}
                  <div className="relative h-64 sm:h-80 md:h-96 rounded-lg sm:rounded-xl overflow-hidden bg-slate-800">
                    {isVideoFile(selectedProject.images[currentImageIndex]) ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <video
                          className="w-full h-full object-cover"
                          src={selectedProject.images[currentImageIndex].startsWith('/') ? selectedProject.images[currentImageIndex] : `/${selectedProject.images[currentImageIndex]}`}
                          controls
                          playsInline
                        />
                      </div>
                    ) : (
                      <Media
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                        className=""
                      />
                    )}

                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all hover:scale-110 z-10"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 border border-white/20 flex items-center justify-center transition-all hover:scale-110 z-10"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProject.images.map((img: string, index: number) => {
                      const actualSrc = img.startsWith('/') ? img : `/${img}`;
                      const video = isVideoFile(img);
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          {video ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                              <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/20" />
                              </div>
                              <div className="flex items-center justify-center w-full h-full">
                                <svg className="w-8 h-8 sm:w-9 sm:h-9 text-white/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={actualSrc}
                              alt={`${selectedProject.title} thumb ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          )}

                          {index === currentImageIndex && (
                            <div className="absolute inset-0 bg-orange-500/20"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details Side */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 text-orange-300 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold mb-3 sm:mb-4">
                      {selectedProject.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 leading-tight">
                      {selectedProject.title}
                    </h3>
                    
                    {/* Full description in modal */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-400/30 flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-slate-400 font-medium">Duration</div>
                          <div className="text-white font-bold text-base sm:text-lg truncate">{selectedProject.stats.duration}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-400/30 flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-slate-400 font-medium">Investment</div>
                          <div className="text-white font-bold text-base sm:text-lg truncate">{selectedProject.stats.budget}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <h4 className="text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">Project Highlights</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {[
                        'Premium materials and finishes',
                        'Expert craftsmanship throughout',
                        'On-time delivery and budget',
                        'Full project management',
                        '2-year workmanship guarantee'
                      ].map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_rgba(249,115,22,0.7)] transition-all flex items-center justify-center gap-2"
                      onClick={handleGoToQuote}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm sm:text-base">Start Similar Project</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth touch scrolling on mobile */
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }

        /* Line clamp utilities for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}