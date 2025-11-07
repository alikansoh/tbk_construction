'use client';

import React, { useState, useCallback, memo } from 'react';

const SERVICES = [
  { name: 'Home Maintenance', icon: '🏠' },
  { name: 'Kitchen Remodeling', icon: '🔨' },
  { name: 'Flooring', icon: '📐' },
  { name: 'Electrical Work', icon: '⚡' },
  { name: 'Plumbing', icon: '🔧' },
];

// Memoized input component to prevent unnecessary re-renders
interface OptimizedInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isMobile: boolean;
  ariaLabel?: string;
}

const OptimizedInput = memo(({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  disabled, 
  onKeyDown, 
  isMobile,
  ariaLabel 
}: OptimizedInputProps) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    onKeyDown={onKeyDown}
    aria-label={ariaLabel || placeholder}
    className={
      isMobile
        ? 'w-full rounded-xl py-3 px-4 bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all'
        : 'w-full rounded-xl py-3 px-4 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder:text-white/70 focus:bg-white/15 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all shadow-lg hover:bg-white/12'
    }
  />
));
OptimizedInput.displayName = 'OptimizedInput';

// Memoized select component
interface Service {
  name: string;
  icon: string;
}

interface OptimizedSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
  isMobile: boolean;
  options: Service[];
}

const OptimizedSelect = memo(({ 
  value, 
  onChange, 
  disabled, 
  isMobile,
  options 
}: OptimizedSelectProps) => (
  <label className="block">
    <span className="sr-only">Select Service</span>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-label="Select a service"
      className={
        isMobile
          ? "w-full rounded-xl py-3 px-4 bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all appearance-none"
          : "w-full rounded-xl py-3 px-4 bg-white/10 backdrop-blur-md border border-white/30 text-white focus:bg-white/15 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all appearance-none shadow-lg hover:bg-white/12"
      }
      style={{ color: value ? (isMobile ? '#0f172a' : 'white') : (isMobile ? '#94a3b8' : 'rgba(255,255,255,0.7)') }}
    >
      <option value="" disabled>
        Select Service*
      </option>
      {options.map((s: Service) => (
        <option key={s.name} value={s.name} className={isMobile ? 'text-slate-900' : 'bg-slate-800 text-white'}>
          {s.icon} {s.name}
        </option>
      ))}
    </select>
  </label>
));
OptimizedSelect.displayName = 'OptimizedSelect';

// Memoized badge component
const Badge = memo(({ text }: { text: string }) => (
  <div className="flex items-center gap-2.5 group hover:scale-105 transition-transform duration-300 cursor-default">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-600/30 flex items-center justify-center backdrop-blur-sm border border-green-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300">
      <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <span className="font-semibold">{text}</span>
  </div>
));
Badge.displayName = 'Badge';

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

const FormFields = memo<FormFieldsProps>(({
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

  return (
    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end'}>
      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <label className="block">
          <span className="sr-only">Your Name</span>
          <OptimizedInput
            type="text"
            placeholder="Your Name*"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            disabled={loading}
            onKeyDown={handleKeyDown}
            isMobile={isMobile}
            ariaLabel="Your name"
          />
        </label>
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <label className="block">
          <span className="sr-only">Email</span>
          <OptimizedInput
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            disabled={loading}
            onKeyDown={handleKeyDown}
            isMobile={isMobile}
            ariaLabel="Email address"
          />
        </label>
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <label className="block">
          <span className="sr-only">Phone</span>
          <OptimizedInput
            type="tel"
            placeholder="Phone*"
            value={mobile}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)}
            disabled={loading}
            onKeyDown={handleKeyDown}
            isMobile={isMobile}
            ariaLabel="Phone number"
          />
        </label>
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <label className="block">
          <span className="sr-only">Postcode</span>
          <OptimizedInput
            type="text"
            placeholder="Postcode*"
            value={postcode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostcode(e.target.value)}
            disabled={loading}
            onKeyDown={handleKeyDown}
            isMobile={isMobile}
            ariaLabel="Postcode"
          />
        </label>
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <OptimizedSelect
          value={service}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setService(e.target.value)}
          disabled={loading}
          isMobile={isMobile}
          options={SERVICES}
        />
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          aria-label="Get a quote"
          className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <span>{isMobile ? 'Get Free Quote' : 'Get Quote'}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

  const handleScroll = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const closeModal = useCallback(() => setShowModal(false), []);
  const openModal = useCallback(() => setShowModal(true), []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Optimized Video with poster and preload metadata */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
      >
        <source src="https://cdn.coverr.co/videos/coverr-construction-workers-at-a-site-8041/1080p.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower" />
      
      {/* Texture overlay - using CSS instead of inline SVG */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none noise-bg" />

      <main id='quotes' className="relative z-10 w-full flex flex-col items-center pt-24 md:pt-40 px-4 pb-36">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300 group cursor-default">
            <span className="relative flex h-2.5 w-2.5 mr-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-orange-400 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
            </span>
            <span className="group-hover:tracking-wide transition-all duration-300">Available 24/7 • Fast Response</span>
          </div>

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
            {['Licensed & Insured', '500+ Happy Clients', 'Same-Day Response'].map((text) => (
              <Badge key={text} text={text} />
            ))}
          </div>
        </div>

        {/* Desktop Form */}
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

            {status === 'success' && (
              <div className="mt-4 text-center bg-green-500/20 backdrop-blur-md border border-green-400/40 text-green-300 font-semibold py-3 px-4 rounded-xl shadow-lg animate-slideDown text-sm" role="status" aria-live="polite">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Thanks! We&apos;ll be in touch within 24 hours.</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 text-center bg-red-500/20 backdrop-blur-md border border-red-400/40 text-red-300 font-semibold py-3 px-4 rounded-xl shadow-lg animate-slideDown text-sm" role="alert" aria-live="assertive">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile CTA Button */}
        <div className="md:hidden flex justify-center mt-4 animate-fadeInUpDelay6">
          <button
            onClick={openModal}
            aria-label="Open quote form"
            className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_20px_60px_rgba(249,115,22,0.6)] hover:shadow-[0_25px_80px_rgba(249,115,22,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Get Free Quote</span>
            <svg className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button
          onClick={handleScroll}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-6 animate-slideUp">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all hover:rotate-90 duration-300"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-5">
              <h2 id="modal-title" className="text-2xl font-bold text-slate-900 mb-1">Get Your Free Quote</h2>
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

            {status === 'success' && (
              <div className="mt-4 text-center bg-green-50 border border-green-200 text-green-700 font-semibold py-3 px-4 rounded-xl animate-slideDown text-sm" role="status" aria-live="polite">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Thanks! We&apos;ll be in touch soon.</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 text-center bg-red-50 border border-red-200 text-red-700 font-semibold py-3 px-4 rounded-xl animate-slideDown text-sm" role="alert" aria-live="assertive">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E");
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-fadeInUpDelay1 { animation: fadeInUp 0.8s ease-out 0.1s both; }
        .animate-fadeInUpDelay2 { animation: fadeInUp 0.8s ease-out 0.2s both; }
        .animate-fadeInUpDelay3 { animation: fadeInUp 0.8s ease-out 0.3s both; }
        .animate-fadeInUpDelay4 { animation: fadeInUp 0.8s ease-out 0.4s both; }
        .animate-fadeInUpDelay5 { animation: fadeInUp 0.8s ease-out 0.5s both; }
        .animate-fadeInUpDelay6 { animation: fadeInUp 1s ease-out 0.6s both; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
}