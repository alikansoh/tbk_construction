'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Globe, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

/**
 * LocationCoverage
 * 
 * Enhanced component showcasing comprehensive service coverage across London.
 * Features:
 * - Complete list of all London boroughs served
 * - Interactive map visualization
 * - SEO-optimized content with structured data
 * - Response time information
 * - Service area filtering
 */

/* --- Types --- */
interface Borough {
  name: string;
  areas: string[];
  postcodePrefixes: string[];
}

interface ServiceArea {
  region: string;
  boroughs: Borough[];
}

interface SearchResult extends Borough {
  region: string;
}

const serviceAreas: ServiceArea[] = [
  {
    region: 'Central London',
    boroughs: [
      {
        name: 'Westminster',
        areas: ['Soho', 'Covent Garden', 'Mayfair', 'Pimlico', 'Victoria', 'Marylebone'],
        postcodePrefixes: ['W1', 'SW1', 'WC2']
      },
      {
        name: 'Camden',
        areas: ['Kings Cross', 'Bloomsbury', 'Holborn', 'Kentish Town', 'Hampstead', 'Swiss Cottage'],
        postcodePrefixes: ['WC1', 'NW1', 'NW3', 'NW5']
      },
      {
        name: 'City of London',
        areas: ['Barbican', 'Bank', 'Liverpool Street', 'Moorgate'],
        postcodePrefixes: ['EC1', 'EC2', 'EC3', 'EC4']
      },
      {
        name: 'Islington',
        areas: ['Angel', 'Highbury', 'Finsbury Park', 'Archway', 'Holloway'],
        postcodePrefixes: ['N1', 'N4', 'N5', 'N7', 'N19']
      }
    ]
  },
  {
    region: 'West London',
    boroughs: [
      {
        name: 'Hammersmith & Fulham',
        areas: ['Hammersmith', 'Fulham', 'Shepherds Bush', 'White City', 'Parsons Green'],
        postcodePrefixes: ['W6', 'W12', 'SW6']
      },
      {
        name: 'Kensington & Chelsea',
        areas: ['Kensington', 'Chelsea', 'Notting Hill', 'South Kensington', 'Earls Court'],
        postcodePrefixes: ['W8', 'W10', 'W11', 'SW3', 'SW5', 'SW7', 'SW10']
      },
      {
        name: 'Ealing',
        areas: ['Ealing', 'Acton', 'Chiswick', 'Hanwell', 'Northolt', 'Greenford'],
        postcodePrefixes: ['W3', 'W4', 'W5', 'W7', 'W13']
      },
      {
        name: 'Hounslow',
        areas: ['Brentford', 'Chiswick', 'Hounslow', 'Isleworth', 'Feltham'],
        postcodePrefixes: ['TW3', 'TW4', 'TW5', 'TW7', 'TW8']
      }
    ]
  },
  {
    region: 'South West London',
    boroughs: [
      {
        name: 'Richmond upon Thames',
        areas: ['Richmond', 'Twickenham', 'Teddington', 'Hampton', 'Kew', 'Barnes'],
        postcodePrefixes: ['TW1', 'TW2', 'TW9', 'TW10', 'TW11', 'TW12']
      },
      {
        name: 'Wandsworth',
        areas: ['Wandsworth', 'Putney', 'Battersea', 'Clapham', 'Tooting', 'Balham'],
        postcodePrefixes: ['SW11', 'SW12', 'SW15', 'SW17', 'SW18']
      },
      {
        name: 'Merton',
        areas: ['Wimbledon', 'Morden', 'Mitcham', 'Colliers Wood', 'Raynes Park'],
        postcodePrefixes: ['SW19', 'SW20', 'CR4']
      },
      {
        name: 'Kingston upon Thames',
        areas: ['Kingston', 'Surbiton', 'New Malden', 'Tolworth', 'Chessington'],
        postcodePrefixes: ['KT1', 'KT2', 'KT3', 'KT4', 'KT5', 'KT6', 'KT9']
      }
    ]
  },
  {
    region: 'South London',
    boroughs: [
      {
        name: 'Lambeth',
        areas: ['Brixton', 'Clapham', 'Streatham', 'Kennington', 'Vauxhall', 'Waterloo'],
        postcodePrefixes: ['SW2', 'SW4', 'SW8', 'SW9', 'SW16', 'SE1', 'SE11', 'SE24']
      },
      {
        name: 'Southwark',
        areas: ['Borough', 'Bermondsey', 'Dulwich', 'Peckham', 'Camberwell'],
        postcodePrefixes: ['SE1', 'SE5', 'SE15', 'SE16', 'SE21', 'SE22']
      },
      {
        name: 'Lewisham',
        areas: ['Lewisham', 'Blackheath', 'Catford', 'Deptford', 'Forest Hill'],
        postcodePrefixes: ['SE4', 'SE6', 'SE8', 'SE13', 'SE14', 'SE23']
      }
    ]
  },
  {
    region: 'North London',
    boroughs: [
      {
        name: 'Barnet',
        areas: ['Finchley', 'Golders Green', 'Hendon', 'Mill Hill', 'Barnet', 'Edgware'],
        postcodePrefixes: ['N2', 'N3', 'N11', 'N12', 'N20', 'NW4', 'NW7', 'NW9', 'NW11']
      },
      {
        name: 'Haringey',
        areas: ['Tottenham', 'Crouch End', 'Muswell Hill', 'Wood Green', 'Highgate'],
        postcodePrefixes: ['N4', 'N6', 'N8', 'N10', 'N15', 'N17', 'N22']
      },
      {
        name: 'Enfield',
        areas: ['Enfield', 'Edmonton', 'Winchmore Hill', 'Southgate', 'Palmers Green'],
        postcodePrefixes: ['N9', 'N13', 'N14', 'N18', 'N21', 'EN1', 'EN2', 'EN3']
      }
    ]
  },
  {
    region: 'East London',
    boroughs: [
      {
        name: 'Tower Hamlets',
        areas: ['Canary Wharf', 'Bethnal Green', 'Bow', 'Whitechapel', 'Stepney', 'Poplar'],
        postcodePrefixes: ['E1', 'E2', 'E3', 'E14']
      },
      {
        name: 'Hackney',
        areas: ['Hackney', 'Shoreditch', 'Dalston', 'Stoke Newington', 'Clapton'],
        postcodePrefixes: ['E5', 'E8', 'E9', 'N16']
      },
      {
        name: 'Newham',
        areas: ['Stratford', 'West Ham', 'East Ham', 'Forest Gate', 'Canning Town'],
        postcodePrefixes: ['E6', 'E7', 'E12', 'E13', 'E15', 'E16']
      },
      {
        name: 'Redbridge',
        areas: ['Ilford', 'Woodford', 'Wanstead', 'Gants Hill', 'Redbridge'],
        postcodePrefixes: ['E11', 'E18', 'IG1', 'IG2', 'IG3', 'IG4', 'IG5', 'IG6']
      }
    ]
  }
];

