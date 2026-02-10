'use client';

import React, { useCallback, memo, useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const STATS = [
  { number: "10+", label: "Years Experience", icon: "📅" },
  { number: "300+", label: "Happy Clients", icon: "😊" },
  { number: "98%", label: "Client Satisfaction", icon: "⭐" },
  { number: "85%", label: "Repeat Clients", icon: "🔁" },
];

const VALUES = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Quality Craftsmanship",
    description:
      "Every project reflects our commitment to excellence and attention to detail.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "On-Time Delivery",
    description:
      "We respect your time and consistently meet deadlines without compromising quality.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Transparent Pricing",
    description:
      "No hidden fees or surprises. Clear, upfront quotes for every project.",
  },
];

const TEAM_HIGHLIGHTS = [
  {
    title: "Licensed Professionals",
    description:
      "All our team members are fully licensed, insured, and continuously trained in the latest techniques.",
  },
  {
    title: "Local Expertise",
    description:
      "Based in your community, we understand local building codes and architectural styles.",
  },
  {
    title: "Sustainable Practices",
    description:
      "We prioritize eco-friendly materials and methods that are better for you and the environment.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "TBK transformed our kitchen. Professional, on time and exceptionally clean work.",
    author: "J.Akil",
    location: "Harrow",
    rating: 5,
    date: "Jan 2026",
    service: "Kitchen Renovation"
  },
  {
    quote: "Quick emergency repair they arrived within an hour. Highly recommend.",
    author: "A.Husseini",
    location: "Ealing",
    rating: 5,
    date: "Dec 2025",
    service: "Emergency Repair"
  },
  {
    quote:
      "Excellent craftsmanship and communication throughout. We'll hire them again.",
    author: "M.Tachem",
    location: "Greenford",
    rating: 5,
    date: "Nov 2025",
    service: "Bathroom Remodel"
  },
  {
    quote:
      "Very good service and friendly team. Fixed our plumbing issue quickly.",
    author: "A.Kansoh ",
    location: "North West London",
    rating: 5,
    date: "Oct 2025",
    service: "Plumbing"
  },
  {
    quote:
      "Outstanding work on our extension. Exceeded all expectations!",
    author: "L.Bliebel",
    location: "Wembley",
    rating: 5,
    date: "Sep 2025",
    service: "Home Extension"
  },
  {
    quote:
      "Professional team, fair pricing, and beautiful results. Couldn't be happier.",
    author: "H. Basharouch",
    location: "Harrow",
    rating: 5,
    date: "Aug 2025",
    service: "Full Renovation"
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

function AboutUsSectionComponent() {
  const reduceMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("open-quote-modal"));
  }, []);

  const handlePhoneClick = useCallback(() => {
    window.location.href = "tel:07340170864";
  }, []);

  const handleEmailClick = useCallback(() => {
    window.location.href = "mailto:info@tbkconstruction.co.uk";
  }, []);

  // Check scroll position
  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="about"
      className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Animated glowing circles */}
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.26, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerParent}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold mb-8"
          >
            ABOUT US
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-black text-white mb-4"
          >
            Building Dreams,
            <span className="block mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Crafting Excellence
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-slate-200/90 max-w-3xl mx-auto"
          >
            For over 15 years, we&apos;ve been transforming houses into homes
            with dedication and craftsmanship.
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
              <div className="text-sm font-semibold text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerParent}
            className="space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-3xl font-black text-white mb-4">Our Story</h3>
              <p className="text-slate-200/90 leading-relaxed mb-4">
                What started as a small family business has grown into a
                well-respected construction company.
              </p>
              <p className="text-slate-200/90 leading-relaxed">
                We believe every homeowner deserves exceptional craftsmanship
                and honest service.
              </p>
            </motion.div>

            <motion.div variants={staggerParent} className="space-y-4">
              {TEAM_HIGHLIGHTS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                >
                  <h4 className="text-lg font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerParent}
            className="space-y-6"
          >
            <motion.h3
              variants={fadeUp}
              className="text-3xl font-black text-white mb-6"
            >
              Our Core Values
            </motion.h3>

            <motion.div variants={staggerParent} className="grid gap-6">
              {VALUES.map((value) => (
                <motion.div
                  variants={fadeUp}
                  key={value.title}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex gap-4"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-orange-500/20 rounded-2xl border border-orange-400/30 text-orange-300 flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* CONTACT & REVIEWS SECTION */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerParent}
          className="mb-20"
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-center text-white mb-12"
          >
            What Clients Say
          </motion.h3>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* CONTACT INFO */}
            <motion.div
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 space-y-6"
            >
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Office Location
                </h4>
                <p className="text-slate-200/90 ml-9">
                  Lowlands Road, Harrow, England, HA1 3AN
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Phone
                </h4>
                <button
                  onClick={handlePhoneClick}
                  className="text-orange-300 hover:text-orange-200 font-semibold text-lg ml-9 transition-colors"
                >
                  07340170864
                </button>
                <p className="text-slate-400 text-sm ml-9 mt-1">
                  Available 24/7 for emergencies
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email
                </h4>
                <button
                  onClick={handleEmailClick}
                  className="text-orange-300 hover:text-orange-200 font-semibold ml-9 transition-colors"
                >
                  info@tbkconstruction.co.uk
                </button>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-lg font-bold text-white mb-3">
                  Emergency Services Available 24/7
                </h4>
                <p className="text-slate-300 text-sm">
                  We&apos;re here when you need us most. Call our emergency hotline
                  anytime.
                </p>
                <button
                  onClick={handlePhoneClick}
                  className="mt-4 bg-red-500/20 border border-red-400/30 text-red-200 font-bold py-3 px-6 rounded-xl hover:bg-red-500/30 transition-colors w-full"
                >
                  🚨 Emergency: 07340170864
                </button>
              </div>
            </motion.div>

            {/* ENHANCED REVIEWS SECTION */}
            <motion.div
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 overflow-hidden"
            >
              <h4 className="text-xl font-bold text-white mb-6">Client Reviews</h4>

              {/* Reviews Carousel */}
              <div className="relative">
                <div
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scroll-smooth snap-x snap-mandatory hide-scrollbar"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {TESTIMONIALS.map((t, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="min-w-[300px] bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl hover:border-orange-400/30 transition-all snap-start group"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
                          {getInitials(t.author)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-bold text-white text-sm">
                              {t.author}
                            </h5>
                            <span className="inline-flex items-center gap-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span>📍 {t.location}</span>
                            <span>•</span>
                            <span>{t.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-3">
                        <StarRating rating={t.rating} />
                      </div>

                      {/* Quote */}
                      <p className="text-slate-200 text-sm leading-relaxed mb-4 line-clamp-4 group-hover:line-clamp-none transition-all">
                        &ldquo;{t.quote}&rdquo;
                      </p>

                      {/* Service Tag */}
                      <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-400/20 text-orange-300 px-3 py-1.5 rounded-lg text-[11px] font-semibold">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        {t.service}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                {canScrollLeft && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-slate-900/95 border border-white/20 text-white p-2 rounded-full shadow-xl hover:bg-slate-800 hover:scale-110 transition-all backdrop-blur-sm z-10"
                    aria-label="Scroll left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}

                {canScrollRight && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-slate-900/95 border border-white/20 text-white p-2 rounded-full shadow-xl hover:bg-slate-800 hover:scale-110 transition-all backdrop-blur-sm z-10"
                    aria-label="Scroll right"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}
              </div>

              {/* Footer Note */}
              <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-white/10">
                Reviews from real clients — names abbreviated for privacy.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-md rounded-3xl p-12 border border-orange-400/20"
        >
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-slate-200/90 mb-8 max-w-2xl mx-auto text-lg">
            Join hundreds of satisfied homeowners. Get your free consultation today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handlePrimaryClick}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              Get Your Free Quote
            </button>
            <button
              onClick={handlePhoneClick}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              📞 Call Us Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default memo(AboutUsSectionComponent);