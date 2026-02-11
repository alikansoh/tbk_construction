'use client';

import React, { useState, useMemo, useCallback, useEffect, JSX } from 'react';
import { sendEmailBrevoClient } from '../lib/sendEmailBrevoClient';
import { sendConfirmationClient } from '../lib/sendConfirmationClient';

const SERVICES = [
  { name: 'Home Maintenance', icon: '🏠', emergency: false },
  { name: 'Kitchen Remodeling', icon: '🔨', emergency: false },
  { name: 'Flooring Installation', icon: '📐', emergency: false },
  { name: 'Electrical Repairs', icon: '⚡', emergency: true },
  { name: 'Plumbing Services', icon: '🔧', emergency: true },
  { name: 'Emergency Repairs', icon: '🚨', emergency: true },
];

type FormFieldsProps = {
  isMobile?: boolean;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  message: string;
  service: string;
  isEmergency: boolean;
  loading: boolean;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setMobile: (v: string) => void;
  setPostcode: (v: string) => void;
  setMessage: (v: string) => void;
  setService: (v: string) => void;
  setIsEmergency: (v: boolean) => void;
  handleSubmit: () => void;
  onOpenMessageModal: () => void;
};

const FormFields = React.memo<FormFieldsProps>(({
  isMobile = false,
  name,
  email,
  mobile,
  postcode,
  message,
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
  onOpenMessageModal,
}) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  const inputClassName = isMobile
    ? 'w-full rounded-xl py-3 px-4 bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all'
    : 'w-full rounded-xl py-3 px-4 md:py-4 md:px-5 md:rounded-2xl bg-white/8 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:bg-white/12 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all shadow-sm md:shadow-md';

  return (
    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-end'}>
      <div className={isMobile ? 'mb-2' : 'md:col-span-3 lg:col-span-6 mb-2'}>
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
          <span>{isEmergency ? 'EMERGENCY REQUEST - Priority Response' : 'Need Emergency Service? Click Here'}</span>
        </button>
      </div>

      <div className={isMobile ? '' : 'md:col-span-1 lg:col-span-1'}>
        <input
          type="text"
          placeholder="Full Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          aria-label="Full Name"
          required
        />
      </div>

      <div className={isMobile ? '' : 'md:col-span-1 lg:col-span-1'}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          aria-label="Email Address"
        />
      </div>

      <div className={isMobile ? '' : 'md:col-span-1 lg:col-span-1'}>
        <input
          type="tel"
          placeholder="Phone Number*"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          aria-label="Phone Number"
          required
        />
      </div>

      <div className={isMobile ? '' : 'md:col-span-1 lg:col-span-1'}>
        <input
          type="text"
          placeholder="Your Postcode*"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          disabled={loading}
          onKeyDown={handleKeyDown}
          className={inputClassName}
          aria-label="Postcode"
          required
        />
      </div>

      <div className={isMobile ? '' : 'md:col-span-1 lg:col-span-1'}>
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
              : "w-full rounded-xl py-3 px-4 md:py-4 md:px-5 md:rounded-2xl bg-white/8 backdrop-blur-md border border-white/20 text-white focus:bg-white/12 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 focus:outline-none transition-all appearance-none md:shadow-sm"
          }
          style={{ color: service ? (isMobile ? '#0f172a' : 'white') : (isMobile ? '#94a3b8' : 'rgba(255,255,255,0.7)') }}
          aria-label="Select Service Type"
          required
        >
          <option value="" disabled>Select Service Type*</option>
          {SERVICES.map((s) => (
            <option key={s.name} value={s.name} className={isMobile ? 'text-slate-900' : 'bg-slate-800 text-white'}>
              {s.icon} {s.name} {s.emergency ? '⚡' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className={isMobile ? '' : 'md:col-span-1 lg:col-span-1'}>
        <button
          type="button"
          onClick={onOpenMessageModal}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
            message
              ? isMobile
                ? 'bg-orange-50 border-2 border-orange-200 text-orange-700 hover:bg-orange-100'
                : 'bg-orange-500/20 backdrop-blur-md border border-orange-400/40 text-orange-300 hover:bg-orange-500/30'
              : isMobile
              ? 'bg-slate-50 border-2 border-slate-200 text-slate-600 hover:bg-slate-100'
              : 'bg-white/5 backdrop-blur-md border border-white/20 text-white/70 hover:bg-white/10'
          }`}
          aria-label="Add Optional Message"
        >
          <span>💬</span>
          <span className="text-sm">{message ? 'Edit Details' : 'Add Details (Optional)'}</span>
        </button>
      </div>

      <div className={isMobile ? '' : 'md:col-span-3 lg:col-span-6'}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full font-bold py-3 px-6 md:py-4 md:px-6 rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group ${
            isEmergency
              ? 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white hover:shadow-[0_0_50px_rgba(239,68,68,0.8)]'
              : 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]'
          } shadow-lg md:shadow-2xl`}
          aria-label={isEmergency ? 'Submit Emergency Request' : 'Get Free Quote'}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" className="opacity-75" />
              </svg>
              {isEmergency ? 'Submitting Emergency Request...' : 'Submitting...'}
            </>
          ) : (
            <>
              <span className="md:text-lg">{isEmergency ? '🚨 Submit Emergency Request' : 'Get Your Free Quote Now'}</span>
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
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>
              {isEmergency
                ? '🚨 Emergency request received! We\'ll contact you immediately.'
                : '✓ Quote request received! We\'ll respond within 2 hours during business hours.'
              }
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`${baseClass} ${isMobile ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/20 border border-red-400/40 text-red-300'}`}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
  const [message, setMessage] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [tempMessage, setTempMessage] = useState<string>('');

  useEffect(() => {
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener('open-quote-modal', handleOpenModal as EventListener);
    return () => window.removeEventListener('open-quote-modal', handleOpenModal as EventListener);
  }, []);

  const logPhoneCall = useCallback((source = 'mobile-modal') => {
    const payload = {
      event: 'phone_call_initiated',
      phone: '07340170864',
      source,
      timestamp: new Date().toISOString(),
    };

    try {
      const url = '/api/log-call';
      const body = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      } else {
        void fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }).catch(() => {});
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log('Phone call logged', payload);
    }
  }, []);

  const handleOpenMessageModal = useCallback(() => {
    setTempMessage(message);
    setShowMessageModal(true);
  }, [message]);

  const handleSaveMessage = useCallback(() => {
    setMessage(tempMessage);
    setShowMessageModal(false);
  }, [tempMessage]);

  const handleCancelMessage = useCallback(() => {
    setTempMessage(message);
    setShowMessageModal(false);
  }, [message]);

  const handleSubmit = useCallback(async () => {
    const trimmedName = name.trim();
    const trimmedPostcode = postcode.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedPostcode || !service) {
      setErrorMsg('Please provide your name, postcode, and select a service type.');
      setStatus('error');
      return;
    }

    if (!trimmedEmail && !trimmedMobile) {
      setErrorMsg('Please provide either an email address or phone number so we can contact you.');
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
        message: trimmedMessage || (isEmergency ? 'EMERGENCY SERVICE - Urgent assistance required' : 'Quote request via website'),
        isEmergency,
      };

      const res = await sendEmailBrevoClient(payload);

      if (res.status === 'ok') {
        if (trimmedEmail) {
          void sendConfirmationClient({
            email: trimmedEmail,
            name: trimmedName,
            service,
            postcode: trimmedPostcode,
            isEmergency,
          }).catch(() => {});
        }

        setStatus('success');
        setName('');
        setEmail('');
        setMobile('');
        setPostcode('');
        setMessage('');
        setService('');
        setIsEmergency(false);
      } else {
        setStatus('error');
        setErrorMsg(res.error || 'Unable to submit your request. Please try again or call us directly.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [name, email, mobile, postcode, message, service, isEmergency]);

  const scrollDown = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const badges = useMemo(() => [
    'Fully Licensed & Insured',
    'Satisfied Customers',
    'Same-Day Service Available'
  ], []);

  const maxMessage = 800;

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
        aria-hidden="true"
      >
        <source src="/hero1.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow will-change-transform" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl animate-pulse-slower will-change-transform" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'2.5\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")' }}
           aria-hidden="true" />

      <div id="quotes" className="relative z-10 w-full flex flex-col items-center pt-24 md:pt-40 px-4 pb-36">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_30px_rgba(249,115,22,0.3)] mb-8">
            <span className="relative flex h-2.5 w-2.5 mr-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-orange-400 to-orange-500"></span>
            </span>
            <span>Available Daily • Fast Professional Service</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            <span className="inline-block">Professional Home</span>
            <br />
            <span className="inline-block">Maintenance & Repair Services</span>
            <span className="block mt-3 bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(249,115,22,0.5)]">
              Trusted Local Experts
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            Request your <span className="text-orange-300 font-semibold">free, no-obligation quote</span> today. Expert plumbing, electrical, flooring, kitchen remodeling, and emergency repair services.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300">
            {badges.map((text, i) => (
              <div key={i} className="flex items-center gap-2.5 group hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-600/30 flex items-center justify-center border border-green-400/30" aria-hidden="true">
                  <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-full max-w-4xl lg:max-w-7xl">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)] md:shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
            <FormFields
              isMobile={false}
              name={name}
              email={email}
              mobile={mobile}
              postcode={postcode}
              message={message}
              service={service}
              isEmergency={isEmergency}
              loading={loading}
              setName={setName}
              setEmail={setEmail}
              setMobile={setMobile}
              setPostcode={setPostcode}
              setMessage={setMessage}
              setService={setService}
              setIsEmergency={setIsEmergency}
              handleSubmit={handleSubmit}
              onOpenMessageModal={handleOpenMessageModal}
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
            aria-label="Open quote request form"
          >
            <span>Request Free Quote</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] px-4 animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="message-modal-title">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg relative p-6 animate-slideUp">
            <button
              onClick={handleCancelMessage}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
              aria-label="Close message dialog"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-4">
              <h3 id="message-modal-title" className="text-2xl font-bold text-slate-900 mb-2">Provide Additional Details</h3>
              <p className="text-sm text-slate-600">Help us understand your needs better (optional)</p>
            </div>

            <textarea
              placeholder="Describe the issue: What needs fixing or installing? Where is it located? Any specific requirements or access instructions?"
              value={tempMessage}
              onChange={(e) => {
                if (e.target.value.length <= maxMessage) setTempMessage(e.target.value);
              }}
              rows={6}
              className="w-full rounded-xl py-3 px-4 bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all resize-none"
              aria-label="Additional service details"
            />
            <div className="mt-2 text-right text-xs text-slate-500" aria-live="polite">
              {tempMessage.length}/{maxMessage} characters
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelMessage}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMessage}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {tempMessage ? 'Save Details' : 'Skip'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-6 animate-slideUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setShowModal(false); setStatus('idle'); setErrorMsg(''); }}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all z-10"
              aria-label="Close quote form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-4">
              <h2 id="quote-modal-title" className="text-2xl font-bold text-slate-900 mb-1">Request Your Free Quote</h2>

              <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 mb-2">
                <a
                  href="tel:07340170864"
                  onClick={() => logPhoneCall('mobile-modal')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-50 px-3 py-2 rounded-lg shadow-sm hover:bg-orange-100 text-orange-600 font-semibold"
                >
                  <span className="text-lg" aria-hidden="true">📞</span>
                  <span>Call: 07340 170864</span>
                </a>
                <span className="text-sm text-slate-500">or complete the form below</span>
              </div>

              <p className="text-sm text-slate-600">We respond within 2 hours during business hours.</p>
            </div>

            {status === 'success' ? (
              <div className="w-full text-center py-8">
                <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-green-50 flex items-center justify-center border border-green-100" aria-hidden="true">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Quote Request Received</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Thank you! We&apos;ve received your request and will {isEmergency ? 'contact you immediately for this emergency service' : 'respond within 2 hours during business hours'}.
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
                  message={message}
                  service={service}
                  isEmergency={isEmergency}
                  loading={loading}
                  setName={setName}
                  setEmail={setEmail}
                  setMobile={setMobile}
                  setPostcode={setPostcode}
                  setMessage={setMessage}
                  setService={setService}
                  setIsEmergency={setIsEmergency}
                  handleSubmit={handleSubmit}
                  onOpenMessageModal={handleOpenMessageModal}
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
        @keyframes fadeIn { from { opacity: 0;} to { opacity:1;} }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.35s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4,0,0.6,1) infinite; }
        .animate-pulse-slower { animation: pulse 6s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
      `}</style>
    </div>
  );
}