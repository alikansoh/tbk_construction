'use client';

import React, { useState, useMemo, useCallback, useEffect, JSX } from 'react';
import { sendEmailBrevoClient } from '../lib/sendEmailBrevoClient';
import { sendConfirmationClient } from '../lib/sendConfirmationClient';

const SERVICES = [
  { name: 'Home Maintenance', icon: '🏠', emergency: false },
  { name: 'Kitchen Remodeling', icon: '🔨', emergency: false },
  { name: 'Flooring', icon: '📐', emergency: false },
  { name: 'Electrical Work', icon: '⚡', emergency: true },
  { name: 'Plumbing', icon: '🔧', emergency: true },
  { name: 'Emergency Repair', icon: '🚨', emergency: true },
];

type FormFieldsProps = {
  isMobile?: boolean;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  service: string;
  isEmergency: boolean;
  loading: boolean;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setMobile: (v: string) => void;
  setPostcode: (v: string) => void;
  setService: (v: string) => void;
  setIsEmergency: (v: boolean) => void;
  handleSubmit: () => void;
};

const FormFields = React.memo<FormFieldsProps>(({
  isMobile = false,
  name,
  email,
  mobile,
  postcode,
  service,
  isEmergency,
  loading,
  setName,
  setEmail,
  setMobile,
  setPostcode,
  setService,
  setIsEmergency,
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
      <div className={isMobile ? 'mb-2' : 'lg:col-span-6 mb-2'}>
        <button
          type="button"
          onClick={() => setIsEmergency(!isEmergency)}
          className={`w-full py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            isEmergency
              ? isMobile
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-red-500/90 backdrop-blur-md text-white shadow-[0_0_30px_rgba(239,68,68,0.6)]'
              : isMobile
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              : 'bg-white/5 backdrop-blur-md text-white/70 hover:bg-white/10 border border-white/20'
          }`}
        >
          <span className="text-xl">{isEmergency ? '🚨' : '⏰'}</span>
          <span>{isEmergency ? 'EMERGENCY REQUEST - Priority Response!' : 'Mark as Emergency (response directly)'}</span>
        </button>
      </div>

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
          placeholder="Email"
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
          onChange={(e) => {
            setService(e.target.value);
            const selectedService = SERVICES.find(s => s.name === e.target.value);
            if (selectedService?.emergency && !isEmergency) setIsEmergency(true);
          }}
          disabled={loading}
          className={
            isMobile
              ? "w-full rounded-xl py-3 px-4 bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all appearance-none"
              : "w-full rounded-xl py-3 px-4 bg-white/10 backdrop-blur-md border border-white/30 text-white focus:bg-white/15 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all appearance-none shadow-lg hover:bg-white/12"
          }
          style={{ color: service ? (isMobile ? '#0f172a' : 'white') : (isMobile ? '#94a3b8' : 'rgba(255,255,255,0.7)') }}
        >
          <option value="" disabled>Select Service*</option>
          {SERVICES.map((s) => (
            <option key={s.name} value={s.name} className={isMobile ? 'text-slate-900' : 'bg-slate-800 text-white'}>
              {s.icon} {s.name} {s.emergency ? '⚡ FAST' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className={isMobile ? '' : 'lg:col-span-1'}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full font-bold py-3 px-6 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg ${
            isEmergency
              ? 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white'
              : 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white'
          }`}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
              </svg>
              {isEmergency ? 'Sending Emergency Request...' : 'Sending...'}
            </>
          ) : (
            <>
              <span>{isEmergency ? '🚨 URGENT REQUEST' : (isMobile ? 'Get Free Quote' : 'Get Quote')}</span>
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

const StatusMessage = React.memo<{ status: 'success' | 'error'; errorMsg: string; isMobile: boolean; isEmergency: boolean }>(
  ({ status, errorMsg, isMobile, isEmergency }) => {
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
            <span>
              {isEmergency
                ? '🚨 Emergency request received! We will reply to you as soon as possible.'
                : 'Thanks! We will reply to you as soon as possible.'
              }
            </span>
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

export default function HeroInquiry(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener('open-quote-modal', handleOpenModal as EventListener);
    return () => window.removeEventListener('open-quote-modal', handleOpenModal as EventListener);
  }, []);

  // log phone call attempt (non-blocking): uses navigator.sendBeacon if available, falls back to fetch
  const logPhoneCall = useCallback((source = 'mobile-modal') => {
    const payload = {
      event: 'phone_call_initiated',
      phone: '07340170864',
      source,
      timestamp: new Date().toISOString(),
    };

    try {
      const url = '/api/log-call'; // optional server route; safe to 404 if not present
      const body = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      } else {
        void fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }).catch(() => {});
      }
    } catch {
      // ignore logging errors; console for local debug
      // eslint-disable-next-line no-console
      console.log('Phone call logged', payload);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
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

    try {
      const payload = {
        name: trimmedName,
        email: trimmedEmail || undefined,
        phone: trimmedMobile || undefined,
        postcode: trimmedPostcode,
        service,
        message: isEmergency ? 'EMERGENCY - urgent assistance requested' : 'Website inquiry',
        isEmergency,
      };

      const res = await sendEmailBrevoClient(payload);

      if (res.status === 'ok') {
        // send confirmation to customer if provided (fire-and-forget)
        if (trimmedEmail) {
          void sendConfirmationClient({
            email: trimmedEmail,
            name: trimmedName,
            service,
            postcode: trimmedPostcode,
            isEmergency,
          }).catch(() => {});
        }

        // show "received" state inside modal (do NOT automatically close it)
        setStatus('success');
        // clear inputs but keep modal open to show confirmation
        setName('');
        setEmail('');
        setMobile('');
        setPostcode('');
        setService('');
        setIsEmergency(false);
      } else {
        setStatus('error');
        setErrorMsg(res.error || 'Failed to send. Please try again later.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [name, email, mobile, postcode, service, isEmergency]);

  const scrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const badges = useMemo(() => ['Licensed & Insured', '500+ Happy Clients', 'Same-Day Response'], []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <link rel="preload" as="image" href="/hero.webp" type="image/webp" />
      <link rel="preload" as="video" href="/hero1.mp4" type="video/mp4" />

      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero.webp"
        preload="metadata"
      >
        <source src="/hero1.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow will-change-transform" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower will-change-transform" />
      <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")' }} />

      <div id="quotes" className="relative z-10 w-full flex flex-col items-center pt-24 md:pt-40 px-4 pb-36">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8">
            <span className="relative flex h-2.5 w-2.5 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-orange-400 to-orange-500"></span>
            </span>
            <span>Available 24/7 • Fast Response</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            <span className="inline-block">Reliable</span>
            <br />
            <span className="inline-block">Maintenance Services</span>
            <span className="block mt-3 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(249,115,22,0.5)]">
              When You Need Us
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Get your <span className="text-orange-300 font-semibold">free quote instantly</span>. Expert service guaranteed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300">
            {badges.map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 group hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-600/30 flex items-center justify-center border border-green-400/30">
                  <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-full max-w-7xl">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            <FormFields
              isMobile={false}
              name={name}
              email={email}
              mobile={mobile}
              postcode={postcode}
              service={service}
              isEmergency={isEmergency}
              loading={loading}
              setName={setName}
              setEmail={setEmail}
              setMobile={setMobile}
              setPostcode={setPostcode}
              setService={setService}
              setIsEmergency={setIsEmergency}
              handleSubmit={handleSubmit}
            />

            {status !== 'idle' && (
              <StatusMessage status={status} errorMsg={errorMsg} isMobile={false} isEmergency={isEmergency} />
            )}
          </div>
        </div>

        <div className="md:hidden flex justify-center mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_20px_60px_rgba(249,115,22,0.6)] hover:shadow-[0_25px_80px_rgba(249,115,22,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <span>Get Free Quote</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-6 animate-slideUp">
            <button
              onClick={() => { setShowModal(false); setStatus('idle'); setErrorMsg(''); }}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Get Your Free Quote</h2>

              <div className="flex items-center gap-3 mt-2 mb-2">
                <a
                  href="tel:07340170864"
                  onClick={() => logPhoneCall('mobile-modal')}
                  className="inline-flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg shadow-sm hover:bg-orange-100 text-orange-600 font-semibold"
                >
                  <span className="text-lg">📞</span>
                  <span>Call: 07340 170864</span>
                </a>
                <span className="text-sm text-slate-500">or use the form below</span>
              </div>

              <p className="text-sm text-slate-600">We will reply to you as soon as possible.</p>
            </div>

            {/* If status === 'success' show a received confirmation in the modal */}
            {status === 'success' ? (
              <div className="w-full text-center py-8">
                <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">We&apos;ve received your enquiry</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Thank you — we will reply to you as soon as possible{isEmergency ? ' and prioritise this emergency request.' : '.'}
                </p>

                <div className="flex justify-center gap-3">
                  <a
                    href="tel:07340170864"
                    onClick={() => logPhoneCall('received-confirmation')}
                    className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg shadow-sm hover:bg-orange-100 text-orange-600 font-semibold"
                  >
                    📞 Call Now
                  </a>
                  <button
                    onClick={() => { setShowModal(false); setStatus('idle'); }}
                    className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-200 text-slate-800 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <FormFields
                  isMobile={true}
                  name={name}
                  email={email}
                  mobile={mobile}
                  postcode={postcode}
                  service={service}
                  isEmergency={isEmergency}
                  loading={loading}
                  setName={setName}
                  setEmail={setEmail}
                  setMobile={setMobile}
                  setPostcode={setPostcode}
                  setService={setService}
                  setIsEmergency={setIsEmergency}
                  handleSubmit={handleSubmit}
                />

                {status !== 'idle' && (
                  <StatusMessage status={status} errorMsg={errorMsg} isMobile={true} isEmergency={isEmergency} />
                )}
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px);} to { opacity:1; transform: translateY(0);} }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px);} to { opacity:1; transform: translateY(0);} }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.35s ease-out; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4,0,0.6,1) infinite; }
        .animate-pulse-slower { animation: pulse 6s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
      `}</style>
    </div>
  );
}