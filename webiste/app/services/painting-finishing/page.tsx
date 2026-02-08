import React from 'react';
import ServiceDetail from '../../Components/ServiceDetail';

export const metadata = {
  title: 'Painting & Decorating London | Professional Painters & Decorators',
  description:
    'Professional painting and decorating services across London. Expert interior and exterior painters for homes and businesses. High-quality finishes, premium paints, competitive prices. All London boroughs.',
  keywords: [
    'painters and decorators London',
    'painting services London',
    'interior painting London',
    'exterior painting London',
    'house painters London',
    'decorators London',
    'painting contractors London',
    'commercial painting London',
    'residential painting London',
    'wallpaper hanging London',
    'paint spraying London',
    'decorating services London',
    'professional painters London',
    'wall painting London',
    'ceiling painting London',
    'door painting London',
    'skirting board painting London',
    'period property painting London',
    'decorator near me London',
    'painting company London',
  ],
};

export default function Page() {
  return (
    <ServiceDetail
      title="Painting & Decorating Services"
      imageSrc="/painting.jpg"
      summary="Professional painting and decorating across London. Transform your property with expert painters delivering flawless finishes and lasting quality."
      description="Our skilled painters and decorators bring new life to London properties with exceptional craftsmanship and attention to detail. Whether you need a fresh coat of paint for a Chelsea townhouse, period restoration in Hampstead, commercial painting in Shoreditch, or complete decorating services for a Wimbledon home, our experienced team delivers outstanding results across all London boroughs. We specialize in both interior and exterior painting, using premium paints and materials for durable, beautiful finishes that stand the test of time. From initial color consultation and surface preparation through to final finishing touches, we manage every aspect of your painting project with professionalism and care. Our decorators are experienced working in occupied properties, understanding the importance of cleanliness, punctuality, and minimal disruption. We work with all property types including period homes, modern developments, rental properties, and commercial spaces. With meticulous preparation, quality materials, and skilled application, we deliver painting and decorating services that exceed expectations and add genuine value to your London property."
      features={[
        'Interior wall and ceiling painting',
        'Exterior house and flat painting',
        'Period property restoration',
        'Woodwork and trim painting',
        'Door and window frame painting',
        'Wallpaper hanging and removal',
        'Feature walls and accent painting',
        'Spray painting services',
        'Commercial and office painting',
        'Staircase and hallway painting',
        'Kitchen and bathroom painting',
        'Ceiling coving and cornice work',
        'Color consultation and matching',
        'Surface preparation and filling',
        'Mold treatment and prevention',
        'Full project management',
      ]}
      benefits={[
        'Experienced, skilled London decorators',
        'Premium quality paints and materials',
        'Meticulous preparation and finishing',
        'Clean, tidy working practices',
        'Flexible scheduling to suit you',
        'Competitive, transparent pricing',
        'Full insurance and guarantees',
        'Free quotes and color advice',
      ]}
      process={[
        {
          title: 'Free Consultation',
          detail: 'We visit your London property to discuss your requirements, offer color advice, assess surfaces, and provide a detailed, itemized quote.',
        },
        {
          title: 'Preparation',
          detail: 'We protect your furniture and floors, prepare all surfaces properly (filling, sanding, priming), and ensure optimal conditions for painting.',
        },
        {
          title: 'Professional Painting',
          detail: 'Our skilled decorators apply paint with precision, using proper techniques for smooth, even coverage and professional-quality finishes.',
        },
        {
          title: 'Quality Control',
          detail: 'We inspect all work carefully, apply additional coats where needed, and ensure every detail meets our high standards before moving to finishing.',
        },
        {
          title: 'Finishing & Cleanup',
          detail: 'Final touches are completed, all protection removed, and the space cleaned thoroughly. We walk through the work with you to ensure complete satisfaction.',
        },
      ]}
      faqs={[
        {
          q: 'What painting services do you offer?',
          a: 'We provide comprehensive painting and decorating including interior walls and ceilings, exterior masonry and rendering, woodwork (doors, windows, skirting, architrave), wallpaper hanging, spray painting, and specialist finishes. We work on residential and commercial properties throughout London.',
        },
        {
          q: 'How long does painting take?',
          a: 'Timescales depend on project size and complexity. A typical bedroom takes 1-2 days, a full flat 3-5 days, and a complete house 1-3 weeks. Exterior painting depends on weather and property size. We provide accurate timescales in our quotes.',
        },
        {
          q: 'What paint brands do you use?',
          a: 'We use premium quality paints from leading brands including Dulux, Farrow & Ball, Little Greene, Crown, and others. We recommend specific products based on the surface, usage, and desired finish. All paints are low-VOC and suitable for occupied properties.',
        },
        {
          q: 'Do you offer color consultation?',
          a: 'Yes! We provide free color advice and can help you choose colors that complement your space, lighting, and existing décor. We can also arrange color samples and testing patches before committing to final colors.',
        },
        {
          q: 'Can you work in occupied properties?',
          a: 'Absolutely. Most of our London clients remain in their homes during painting work. We work cleanly, protect all furniture and floors, work room-by-room to minimize disruption, and ensure spaces are usable at the end of each day wherever possible.',
        },
        {
          q: 'Do you paint period properties?',
          a: 'Yes, we have extensive experience decorating period properties throughout London including Victorian, Georgian, and Edwardian homes. We understand the special requirements of heritage properties including appropriate paints, techniques, and sympathetic restoration.',
        },
        {
          q: 'Which London areas do you cover?',
          a: 'We provide painting and decorating services throughout all London boroughs including Central, North, South, East, and West London, from Zones 1-6 and surrounding areas. Contact us to discuss your specific location.',
        },
      
      ]}
    />
  );
}