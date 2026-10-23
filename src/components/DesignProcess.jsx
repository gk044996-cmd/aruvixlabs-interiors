import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description:
      "We begin by listening. Through a structured consultation we explore how you live day to day, what you love in a home, your practical requirements, and the budget you're working with.",
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'From our conversation we develop a spatial layout, initial material palette, and a design concept that balances your brief with what is structurally and aesthetically possible.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'We refine the concept into a full design — finishes, joinery details, furniture selection, lighting scheme, and storage strategy — all resolved as a single coherent whole.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'We present the finalised design direction with drawings, material boards, and specifications. You leave with a clear vision and a comprehensive brief to take forward.',
  },
];

export default function DesignProcess() {
  return (
    <section
      id="process"
      className="py-24 lg:py-32"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-xl mb-16">
          <p className="eyebrow mb-3">How We Work</p>
          <div className="divider" />
          <h2 className="section-heading mb-4">Our Design Process</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
            A clear, considered process ensures every project is well-understood before a single
            design decision is made.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-12 left-0 right-0 h-px"
            style={{ background: 'var(--color-linen)', zIndex: 0 }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="relative"
            >
              {/* Step number circle */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative z-10"
                style={{ background: 'white', border: '1.5px solid var(--color-linen)', flexShrink: 0 }}
              >
                <span
                  className="font-serif"
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--color-bronze)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="font-sans font-semibold mb-3"
                style={{ fontSize: '1rem', color: 'var(--color-espresso)', letterSpacing: '0.02em' }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', lineHeight: 1.75 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="mt-12 text-xs"
          style={{ color: 'var(--color-stone)', lineHeight: 1.6 }}
        >
          This represents our design consultation and planning service. We do not offer construction,
          installation, or procurement services directly.
        </p>
      </div>
    </section>
  );
}
