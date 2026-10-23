import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=85&auto=format&fit=crop';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero({ onExploreProjects, onBookConsultation }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Beautifully designed contemporary living room interior"
          className="img-cover"
          fetchpriority="high"
          onError={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(135deg, #2C2417 0%, #5C4A32 100%)';
            e.currentTarget.src = '';
          }}
        />
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-24 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="eyebrow mb-4"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Thoughtfully Designed Spaces
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={0.12}
            initial="hidden"
            animate="visible"
            className="font-serif text-balance"
            style={{
              fontSize: 'clamp(1.9rem, 8vw, 5rem)',
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.08,
              marginBottom: '1rem',
            }}
          >
            Spaces That Feel<br className="hidden sm:block" /> Like Home.
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={fadeUp}
            custom={0.24}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 'clamp(0.87rem, 2.5vw, 1.05rem)',
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '520px',
              lineHeight: 1.75,
              marginBottom: '1.75rem',
            }}
          >
            We transform everyday spaces into thoughtful, beautiful interiors
            that reflect your lifestyle, personality, and the way you love to live.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            custom={0.36}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row flex-wrap gap-3"
          >
            <button
              id="hero-explore-btn"
              onClick={onExploreProjects}
              className="btn-light"
              style={{ justifyContent: 'center' }}
            >
              Explore Our Projects
              <ArrowRight size={16} />
            </button>
            <button
              id="hero-consult-btn"
              onClick={onBookConsultation}
              className="btn-ghost-light"
              style={{ justifyContent: 'center' }}
            >
              Book a Consultation
            </button>
          </motion.div>

          {/* Trust statement */}
          <motion.p
            variants={fadeUp}
            custom={0.48}
            initial="hidden"
            animate="visible"
            style={{
              marginTop: '2.5rem',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
            }}
          >
            Residential Interiors&nbsp;·&nbsp;Thoughtful Planning&nbsp;·&nbsp;Timeless Design
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.3)' }}
        />
      </motion.div>
    </section>
  );
}
