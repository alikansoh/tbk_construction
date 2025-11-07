'use client';

import React, { useState, useMemo, useCallback } from 'react';

const SERVICES = [
  { name: 'Home Maintenance', icon: '🏠' },
  { name: 'Kitchen Remodeling', icon: '🔨' },
  { name: 'Flooring', icon: '📐' },
  { name: 'Electrical Work', icon: '⚡' },
  { name: 'Plumbing', icon: '🔧' },
];

type FormFieldsProps = {
  isMobile?: boolean;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  service: string;
  loading: boolean;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setMobile: (v: string) => void;
  setPostcode: (v: string) => void;
  setService: (v: string) => void;
  handleSubmit: () => void;
};

const FormFields = React.memo<FormFieldsProps>(({
  isMobile = false,
  name,
  email,
  mobile,
  postcode,
  service,
  loading,
  setName,
  setEmail,
  setMobile,
  setPostcode,
  setService,
  handleSubmit,
}) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  const inputClassName = isMobile
    ? 'w-full rounded-xl py-3 px-4 bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all'
    : 'w-full rounded-xl py-3 px-4 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder:text-white/70 focus:bg-white/15 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all shadow-lg hover:bg-white/12';

  return (
    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end'}>
      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <input
          type="text"
          placeholder="Your Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
        />
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
        />
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <input
          type="tel"
          placeholder="Phone*"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
        />
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <input
          type="text"
          placeholder="Postcode*"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
        />
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          disabled={loading}
          className={
            isMobile
              ? "w-full rounded-xl py-3 px-4 bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all appearance-none"
              : "w-full rounded-xl py-3 px-4 bg-white/10 backdrop-blur-md border border-white/30 text-white focus:bg-white/15 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all appearance-none shadow-lg hover:bg-white/12"
          }
          style={{ color: service ? (isMobile ? '#0f172a' : 'white') : (isMobile ? '#94a3b8' : 'rgba(255,255,255,0.7)') }}
        >
          <option value="" disabled>
            Select Service*
          </option>
          {SERVICES.map((s) => (
            <option key={s.name} value={s.name} className={isMobile ? 'text-slate-900' : 'bg-slate-800 text-white'}>
              {s.icon} {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <span>{isMobile ? 'Get Free Quote' : 'Get Quote'}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
});

FormFields.displayName = 'FormFields';

const StatusMessage = React.memo<{ status: 'success' | 'error'; errorMsg: string; isMobile: boolean }>(
  ({ status, errorMsg, isMobile }) => {
    const baseClass = isMobile
      ? 'mt-4 text-center font-semibold py-3 px-4 rounded-xl animate-slideDown text-sm'
      : 'mt-4 text-center backdrop-blur-md font-semibold py-3 px-4 rounded-xl shadow-lg animate-slideDown text-sm';

    if (status === 'success') {
      return (
        <div
          className={`${baseClass} ${isMobile ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-green-500/20 border border-green-400/40 text-green-300'}`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Thanks! We&apos;ll be in touch {isMobile ? 'soon' : 'within 24 hours'}.</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${baseClass} ${isMobile ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/20 border border-red-400/40 text-red-300'}`}
        role="status"
        aria-live="assertive"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      </div>
    );
  }
);

StatusMessage.displayName = 'StatusMessage';

export default function HeroInquiry() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [postcode, setPostcode] = useState('');
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = useCallback(() => {
    const trimmedName = name.trim();
    const trimmedPostcode = postcode.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();

    if (!trimmedName || !trimmedPostcode || !service) {
      setErrorMsg('Please enter your name, postcode, and select a service.');
      setStatus('error');
      return;
    }

    if (!trimmedEmail && !trimmedMobile) {
      setErrorMsg('Please provide either an email or phone number so we can contact you.');
      setStatus('error');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setStatus('idle');

    setTimeout(() => {
      setName('');
      setEmail('');
      setMobile('');
      setPostcode('');
      setService('');
      setStatus('success');
      setShowModal(false);
      setLoading(false);
    }, 1500);
  }, [name, email, mobile, postcode, service]);

  const scrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const badges = useMemo(() => ['Licensed & Insured', '500+ Happy Clients', 'Same-Day Response'], []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Preload critical resources */}
      <link rel="preload" as="image" href="/hero-poster.webp" type="image/webp" />
      <link rel="preload" as="video" href="/hero1.mp4" type="video/mp4" />
      
      {/* Optimized video with modern poster format */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.webp"
        preload="metadata"
      >
        <source src="/hero1.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" />
      
      {/* Decorative elements with will-change for better performance */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow will-change-transform" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower will-change-transform" />
      
      {/* Optimized noise texture with reduced opacity */}
      <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")' }} 
      />

      <div id="quotes" className="relative z-10 w-full flex flex-col items-center pt-24 md:pt-40 px-4 pb-36">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300 group cursor-default">
            <span className="relative flex h-2.5 w-2.5 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-orange-400 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
            </span>
            <span className="group-hover:tracking-wide transition-all duration-300">Available 24/7 • Fast Response</span>
          </div>

          {/* Critical content for LCP - optimized with font-display consideration */}
          <h1 className="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            <span className="inline-block animate-fadeInUpDelay1">Professional</span>
            <br />
            <span className="inline-block animate-fadeInUpDelay2">Construction</span>
            <span className="block mt-3 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fadeInUpDelay3 drop-shadow-[0_0_40px_rgba(249,115,22,0.5)]">
              Made Simple
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed font-normal animate-fadeInUpDelay4 mb-8">
            Get your <span className="text-orange-300 font-semibold">free quote instantly</span>. Expert service guaranteed within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300 animate-fadeInUpDelay5">
            {badges.map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 group hover:scale-105 transition-transform duration-300 cursor-default">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-600/30 flex items-center justify-center backdrop-blur-sm border border-green-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300">
                  <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop form */}
        <div className="hidden md:block w-full max-w-7xl animate-fadeInUpDelay6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_100px_rgba(249,115,22,0.2)] transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            
            <div className="relative z-10">
              <FormFields
                isMobile={false}
                name={name}
                email={email}
                mobile={mobile}
                postcode={postcode}
                service={service}
                loading={loading}
                setName={setName}
                setEmail={setEmail}
                setMobile={setMobile}
                setPostcode={setPostcode}
                setService={setService}
                handleSubmit={handleSubmit}
              />
            </div>

            {status !== 'idle' && (
              <StatusMessage status={status} errorMsg={errorMsg} isMobile={false} />
            )}
          </div>
        </div>

        {/* Mobile CTA button */}
        <div className="md:hidden flex justify-center mt-4 animate-fadeInUpDelay6">
          <button
            onClick={() => setShowModal(true)}
            className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_20px_60px_rgba(249,115,22,0.6)] hover:shadow-[0_25px_80px_rgba(249,115,22,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Get Free Quote</span>
            <svg className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button
          onClick={scrollDown}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Mobile modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-6 animate-slideUp">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all hover:rotate-90 duration-300"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Get Your Free Quote</h2>
              <p className="text-sm text-slate-600">We&apos;ll respond within 24 hours</p>
            </div>

            <FormFields
              isMobile={true}
              name={name}
              email={email}
              mobile={mobile}
              postcode={postcode}
              service={service}
              loading={loading}
              setName={setName}
              setEmail={setEmail}
              setMobile={setMobile}
              setPostcode={setPostcode}
              setService={setService}
              handleSubmit={handleSubmit}
            />

            {status !== 'idle' && (
              <StatusMessage status={status} errorMsg={errorMsg} isMobile={true} />
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpDelay1 {
          0%, 10% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpDelay2 {
          0%, 20% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpDelay3 {
          0%, 30% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpDelay4 {
          0%, 40% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpDelay5 {
          0%, 50% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpDelay6 {
          0%, 60% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeInUpDelay1 {
          animation: fadeInUpDelay1 1s ease-out;
        }

        .animate-fadeInUpDelay2 {
          animation: fadeInUpDelay2 1.1s ease-out;
        }

        .animate-fadeInUpDelay3 {
          animation: fadeInUpDelay3 1.2s ease-out;
        }

        .animate-fadeInUpDelay4 {
          animation: fadeInUpDelay4 1.3s ease-out;
        }

        .animate-fadeInUpDelay5 {
          animation: fadeInUpDelay5 1.4s ease-out;
        }

        .animate-fadeInUpDelay6 {
          animation: fadeInUpDelay6 1.5s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-pulse-slower {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}