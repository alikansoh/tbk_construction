import React from 'react';
import ServiceDetail from '../../Components/ServiceDetail';

export const metadata = {
  title: 'Home Maintenance & Handyman Services London | Professional Property Maintenance',
  description:
    'Expert home maintenance and handyman services across London. From small repairs to complete property maintenance - plumbing, electrical, carpentry, decorating, and general handywork. Fully qualified tradespeople.',
  keywords: [
    'handyman services London',
    'property maintenance',
    'handyman near me',
    'odd jobs',
    'home repairs London',
    'general maintenance',
    'handywork services',
    'property handyman',
    'maintenance services',
    'home improvement London',
    'small repairs',
    'fix it services',
    'local handyman',
    'household repairs',
    'property care',
    'maintenance contractor',
    'domestic repairs',
    'home care services London',
    'residential maintenance',
  ],
};

export default function Page() {
  return (
    <ServiceDetail
      title="Home Maintenance & Handyman Services"
      imageSrc="/maintenance.jpg"
      summary="Professional home maintenance and handyman services across London. No job too small – from quick fixes to ongoing property care."
      description="Our comprehensive home maintenance and handyman services cover everything you need to keep your property in excellent condition. Whether it's a leaking tap, a squeaky door, flat-pack furniture assembly, or ongoing property maintenance, our skilled tradespeople handle it all with professionalism and care. We specialise in those essential jobs that often get overlooked – the small repairs, adjustments, and improvements that make a real difference to your home. From minor plumbing and electrical work to carpentry, decorating, and general property upkeep, we provide reliable, quality workmanship at competitive rates. Our flexible service adapts to your needs, whether you require a one-off repair, regular maintenance visits, or help with a longer project list. All our tradespeople are fully qualified, experienced, and committed to delivering excellent results. We pride ourselves on punctuality, cleanliness, and clear communication throughout every job."
      features={[
        'General plumbing repairs and maintenance',
        'Minor electrical work and fixture installation',
        'Carpentry and joinery services',
        'Flat-pack furniture assembly',
        'Door and window adjustments',
        'Picture and shelf mounting',
        'Decorating and painting touch-ups',
        'Sealant and grouting repairs',
        'Gutter cleaning and maintenance',
        'Lock and hinge replacements',
        'Tile repairs and replacement',
        'Garden maintenance and odd jobs',
        'Weatherproofing and draught-proofing',
        'Kitchen and bathroom small repairs',
        'Fence and gate repairs',
        'General property maintenance',
      ]}
      benefits={[
        'Fully qualified and experienced tradespeople',
        'No job too small – we handle all maintenance tasks',
        'Flexible scheduling including evenings and weekends',
        'Clear communication and professional service',
        'Competitive rates with transparent quotes',
        'Regular maintenance packages available',
        'Same-day service for urgent repairs',
        'Clean, tidy work with respect for your property',
      ]}
      process={[
        {
          title: 'Contact Us',
          detail: 'Get in touch by phone, email, or our online form. Describe the work you need doing – no matter how small.',
        },
        {
          title: 'Receive Your Quote',
          detail: 'We provide a clear, honest quote for the work. For larger jobs, we can arrange a free site visit to assess requirements.',
        },
        {
          title: 'Book Convenient Time',
          detail: 'Choose a time that suits you. We offer flexible scheduling and can often accommodate urgent requests.',
        },
        {
          title: 'Quality Work Completed',
          detail: 'Our skilled tradesperson completes the work to a high standard, leaving your property clean and tidy.',
        },
      ]}
      faqs={[
        {
          q: 'What types of jobs do you cover?',
          a: 'We handle all general home maintenance and handyman tasks including plumbing repairs, minor electrical work, carpentry, decorating, furniture assembly, door adjustments, fixture installation, gardening tasks, and much more. If you\'re unsure whether we can help, just ask – we\'re happy to discuss any job.',
        },
        {
          q: 'Do you really take on small jobs?',
          a: 'Absolutely! We specialise in those smaller jobs that other companies often overlook. Whether it\'s fixing a dripping tap, hanging a picture, or assembling furniture, no job is too small for us. We understand these tasks are important to you.',
        },
        {
          q: 'Are you qualified and insured?',
          a: 'Yes, all our tradespeople are fully qualified in their respective trades and hold relevant certifications. We carry full public liability insurance and comply with all UK building regulations and safety standards.',
        },
        {
          q: 'How quickly can you come out?',
          a: 'We offer flexible scheduling and can often arrange same-day or next-day visits for urgent work. For non-urgent maintenance, we\'ll find a convenient time that fits your schedule, including evenings and weekends.',
        },
        {
          q: 'Which areas do you cover?',
          a: 'We provide home maintenance and handyman services throughout London. Contact us to confirm coverage in your specific area – we\'re continually expanding our service regions.',
        },
        {
          q: 'Do you offer regular maintenance contracts?',
          a: 'Yes! We offer flexible maintenance packages for homeowners, landlords, and property managers. Regular maintenance helps prevent problems, saves money long-term, and ensures your property stays in excellent condition. Contact us to discuss a tailored package for your needs.',
        },
        {
          q: 'Can you help with multiple jobs in one visit?',
          a: 'Definitely! Many customers prefer to create a list of small jobs and have them all completed in one visit. This is often more cost-effective and convenient. Just let us know everything you need, and we\'ll plan accordingly.',
        },
        {
          q: 'What if I need specialist work?',
          a: 'For work requiring specialist trades (such as Gas Safe registered work or major electrical installations), we work with a network of fully certified professionals whom we can arrange on your behalf, ensuring all work meets the required standards.',
        },
      ]}
    />
  );
}