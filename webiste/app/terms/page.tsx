'use client';

import React, { JSX } from 'react';

export default function TermsPage(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="max-w-4xl mx-auto px-4 py-16 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">
            <strong>Effective Date:</strong> January 1, {year}
          </p>

          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By using our services, you agree to these Terms of Service. If you do not agree, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
          <p className="mb-4">
            We provide construction and maintenance services as described on our website. Services are subject to availability and our standard terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="mb-4">
            You agree to provide accurate information and cooperate with our team to ensure safe and efficient service delivery.
          </p>

          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p className="mb-4">
            Our liability is limited to the extent permitted by law. We are not liable for indirect or consequential damages.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
          <p className="mb-4">
            These terms are governed by the laws of England and Wales. Any disputes will be resolved in the courts of England and Wales.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at info@tbkconstruction.co.uk.
          </p>
        </div>
      </main>
    </div>
  );
}