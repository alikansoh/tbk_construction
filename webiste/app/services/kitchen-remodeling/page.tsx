import React from 'react';
import ServiceDetail from '../../Components/ServiceDetail';

export const metadata = {
  title: 'Kitchen Remodeling & Renovation London | Custom Kitchen Design & Installation',
  description:
    'Expert kitchen remodeling and renovation services across London. Custom designs, professional installation, quality materials. Transform your London kitchen into a modern, functional space. Serving all London boroughs.',
  keywords: [
    'kitchen remodeling London',
    'kitchen renovation London',
    'kitchen design London',
    'custom kitchen installation London',
    'kitchen fitting London',
    'kitchen refurbishment London',
    'modern kitchen design London',
    'kitchen makeover London',
    'kitchen upgrade London',
    'fitted kitchen London',
    'bespoke kitchen London',
    'kitchen refit London',
    'new kitchen installation London',
    'kitchen transformation London',
    'contemporary kitchen London',
    'kitchen planning London',
    'kitchen redesign London',
    'full kitchen renovation London',
    'kitchen improvement London',
    'luxury kitchen design London',
    'London kitchen fitters',
    'Central London kitchen',
    'North London kitchen',
    'South London kitchen',
    'East London kitchen',
    'West London kitchen',
  ],
};

export default function Page() {
  return (
    <ServiceDetail
      title="Kitchen Remodeling & Renovation"
      imageSrc="/kitchen.jpg"
      summary="Transform your London kitchen into a stunning, functional space with our expert remodeling and renovation services."
      description="Your kitchen is the heart of your home, and our expert remodeling services bring your vision to life with exceptional craftsmanship and attention to detail. Serving homeowners across all London boroughs, we handle every aspect of your kitchen renovation from initial design consultation through to final installation. Whether you're in a Victorian terrace in Wandsworth, a modern flat in Canary Wharf, a Georgian townhouse in Islington, or a suburban home in Bromley, our experienced team works with you to create a custom kitchen that perfectly balances aesthetics, functionality, and your budget. We specialize in contemporary, traditional, and bespoke kitchen designs tailored to London properties, using premium materials and the latest innovations in kitchen technology. From space planning and cabinetry to worktops, appliances, lighting, and flooring, we manage the entire project with minimal disruption to your daily life. Our comprehensive service includes plumbing, electrical work, tiling, decorating, and all necessary building work, ensuring a seamless renovation experience. With transparent pricing, realistic timelines, and a commitment to excellence, we deliver kitchens that exceed expectations and add lasting value to your London property."
      features={[
        'Free design consultation and 3D visualization',
        'Custom cabinetry and storage solutions',
        'Premium worktop installation (granite, quartz, marble)',
        'Professional appliance fitting and integration',
        'Complete plumbing and electrical work',
        'Bespoke lighting design and installation',
        'Flooring installation (tile, wood, vinyl)',
        'Wall tiling and splashback installation',
        'Kitchen island and breakfast bar design',
        'Structural alterations and extensions',
        'Energy-efficient appliance recommendations',
        'Smart kitchen technology integration',
        'Full project management from start to finish',
        'Building regulation compliance',
        'Warranty on all workmanship and materials',
        'Post-installation support and maintenance advice',
      ]}
      benefits={[
        'Award-winning designers with 15+ years London experience',
        'Fully project-managed service with single point of contact',
        'Premium quality materials from trusted suppliers',
        'Transparent, fixed-price quotes with no hidden costs',
        'Flexible payment plans available',
        'Minimal disruption with efficient installation',
        'All trades coordinated and managed by us',
        'Comprehensive warranties and guarantees',
      ]}
      process={[
        {
          title: 'Initial Consultation',
          detail: 'Meet with our design team at your London property to discuss your vision, requirements, budget, and timeline. We measure your space and assess any structural considerations.',
        },
        {
          title: 'Design & Planning',
          detail: 'Receive detailed 3D designs, material samples, and a comprehensive quote. We refine the design until you\'re completely happy with every detail, optimized for your London home.',
        },
        {
          title: 'Pre-Installation Preparation',
          detail: 'We order all materials, coordinate trades across London, and finalize the installation schedule. Our team ensures everything is ready before work begins.',
        },
        {
          title: 'Professional Installation',
          detail: 'Our skilled London-based craftsmen complete the installation to the highest standards, managing all aspects including plumbing, electrical, and finishing work.',
        },
        {
          title: 'Final Inspection & Handover',
          detail: 'We conduct a thorough walkthrough, ensure everything works perfectly, and provide you with care instructions and warranty documentation.',
        },
      ]}
      faqs={[
        {
          q: 'How long does a kitchen remodel take in London?',
          a: 'Most kitchen renovations take between 4-8 weeks depending on the scope of work. A simple refresh with new units and worktops might take 2-3 weeks, while a complete renovation with structural changes can take 8-12 weeks. London properties often have unique challenges (listed buildings, access restrictions) which we factor into timelines. We provide a detailed schedule during the planning phase.',
        },
        {
          q: 'Can I still use my kitchen during the renovation?',
          a: 'This depends on the extent of the work. For major renovations, the kitchen will be out of action for most of the project. However, we can set up a temporary kitchen area with essential appliances where possible. We work efficiently to minimize disruption and many London clients take advantage of the city\'s excellent dining options during the renovation!',
        },
        {
          q: 'What\'s included in your London kitchen remodeling service?',
          a: 'Our comprehensive service includes design consultation, removal and disposal of your old kitchen, supply and installation of new units and worktops, plumbing and electrical work, tiling, flooring, decorating, appliance installation, and final finishing. We manage all aspects across London so you have one point of contact throughout.',
        },
        {
          q: 'Do you handle planning permission and building regulations in London?',
          a: 'Yes, we manage all necessary applications with London councils and ensure compliance with building regulations. If your project requires planning permission (such as extensions or structural alterations), we can guide you through the process or handle it with your local London borough on your behalf. All work meets current UK standards.',
        },
        {
          q: 'What styles of kitchen do you design for London homes?',
          a: 'We design and install all kitchen styles suited to London properties including contemporary, traditional, shaker, handleless, industrial, country, and fully bespoke designs. We\'re experienced with Victorian, Georgian, Edwardian, and modern London homes. During your consultation, we\'ll show examples and help you choose a style that suits your property.',
        },
        {
          q: 'Can you work with the space constraints of London properties?',
          a: 'Absolutely! We specialize in maximizing smaller London kitchen spaces. Whether you have a compact galley kitchen, an awkward layout, or limited access, we\'re experienced in creating beautiful, functional kitchens that make the most of every inch. Our designers excel at space planning for typical London homes.',
        },
        {
          q: 'Which London areas do you serve?',
          a: 'We serve all London boroughs including Central, North, South, East, and West London, from Zone 1 to Zone 6 and surrounding areas. Whether you\'re in Kensington, Shoreditch, Clapham, Stratford, or Richmond, we\'ve completed projects throughout Greater London. Contact us to discuss your specific location.',
        },
        {
          q: 'What warranties do you provide?',
          a: 'We provide comprehensive warranties covering workmanship (typically 2-5 years), materials (as per manufacturer - often 10+ years for cabinets), and appliances (manufacturer warranty). All electrical and plumbing work is fully guaranteed and certified to UK standards. We provide full warranty documentation upon completion.',
        },
      ]}
    />
  );
}