import { motion } from 'framer-motion';
import { Palette, LayoutGrid, Layers, Eye } from 'lucide-react';

const REASONS = [
  {
    Icon: Palette,
    title: 'Personalised Design',
    description:
      "Every design begins with understanding you — your routines, your preferences, and the way your home needs to work for your family.",
  },
  {
    Icon: LayoutGrid,
    title: 'Functional Spaces',
    description:
      "Beautiful rooms that are also genuinely practical — with intelligent storage, clear circulation, and layouts that serve daily life.",
  },
  {
    Icon: Layers,
    title: 'Thoughtful Material Selection',
    description:
      "Materials are chosen for their quality, durability, and how they interact with light and neighbouring finishes — not just trend appeal.",
  },
  {
    Icon: Eye,
    title: 'Attention to Detail',
    description:
      "The difference between a good interior and a great one is in the details — the shadow gap, the edge profile, the way a handle sits in the hand.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-24 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-xl mb-14">
          <p className="eyebrow mb-3">Why Work With Us</p>
          <div className="divider" />
          <h2 className="section-heading mb-4">A Studio Built Around You</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
            We believe that exceptional interior design comes from a genuine understanding
            of each client and their home — not a one-size-fits-all formula.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="p-6 rounded-sm transition-shadow duration-300 hover:shadow-md"
              style={{ background: 'white', border: '1px solid var(--color-linen)' }}
            >
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center mb-5"
                style={{ background: 'var(--color-cream)' }}
              >
                <Icon size={20} style={{ color: 'var(--color-bronze)' }} strokeWidth={1.5} />
              </div>
              <h3
                className="font-sans font-semibold mb-3"
                style={{ fontSize: '0.95rem', color: 'var(--color-espresso)', letterSpacing: '0.01em' }}
              >
                {title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)', lineHeight: 1.75 }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
