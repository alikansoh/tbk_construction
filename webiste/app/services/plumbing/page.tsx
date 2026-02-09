import React from 'react';
import ServiceDetail from '../../Components/ServiceDetail';

export const metadata = {
  title: 'Plumbing Services London | Emergency Plumber & Professional Plumbing Repairs',
  description:
    'Professional plumbing services across London. Experienced plumbers for emergency repairs, installations, bathroom fitting, boiler work, and drainage. Fast, reliable, qualified. 24/7 emergency service. All London boroughs.',
  keywords: [
    'plumber London',
    'plumbing services London',
    'emergency plumber London',
    'plumbing repairs London',
    'bathroom plumber London',
    'boiler installation London',
    'leak repair London',
    'drain unblocking London',
    'heating engineer London',
    'bathroom fitting London',
    'toilet repair London',
    'tap repair London',
    'pipe repair London',
    '24 hour plumber London',
    'gas safe plumber London',
    'central heating London',
    'plumbing installation London',
    'blocked drain London',
    'plumbing contractor London',
    'local plumber London',
  ],
};

export default function Page() {
  return (
    <ServiceDetail
      title="Professional Plumbing Services"
      imageSrc="/plumber.jpg"
      summary="Expert plumbing services across London. From emergency repairs to complete bathroom installations – reliable, qualified plumbers available 24/7."
      description="Our experienced, qualified plumbers provide comprehensive plumbing and heating services throughout London, handling everything from dripping taps to complete bathroom refits. Whether you're dealing with an emergency leak in Clapham, need a boiler service in Islington, want a luxury bathroom installed in Richmond, or require drainage work in Lewisham, our skilled team delivers prompt, professional solutions across all London boroughs. We understand plumbing emergencies can't wait – that's why we offer 24/7 emergency call-out service for urgent issues. For planned work, we provide detailed quotes, expert advice, and quality installations using premium materials and the latest techniques. All our plumbers are fully qualified, Gas Safe registered where required, and committed to delivering exceptional workmanship. We specialize in both residential and commercial plumbing, working in all types of London properties from period conversions to modern developments. With transparent pricing, reliable service, and a customer-first approach, we're London's trusted choice for all plumbing needs."
      features={[
        '24/7 emergency plumbing repairs',
        'Leak detection and repair',
        'Tap and toilet repairs/replacement',
        'Boiler installation and servicing',
        'Central heating installation and repair',
        'Bathroom design and installation',
        'Shower installation and repairs',
        'Kitchen plumbing and appliance fitting',
        'Drain unblocking and cleaning',
        'Pipe repairs and replacement',
        'Water heater installation',
        'Radiator installation and balancing',
        'Overflow and gutter repairs',
        'Outside tap installation',
        'Gas Safe registered services',
        'Landlord plumbing services',
      ]}
      benefits={[
        'Qualified, experienced London plumbers',
        '24/7 emergency call-out service',
        'Gas Safe registered engineers',
        'Transparent, competitive pricing',
        'Same-day service available',
        'Full guarantees on work and parts',
        'Clean, professional service',
        'Free quotes and honest advice',
      ]}
      process={[
        {
          title: 'Contact Us',
          detail: 'Call, email, or book online. For emergencies, we respond immediately. For planned work, we arrange a convenient assessment time.',
        },
        {
          title: 'Assessment & Quote',
          detail: 'We assess the issue or project, discuss options, and provide a clear, detailed quote. For emergencies, we prioritize making things safe.',
        },
        {
          title: 'Expert Work',
          detail: 'Our qualified plumber completes the work efficiently using quality materials, keeping you informed throughout and respecting your London property.',
        },
        {
          title: 'Testing & Cleanup',
          detail: 'We test all work thoroughly, ensure everything functions perfectly, and clean up completely. No mess left behind.',
        },
        {
          title: 'Guarantee & Support',
          detail: 'All work comes with guarantees on workmanship and parts. We provide aftercare advice and are here if you need ongoing support.',
        },
      ]}
      faqs={[
        {
          q: 'Do you offer emergency plumbing services?',
          a: 'Yes, we provide 24/7 emergency plumbing services across London for urgent issues like burst pipes, severe leaks, blocked drains, and heating failures. We aim to respond within 60-90 minutes for emergencies, prioritizing making your property safe and stopping further damage.',
        },
        {
          q: 'Are your plumbers Gas Safe registered?',
          a: 'Yes, our heating engineers are fully Gas Safe registered and qualified to work on gas boilers, central heating, gas cookers, and all gas appliances. We provide Gas Safe certificates for all gas work completed.',
        },
        {
          q: 'How much do plumbing services cost in London?',
          a: 'Costs vary by job type. Simple repairs (tap washer, toilet flush) typically cost £80-£150. Emergency call-outs have a standard charge plus hourly rates. Larger projects like bathroom installations or boiler replacements are quoted individually after assessment. We always provide clear pricing upfront.',
        },
        {
          q: 'Can you install a complete bathroom?',
          a: 'Absolutely. We provide full bathroom design and installation services including removing your old suite, all plumbing work, tiling, electrical work for showers and lighting, flooring, and finishing. We manage the entire project from design through to completion.',
        },
        {
          q: 'Do you service and repair boilers?',
          a: 'Yes, our Gas Safe engineers service, repair, and install all types of boilers (combi, system, conventional). We work with all major brands and can diagnose and fix most boiler issues. We also provide annual boiler servicing which is essential for safety and efficiency.',
        },
        {
          q: 'Which areas of London do you cover?',
          a: 'We provide plumbing services throughout Greater London including all boroughs in Central, North, South, East, and West London. Our vans operate across Zones 1-6 and surrounding areas. Contact us to confirm coverage for your specific location.',
        },
       
        {
          q: 'Can you help with blocked drains?',
          a: 'Yes, we provide comprehensive drainage services including unblocking sinks, toilets, showers, and external drains. We use professional equipment including drain cameras for diagnosis and high-pressure jetting for stubborn blockages. Most blockages are cleared within one visit.',
        },
      ]}
    />
  );
}