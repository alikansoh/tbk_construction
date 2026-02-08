'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Utensils,
  Layers,
  Zap,
  Wrench,
  Droplet,
  Phone,
  Mail,
  Info,
  FolderOpen,
  MessageSquare,
  FileText,
  Clock,
  LucideIcon,
} from 'lucide-react';

export default function ConstructionNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services: {
    name: string;
    icon: LucideIcon;
    href: string;
    description: string;
  }[] = [
    {
      name: 'Home Maintenance',
      icon: Wrench,
      href: '/services/home-maintenance',
      description: 'Complete home repair and maintenance solutions',
    },
    {
      name: 'Kitchen Remodeling',
      icon: Utensils,
      href: '/services/kitchen-remodeling',
      description: 'Custom kitchen design and renovation',
    },
    {
      name: 'Carpentry',
      icon: Layers,
      href: '/services/carpentry-flooring',
      description: 'Expert woodwork and custom joinery',
    },
    {
      name: 'Electrical Work',
      icon: Zap,
      href: '/services/electrical-work',
      description: 'Licensed electrical services and upgrades',
    },
    {
      name: 'Plumbing',
      icon: Droplet,
      href: '/services/plumbing',
      description: 'Professional plumbing installation and repairs',
    },
    {
      name: 'Painting & Finishing',
      icon: Layers,
      href: '/services/painting-finishing',
      description: 'Interior and exterior painting services',
    },
  ];

  // Smooth-scroll handler for About link
  function handleAboutClick(e: React.MouseEvent) {
    // If we're already on the homepage, prevent default navigation and smooth scroll
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const target = document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // fallback: navigate to home anchor
        window.location.href = '/#about';
      }
      // close mobile menu if open
      setIsOpen(false);
      setServicesOpen(false);
    }
    // otherwise allow Link to navigate to "/#about"
  }

  // Smooth-scroll handler for Projects link
  function handleProjectsClick(e: React.MouseEvent) {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const target = document.getElementById('projects');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = '/#projects';
      }
      setIsOpen(false);
      setServicesOpen(false);
    }
    // otherwise allow Link to navigate to "/#projects"
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#4E4D4F] text-white py-2.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+447340170864"
                className="flex items-center space-x-2 hover:text-[#F3782D] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">07340170864</span>
              </a>
              <a
                href="mailto:info@tbkconstruction.co.uk"
                className="flex items-center space-x-2 hover:text-[#F3782D] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@tbkconstruction.co.uk</span>
              </a>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#F3782D]" />
                <span className="text-gray-300">24/7 Emergency Service</span>
              </div>
              <span className="text-[#F3782D]">•</span>
              <span className="text-gray-300">Licensed &amp; Insured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg border-b-2 border-[#F3782D]' : 'shadow-md border-b border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-40 lg:h-50">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative w-40 h-40 lg:w-50 lg:h-50 rounded-lg p-2 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Image src="/logo.png" alt="BuildPro Construction" fill className="object-contain p-1" priority />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavLink href="/" icon={Home} text="Home" />
              {/* About now uses NavLink with onClick to smooth-scroll when on home */}
              <NavLink href="/#about" icon={Info} text="About Us" onClick={handleAboutClick} />

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-[#4E4D4F] hover:text-[#F3782D] px-5 py-2 rounded-lg transition-all duration-200 font-semibold text-[15px] flex items-center space-x-1 hover:bg-orange-50">
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu (scrollable) */}
                <div className="absolute left-0 mt-3 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
                  <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#F3782D] to-[#e86820] px-6 py-4">
                      <h3 className="text-white font-bold text-lg">Our Services</h3>
                      <p className="text-orange-100 text-sm">Expert solutions for your property</p>
                    </div>

                    {/* Service list area made scrollable */}
                    <div className="p-3 max-h-[320px] overflow-y-auto">
                      {services.map((service, index) => {
                        return (
                          <Link
                            key={index}
                            href={service.href}
                            className="flex items-start space-x-4 px-4 py-3 hover:bg-orange-50 rounded-xl transition-all duration-200 group/item"
                          >
                            <div className="flex-1 pt-0.5">
                              <div className="text-[#4E4D4F] font-bold text-base group-hover/item:text-[#F3782D] transition-colors">
                                {service.name}
                              </div>
                              <div className="text-gray-600 text-sm mt-1 leading-relaxed">{service.description}</div>
                            </div>
                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover/item:text-[#F3782D] -rotate-90 transition-all mt-3" />
                          </Link>
                        );
                      })}
                    </div>

                    {/* footer removed as requested */}
                  </div>
                </div>
              </div>

              {/* Projects now smooth-scroll to #projects when on home */}
              <NavLink href="/#projects" icon={FolderOpen} text="Our Projects" onClick={handleProjectsClick} />
              <NavLink href="/contact" icon={MessageSquare} text="Contact" />

              <Link
                href="/#quotes"
                className="bg-gradient-to-r from-[#F3782D] to-[#e86820] text-white px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 font-bold text-[15px] ml-4 hover:scale-105 transform border-2 border-[#F3782D] flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Get Free Quote</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-[#4E4D4F] hover:text-[#F3782D] p-2 rounded-lg hover:bg-orange-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden pb-6 space-y-2 border-t border-gray-200 pt-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Mobile Contact Info */}
              <div className="bg-gradient-to-r from-[#4E4D4F] to-[#5E5D5F] rounded-xl p-4 mb-4">
                <a href="tel:+447340170864" className="flex items-center space-x-3 text-white mb-3">
                  <Phone className="w-5 h-5 text-[#F3782D]" />
                  <span className="font-semibold">07340170864</span>
                </a>
                <a href="mailto:info@tbkconstruction.co.uk" className="flex items-center space-x-3 text-white">
                  <Mail className="w-5 h-5 text-[#F3782D]" />
                  <span className="text-sm">info@tbkconstruction.co.uk</span>
                </a>
              </div>

              <Link
                href="/"
                className=" text-[#4E4D4F] hover:text-[#F3782D] hover:bg-orange-50 px-4 py-3 rounded-lg transition-all duration-200 font-semibold flex items-center space-x-3"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>

              <Link
                href="/#about"
                className=" text-[#4E4D4F] hover:text-[#F3782D] hover:bg-orange-50 px-4 py-3 rounded-lg transition-all duration-200 font-semibold flex items-center space-x-3"
                onClick={(e) => {
                  // smooth scroll when already on home; otherwise navigate to "/#about"
                  handleAboutClick(e as unknown as React.MouseEvent);
                }}
              >
                <Info className="w-5 h-5" />
                <span>About Us</span>
              </Link>

              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full text-left text-[#4E4D4F] hover:text-[#F3782D] hover:bg-orange-50 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between font-semibold"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div className="mt-2 space-y-2 bg-gradient-to-br from-orange-50 to-orange-50/30 rounded-xl p-3 max-h-[40vh] overflow-y-auto">
                    {services.map((service, index) => {
                      return (
                        <Link
                          key={index}
                          href={service.href}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-[#F3782D]/20"
                          onClick={() => {
                            setIsOpen(false);
                            setServicesOpen(false);
                          }}
                        >
                          <div className="flex-1">
                            <div className="text-[#4E4D4F] font-bold text-sm">{service.name}</div>
                            <div className="text-gray-600 text-xs mt-0.5">{service.description}</div>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                        </Link>
                      );
                    })}
                    {/* "View All Services" removed as requested */}
                  </div>
                )}
              </div>

              <Link
                href="/#projects"
                className=" text-[#4E4D4F] hover:text-[#F3782D] hover:bg-orange-50 px-4 py-3 rounded-lg transition-all duration-200 font-semibold flex items-center space-x-3"
                onClick={(e) => {
                  // smooth scroll when on home; otherwise navigate to "/#projects"
                  handleProjectsClick(e as unknown as React.MouseEvent);
                }}
              >
                <FolderOpen className="w-5 h-5" />
                <span>Our Projects</span>
              </Link>

              <Link
                href="/contact"
                className=" text-[#4E4D4F] hover:text-[#F3782D] hover:bg-orange-50 px-4 py-3 rounded-lg transition-all duration-200 font-semibold flex items-center space-x-3"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Contact</span>
              </Link>

              <Link
                href="/#quotes"
                className=" bg-gradient-to-r from-[#F3782D] to-[#e86820] text-white px-4 py-4 rounded-xl text-center font-bold hover:shadow-lg transition-all duration-200 mt-4 flex items-center justify-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="w-5 h-5" />
                <span>Get Free Quote</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

/* Helper NavLink component with optional onClick */
function NavLink({
  href,
  icon: Icon,
  text,
  onClick,
}: {
  href: string;
  icon: LucideIcon;
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-[#4E4D4F] hover:text-[#F3782D] px-5 py-2 rounded-lg transition-all duration-200 font-semibold text-[15px] hover:bg-orange-50 relative group flex items-center space-x-2"
    >
      <Icon className="w-4 h-4" />
      <span>{text}</span>
      <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#F3782D] transition-all duration-300 group-hover:w-[calc(100%-2.5rem)] transform -translate-x-1/2"></span>
    </Link>
  );
}