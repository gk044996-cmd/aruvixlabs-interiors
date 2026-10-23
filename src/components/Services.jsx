import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services.js';

function ServiceCard({ service, onEnquiry }) {
  const handleClick = () => onEnquiry(service.enquiryValue);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="card group cursor-pointer"
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      tabIndex={0}
      role="button"
      aria-label={`Enquire about ${service.title}`}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={service.image}
          alt={service.alt}
          className="img-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.parentElement.style.background = 'var(--color-linen)';
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Text */}
      <div className="p-5">
        <h3
          className="font-sans font-semibold mb-2"
          style={{ fontSize: '0.95rem', color: 'var(--color-espresso)', letterSpacing: '0.01em' }}
        >
          {service.title}
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {service.description}
        </p>
        <span
          className="inline-flex items-center gap-1.5 font-medium text-xs tracking-wide transition-colors duration-200 group-hover:gap-2.5"
          style={{ color: 'var(--color-bronze)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Enquire
          <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.article>
  );
}

export default function Services({ onServiceEnquiry }) {
  return (
    <section
      id="services"
      className="py-24 lg:py-32"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-xl mb-14">
          <p className="eyebrow mb-3">What We Do</p>
          <div className="divider" />
          <h2 className="section-heading mb-4">Our Design Services</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
            From complete home transformations to focused space consultations, our services
            are tailored to the scope and ambition of your project.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEnquiry={onServiceEnquiry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
