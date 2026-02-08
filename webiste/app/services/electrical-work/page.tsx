import React from 'react';
import ServiceDetail from '../../Components/ServiceDetail';

export const metadata = {
  title: 'Electrical Services London | Licensed Electricians & Electrical Installations',
  description:
    'Professional electrical services across London. Licensed, qualified electricians for installations, repairs, rewiring, fuse boxes, lighting, and emergency electrical work. Safe, certified, reliable. All London boroughs.',
  keywords: [
    'electrician London',
    'electrical services London',
    'licensed electrician London',
    'electrical installation London',
    'rewiring London',
    'electrical repairs London',
    'emergency electrician London',
    'fuse box replacement London',
    'electrical safety London',
    'lighting installation London',
    'electrical testing London',
    'EICR London',
    'Part P electrician London',
    'domestic electrician London',
    'commercial electrician London',
    'electrical contractor London',
    'qualified electrician London',
    'electrical certificates London',
    '24 hour electrician London',
    'electrical fault finding London',
  ],
};

export default function Page() {
  return (
    <ServiceDetail
      title="Electrical Services & Installation"
      // Use a public folder path (leading slash). Place electric.jpg in the project's /public folder.
      imageSrc="/electric.jpg"
      summary="Professional electrical services across London. Licensed electricians for safe, certified installations, repairs, and emergency work."
      description="Our qualified, Part P registered electricians provide comprehensive electrical services throughout London, ensuring your property is safe, compliant, and efficient. Whether you need a complete rewire for a period property in Kensington, a consumer unit upgrade in Stratford, new lighting installation in Camden, or emergency repairs in Wandsworth, our experienced team delivers reliable solutions across all London boroughs. We handle everything from minor repairs and socket installations to major projects including full house rewiring, electrical design, and commercial installations. Every job is completed to the highest standards, fully compliant with BS 7671 (18th Edition) wiring regulations, and certified upon completion. Our electricians are fully qualified, insured, and committed to safe working practices. We understand that electrical work can be disruptive, so we work efficiently, keep mess to a minimum, and always leave your property clean and tidy. With transparent pricing, professional service, and a focus on quality workmanship, we're the electricians London residents trust for all their electrical needs."
      features={[
        'Full house and flat rewiring',
        'Consumer unit (fuse box) upgrades',
        'Electrical Installation Condition Reports (EICR)',
        'New socket and switch installation',
        'Indoor and outdoor lighting installation',
        'Security lighting and motion sensors',
        'Smoke and carbon monoxide alarms',
        'Emergency electrical repairs 24/7',
        'Fault finding and diagnostics',
        'Electric shower and cooker installation',
        'EV charging point installation',
        'Smart home and automation systems',
        'Electrical certificates and compliance',
        'Landlord electrical safety certificates',
        'Part P certified installations',
        'Commercial electrical services',
      ]}
      benefits={[
        'Fully qualified, Part P registered electricians',
        'All work certified and compliant',
        'Emergency call-out service available',
        'Transparent, competitive pricing',
        'Clean, professional service',
        'Full public liability insurance',
        'Free quotes and safety advice',
        'Guarantee on all workmanship',
      ]}
      process={[
        {
          title: 'Initial Consultation',
          detail: 'Contact us to discuss your electrical needs. For larger jobs, we arrange a site visit to assess requirements and provide a detailed quote.',
        },
        {
          title: 'Detailed Quote',
          detail: 'Receive a comprehensive, itemized quote outlining all work, materials, timescales, and costs. No hidden charges or surprises.',
        },
        {
          title: 'Professional Installation',
          detail: 'Our qualified electricians complete the work efficiently and safely, keeping you informed throughout and minimizing disruption to your London property.',
        },
        {
          title: 'Testing & Certification',
          detail: 'All electrical work is thoroughly tested to ensure safety and compliance. We provide all necessary certificates and documentation.',
        },
        {
          title: 'Final Walkthrough',
          detail: 'We explain the work completed, demonstrate any new systems, and ensure you\'re completely satisfied before we leave.',
        },
      ]}
      faqs={[
        {
          q: 'Are your electricians qualified and certified?',
          a: 'Yes, all our electricians are fully qualified to City & Guilds or equivalent standards, Part P registered, and regularly trained on the latest 18th Edition BS 7671 wiring regulations. We\'re members of relevant trade bodies and carry full public liability insurance.',
        },
        {
          q: 'Do you provide electrical certificates?',
          a: 'Absolutely. We provide all necessary certificates for work completed including Minor Electrical Installation Works Certificates, Electrical Installation Certificates, and Electrical Installation Condition Reports (EICR). These are essential for compliance, insurance, and property sales.',
        },
        {
          q: 'Do you offer emergency electrical services?',
          a: 'Yes, we provide 24/7 emergency electrical services across London for urgent issues like power outages, dangerous sparking, blown consumer units, and electrical hazards. We aim to respond quickly to make your property safe.',
        },
        {
          q: 'How much does rewiring cost in London?',
          a: 'Rewiring costs vary based on property size, access, and complexity. A typical 2-bedroom flat in London might cost £3,000-£5,000, while a 3-bedroom house could be £4,500-£7,000+. We provide detailed quotes after assessing your specific property.',
        },
        {
          q: 'Do I need an EICR for my London property?',
          a: 'EICRs are required every 5 years for rental properties in England (legal requirement for landlords), recommended every 10 years for owner-occupied homes, and required when buying/selling in some cases. We provide comprehensive EICR testing and certification.',
        },
        {
          q: 'Can you install EV charging points?',
          a: 'Yes, we install home EV charging points across London, including obtaining necessary permissions, electrical upgrades if required, and configuring smart charging features. We can advise on the best charger for your vehicle and parking situation.',
        },
        {
          q: 'How long does electrical work take?',
          a: 'Timescales vary by job: simple socket installation takes 1-2 hours, consumer unit replacement 4-6 hours, full flat rewiring 3-7 days, and full house rewiring 1-2 weeks. We provide accurate timescales in our quotes.',
        },
        {
          q: 'Which London areas do you cover?',
          a: 'We provide electrical services throughout all London boroughs and surrounding areas. Our electricians regularly work across Central, North, South, East, and West London. Contact us to confirm coverage for your specific postcode.',
        },
      ]}
    />
  );
}