'use client';

import React, { JSX } from 'react';

export default function CookiesPage(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">
            <strong>Effective Date:</strong> January 1, {year}
          </p>

          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are stored on your device when you visit our website. They help us provide a better user experience.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p className="mb-4">
            We use cookies to remember your preferences, analyze website traffic, and improve our services. We do not use cookies to collect personal information without your consent.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          <ul className="mb-4 list-disc pl-6">
            <li>Essential cookies: Required for the website to function properly.</li>
            <li>Analytics cookies: Help us understand how you use our website.</li>
            <li>Preference cookies: Remember your settings and preferences.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
          <p className="mb-4">
            You can control and manage cookies through your browser settings. You can delete cookies or disable them entirely, but this may affect your experience on our website.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our use of cookies, please contact us at info@tbkconstruction.co.uk.
          </p>
        </div>
      </main>
    </div>
  );
}