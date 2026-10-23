import { motion } from 'framer-motion';

// SAMPLE TESTIMONIALS — clearly labeled as demo content.
// Replace with real client testimonials before publishing.
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "The studio took the time to really understand how our family lives before proposing anything. The result is a home that feels completely ours — every room works well and looks beautiful. We couldn't be more pleased.",
    name: 'Priya R.',
    role: 'Homeowner, Bengaluru',
    note: 'Sample testimonial — shown for demonstration purposes.',
  },
  {
    id: 2,
    quote:
      "What impressed us most was the attention to the details we hadn't thought about — the lighting plan, the storage in unexpected places, the way the kitchen connects to the dining area. It all just works.",
    name: 'Arjun & Neha M.',
    role: 'Homeowners, Mumbai',
    note: 'Sample testimonial — shown for demonstration purposes.',
  },
  {
    id: 3,
    quote:
      "We were nervous about redesigning a compact flat, but the approach was so methodical and considered. Every centimetre is used thoughtfully. The space feels twice as large as it actually is.",
    name: 'Sunita K.',
    role: 'Homeowner, Delhi',
    note: 'Sample testimonial — shown for demonstration purposes.',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-xl mb-14">
          <p className="eyebrow mb-3">Client Reflections</p>
          <div className="divider" />
          <h2 className="section-heading mb-4">What Clients Say</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
            The following are sample testimonials for demonstration purposes and do not
            represent verified reviews from a real studio.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="testimonial-card"
            >
              <p
                style={{
                  fontSize: '0.93rem',
                  color: 'var(--color-charcoal)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  marginTop: '1.5rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {t.quote}
              </p>
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-sans font-semibold text-sm"
                  style={{ color: 'var(--color-espresso)' }}
                >
                  {t.name}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                  {t.role}
                </span>
                <span
                  className="mt-2 text-xs italic"
                  style={{ color: 'var(--color-stone)' }}
                >
                  {t.note}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
