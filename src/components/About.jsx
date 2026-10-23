import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80&auto=format&fit=crop';

const PRINCIPLES = [
  {
    title: 'Functionality',
    description:
      'Every design decision is grounded in how you actually live — not just how a space looks in photographs.',
  },
  {
    title: 'Timeless Aesthetics',
    description:
      'We favour materials, proportions, and palettes that remain beautiful long after trends have passed.',
  },
  {
    title: 'Personal Expression',
    description:
      'Your home should feel unmistakably yours — a considered reflection of your personality, preferences, and life.',
  },
];

export default function About({ onContact }) {
  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: 'var(--color-ivory)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="overflow-hidden rounded-sm"
              style={{ aspectRatio: '4/5', maxHeight: '480px' }}
            >
              <img
                src={ABOUT_IMAGE}
                alt="Elegantly designed interior living space"
                className="img-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.parentElement.style.background = 'var(--color-linen)';
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-sm hidden lg:block"
              style={{ background: 'var(--color-linen)', zIndex: -1 }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p className="eyebrow mb-3">Our Philosophy</p>
            <div className="divider" />
            <h2 className="section-heading mb-6">
              Design That Reflects<br />the Way You Live.
            </h2>
            <p className="mb-4" style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
              At our studio, great interior design begins with listening. Before we sketch a single line,
              we want to understand how you move through your home, what moments matter most to you, and what
              kind of environment helps you feel at ease.
            </p>
            <p className="mb-8" style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
              From natural light and material selection to storage planning and spatial proportion,
              every detail is considered in relation to the whole — creating interiors that are
              as functional as they are beautiful.
            </p>

            {/* Principles */}
            <div className="flex flex-col gap-6 mb-10">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-0.5 rounded-full mt-1"
                    style={{ background: 'var(--color-bronze)', alignSelf: 'stretch', minHeight: '40px' }}
                  />
                  <div>
                    <h3
                      className="font-sans font-semibold text-sm mb-1"
                      style={{ color: 'var(--color-espresso)', letterSpacing: '0.02em' }}
                    >
                      {p.title}
                    </h3>
                    <p style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onContact} className="btn-outline">
              Start a Conversation
              <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
