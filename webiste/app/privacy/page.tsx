'use client';

import React, { JSX } from 'react';


export default function PrivacyPage(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">
            <strong>Effective Date:</strong> January 1, {year}
          </p>

          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you request a quote, contact us, or use our services. This may include your name, email address, phone number, and project details.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
          </p>

          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at info@tbkconstruction.co.uk.
          </p>
        </div>
      </main>
    </div>
  );
}