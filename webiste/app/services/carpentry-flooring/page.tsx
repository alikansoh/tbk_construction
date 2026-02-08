import React from 'react';
import ServiceDetail from '../../Components/ServiceDetail';

export const metadata = {
  title: 'Carpentry & Flooring Installation London | Expert Joinery & Floor Fitting Services',
  description:
    'Professional carpentry and flooring installation across London. Expert joinery, bespoke carpentry, and floor fitting for hardwood, laminate, vinyl, carpet, and tile. Quality materials, skilled fitters and joiners, competitive prices. Serving all London boroughs.',
  keywords: [
    'carpentry London',
    'joinery London',
    'flooring installation London',
    'carpentry services London',
    'carpenter London',
    'joiner London',
    'hardwood flooring London',
    'laminate flooring London',
    'vinyl flooring London',
    'tile flooring London',
    'floor fitting London',
    'carpet fitting London',
    'door hanging London',
    'skirting installation London',
    'bespoke joinery London',
    'staircase installation London',
    'floor renovation London',
    'flooring specialists London',
    'residential carpentry London',
    'commercial carpentry London',
  ],
};

export default function Page() {
  return (
    <ServiceDetail
      title="Carpentry & Flooring Installation"
      imageSrc="https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?q=80&w=1600&auto=format&fit=crop"
      summary="Expert carpentry and flooring installation across London. Bespoke joinery, skilled floor fitting, and high-quality finishing by experienced professionals."
      description="Transform your London property with our professional carpentry and flooring installation services. Whether you need bespoke joinery, fitted doors, skirting and architraves, or high-quality floor fitting — carpets, hardwood, laminate, vinyl, and tiles — our skilled team delivers exceptional results across all London boroughs. We work with premium suppliers to offer an extensive range of materials to suit every style and budget. From initial consultation and design through to expert installation and finishing, we manage every detail of your project. Our experienced joiners and fitters understand the challenges of London properties — restricted access, tight schedules, and minimising disruption. Our efficient service includes furniture moving, subfloor and substrate preparation, precise fitting, on-site finishing, and thorough cleanup, leaving you with beautiful, durable results and complete peace of mind."
      features={[
        'Free home consultation and measuring service',
        'Bespoke joinery and custom woodworking',
        'Door hanging and adjustment services',
        'Skirting, architrave and trim installation',
        'Solid and engineered hardwood flooring',
        'Laminate and luxury vinyl tile (LVT) installation',
        'Carpet fitting and stair runners',
        'Ceramic and porcelain tile fitting',
        'Underlay, insulation and soundproofing',
        'Subfloor preparation and leveling',
        'Staircase repair and fabrication',
        'On-site cutting, routing and finishing',
        'Commercial and residential projects',
        'Furniture moving and replacement',
        'Full cleanup and disposal service',
        'Comprehensive workmanship warranty',
      ]}
      benefits={[
        'Over 20 years combined carpentry & flooring experience in London',
        'Competitive pricing with price match guarantee',
        'Wide selection of premium materials and bespoke options',
        'Expert advice on best solutions for your space and lifestyle',
        'Professional, courteous joiners and fitters',
        'Minimal disruption to your routine with flexible scheduling',
        'Full insurance and workmanship warranty',
        'Aftercare guidance and maintenance tips',
      ]}
      process={[
        {
          title: 'Free Consultation',
          detail: 'We visit your London property to discuss requirements, show samples, take accurate measurements, and provide a detailed quote with recommended options.',
        },
        {
          title: 'Design & Material Selection',
          detail: 'Choose from our range of joinery finishes and flooring materials. We can provide tailored designs for bespoke cabinets, doors, skirting, and stair elements.',
        },
        {
          title: 'Preparation',
          detail: "We order materials, prepare the site and subfloor, ensure level substrates, and schedule the installation to minimise disruption.",
        },
        {
          title: 'Carpentry & Installation',
          detail: 'Our skilled joiners and fitters complete the installation with precision — fitting floors, installing skirtings, doors and bespoke joinery, and finishing with attention to detail.',
        },
        {
          title: 'Final Inspection',
          detail: "We walk through the completed work with you, ensure you're completely satisfied, and provide aftercare advice and any warranty paperwork.",
        },
      ]}
      faqs={[
        {
          q: 'What carpentry and joinery services do you provide?',
          a: 'We offer a full range of carpentry and joinery services including bespoke cabinets, door hanging and adjustments, skirtings and architraves, stair repairs and installations, shelving, built-in units, and general repairs. We pair these with flooring services for a complete finish.',
        },
        {
          q: 'What types of flooring do you install?',
          a: "We install a wide variety of flooring types: carpets, solid and engineered hardwood, laminate, luxury vinyl tiles (LVT) and sheet vinyl, ceramic and porcelain tiles, and natural stone. We advise on the best option for each room based on usage, moisture and underfloor heating compatibility.",
        },
        {
          q: 'How long do carpentry or flooring projects usually take?',
          a: 'Timescales vary by scope. Minor joinery or a single room floor can take a day or two, whereas larger bespoke joinery projects or whole-house flooring can take several days to a few weeks. We provide accurate timelines during the consultation and keep you updated throughout.',
        },
        {
          q: 'Do you move furniture?',
          a: 'Yes, we can move most furniture as part of our service. We recommend removing small, fragile or valuable items beforehand. For very heavy items we may need assistance or additional resources, which we will discuss during the booking.',
        },
        {
          q: 'What areas of London do you cover?',
          a: 'We provide carpentry and flooring services across all London boroughs, covering Central, North, South, East and West London, Zones 1-6 and surrounding areas. Contact us to confirm availability for your specific location.',
        },
        {
          q: 'Can you install flooring over existing floors?',
          a: 'In many cases we can. Laminate and vinyl often go over existing level floors; timber and tile installations usually need a prepared subfloor. We assess your current floors during the consultation and recommend the best approach.',
        },
        {
          q: 'Do you offer bespoke joinery and custom designs?',
          a: 'Yes — we design and build bespoke joinery solutions including fitted wardrobes, kitchen joinery, shelving units, and custom doors. We work to your specifications and can provide drawings, samples and finishes to match your space.',
        },
        {
          q: 'Do you provide samples?',
          a: 'Yes, we bring samples during the home consultation so you can see materials in your own lighting and alongside your existing décor. This helps ensure you choose the right materials before committing.',
        },
      ]}
    />
  );
}