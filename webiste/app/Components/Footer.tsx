'use client';

import React, { JSX } from 'react';
import Link from 'next/link';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Links Section */}
        <div className="flex justify-center gap-6 mb-6">
          <Link href="/privacy" className="text-sm hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="text-sm hover:text-white transition-colors">
            Cookie Policy
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-center text-center gap-2 border-t border-slate-800 pt-6">
          <div className="text-sm text-slate-300">
            © {year} TBK Construction. All rights reserved.
          </div>

          <div className="text-xs text-slate-400">
            Designed and Developed by{' '}
            <a
              href="https://viorix.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-100 hover:underline"
            >
              Viorix Digital Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}