const emergencyResponseTimes = [
  { area: 'Central London', time: '30-60 minutes', icon: '🏛️' },
  { area: 'West London', time: '30-60 minutes', icon: '🏡' },
  { area: 'South West London', time: '45-90 minutes', icon: '🌳' },
  { area: 'North London', time: '60-90 minutes', icon: '🏘️' },
  { area: 'East London', time: '60-90 minutes', icon: '🏗️' },
  { area: 'South London', time: '45-90 minutes', icon: '🌆' }
];

export default function LocationCoverage({ className = '' }: { className?: string }) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreas = serviceAreas.filter(area => 
    selectedRegion === 'all' || area.region === selectedRegion
  );

  const searchResults: SearchResult[] = searchQuery.length > 0
    ? serviceAreas.flatMap(region =>
        region.boroughs
          .filter(borough =>
            borough.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            borough.areas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase())) ||
            borough.postcodePrefixes.some(pc => pc.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(borough => ({ ...borough, region: region.region } as SearchResult))
      )
    : [];

  return (
    <section className={`relative py-16 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden ${className}`} id='location'>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-10 w-[28rem] h-[28rem] bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-24 right-10 w-[28rem] h-[28rem] bg-red-500/15 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'3.5\\' numOctaves=\\'4\\' /%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\' /%3E%3C/svg%3E')",
        }}
      />

      {/* SEO-optimized structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'TBK Construction Services',
            provider: {
              '@type': 'LocalBusiness',
              name: 'TBK Construction',
              telephone: '07340 170864',
              email: 'info@tbkconstruction.co.uk'
            },
            areaServed: serviceAreas.flatMap(region =>
              region.boroughs.map(borough => ({
                '@type': 'City',
                name: borough.name,
                containedInPlace: {
                  '@type': 'City',
                  name: 'London'
                }
              }))
            ),
            serviceType: 'Construction, Maintenance, Emergency Repairs'
          })
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/15 to-red-500/15 backdrop-blur-md border border-orange-400/30 text-orange-200 px-5 py-2.5 rounded-full mb-6 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold">SERVING ALL OF LONDON</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Comprehensive Coverage Across 
            <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-red-400 bg-clip-text text-transparent mt-2">
              Greater London
            </span>
          </h2>
          <p className="text-lg text-slate-200/90 max-w-3xl mx-auto">
            Professional construction, maintenance and emergency repair services available in over 30 London boroughs. 
            Fast response times and local expertise wherever you are.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="area-search" className="block text-sm font-medium text-slate-200 mb-2">
                Find your area
              </label>
              <input
                id="area-search"
                type="text"
                placeholder="Search by borough, area, or postcode (e.g., Richmond, SW1, Fulham)..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:w-64">
              <label htmlFor="region-filter" className="block text-sm font-medium text-slate-200 mb-2">
                Filter by region
              </label>
              <select
                id="region-filter"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                {serviceAreas.map(area => (
                  <option key={area.region} value={area.region}>{area.region}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Results */}
          {searchQuery.length > 0 && (
            <div className="mt-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              {searchResults.length > 0 ? (
                <div>
                  <p className="text-sm font-semibold text-slate-200 mb-3">
                    Found {searchResults.length} matching {searchResults.length === 1 ? 'area' : 'areas'}:
                  </p>
                  <div className="grid gap-3">
                    {searchResults.map((borough, idx) => (
                      <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-white">{borough.name}</h4>
                            <p className="text-sm text-slate-300">{borough.region}</p>
                            <p className="text-sm text-slate-400 mt-1">
                              Postcodes: {borough.postcodePrefixes.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-slate-300">
                  No exact match found, but we may still serve your area. Please contact us to confirm availability.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Service Areas Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Areas List */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-orange-400" />
              Service Areas
            </h3>
            <div className="space-y-6">
              {filteredAreas.map((area, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-orange-400/40 transition-all duration-500 shadow-lg hover:shadow-[0_20px_60px_rgba(249,115,22,0.25)]">
                  <h4 className="text-xl font-bold text-white mb-4 pb-2 border-b border-slate-700">
                    {area.region}
                  </h4>
                  <div className="space-y-4">
                    {area.boroughs.map((borough, bIdx) => (
                      <div key={bIdx}>
                        <h5 className="font-semibold text-orange-300 mb-2">{borough.name}</h5>
                        <p className="text-sm text-slate-300 mb-2">
                          {borough.areas.join(' • ')}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {borough.postcodePrefixes.map((postcode, pIdx) => (
                            <span
                              key={pIdx}
                              className="inline-block bg-orange-500/20 border border-orange-500/30 text-orange-200 text-xs px-2 py-1 rounded"
                            >
                              {postcode}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map and Response Times */}
          <div className="space-y-6">
            {/* Coverage Map */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Coverage Map</h3>
              <div className="relative w-full h-96 rounded-lg overflow-hidden border border-white/10">
                <Image 
                  src="/london.avif" 
                  alt="London service coverage map" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 z-10" />
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                We serve all major areas across Greater London
              </p>
            </div>

            {/* Response Times */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                Emergency Response Times
              </h3>
              <div className="space-y-3">
                {emergencyResponseTimes.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium text-slate-200">{item.area}</span>
                    </div>
                    <span className="text-sm font-semibold text-orange-400">{item.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">
                * Response times are approximate and may vary based on traffic and job urgency
              </p>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-xl shadow-[0_0_25px_rgba(249,115,22,0.4)] p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Not Sure If We Cover Your Area?</h3>
              <p className="mb-4 text-orange-50">
                Contact us to confirm availability and get a free quote for your project.
              </p>

              <div className="space-y-2">
                <a
                  href="tel:07340170864"
                  className="flex items-center gap-2 text-white hover:text-orange-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">07340 170864</span>
                </a>

                <a
                  href="mailto:info@tbkconstruction.co.uk"
                  className="flex items-center gap-2 text-white hover:text-orange-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@tbkconstruction.co.uk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional SEO Content */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Professional Construction Services Throughout London
          </h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed">
              TBK Construction provides comprehensive building, renovation, and emergency repair services across Greater London. 
              With local teams strategically positioned throughout the capital, we ensure rapid response times and personalized 
              service whether you&apos;re in Central London, the leafy suburbs of Richmond, or anywhere in between.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Our services include new builds, extensions, loft conversions, kitchen and bathroom installations, general maintenance, 
              emergency plumbing and electrical repairs, roofing, plastering, and much more. We work with residential homeowners, 
              landlords, property managers, and commercial clients across all London boroughs.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              <strong className="text-orange-300">Service coverage includes but is not limited to:</strong> Westminster, Camden, Kensington & Chelsea, 
              Hammersmith & Fulham, Richmond upon Thames, Wandsworth, Lambeth, Southwark, Tower Hamlets, Hackney, Islington, 
              Barnet, Ealing, Hounslow, Kingston, Merton, Lewisham, Newham, Redbridge, Haringey, Enfield, and surrounding areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}