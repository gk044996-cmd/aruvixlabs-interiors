import { motion } from 'framer-motion';

const FEATURE_IMAGE =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop';

const PILLARS = [
  { label: 'Natural Light', text: 'How light moves through a home is as important as any piece of furniture. We design around it.' },
  { label: 'Honest Materials', text: 'Wood, stone, linen, plaster — materials with character that improve with time and tell a genuine story.' },
  { label: 'Considered Storage', text: 'Clutter is the enemy of calm. Every project includes a thorough rethink of how a home stores the objects of daily life.' },
  { label: 'Human Proportion', text: 'Spaces should feel right to the body — ceiling heights, doorways, furniture scale — all in quiet conversation with each other.' },
];

export default function EditorialFeature() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--color-espresso)' }}
      aria-labelledby="editorial-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="eyebrow mb-4"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Design Philosophy
            </p>

            <h2
              id="editorial-heading"
              className="font-serif font-semibold text-balance mb-6"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
                color: 'white',
                lineHeight: 1.1,
              }}
            >
              Beautiful Spaces.<br />Better Living.
            </h2>

            <p
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '1rem',
                lineHeight: 1.85,
                maxWidth: '480px',
                marginBottom: '2.5rem',
              }}
            >
              A well-designed interior is not about perfection — it is about coherence.
              When light, materials, texture, storage, and proportion work together,
              a home stops being a collection of rooms and becomes a place that genuinely supports the way you live.
            </p>

            {/* Four pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map((pillar) => (
                <div key={pillar.label} className="flex flex-col gap-1.5">
                  <span
                    className="font-sans font-semibold text-xs tracking-widest uppercase"
                    style={{ color: 'var(--color-stone)' }}
                  >
                    {pillar.label}
                  </span>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem', lineHeight: 1.7 }}>
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="relative"
          >
            <div
              className="overflow-hidden rounded-sm"
              style={{ aspectRatio: '4/5', maxHeight: '600px' }}
            >
              <img
                src={FEATURE_IMAGE}
                alt="Minimalist living room with warm natural light and honest materials"
                className="img-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Subtle frame */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
