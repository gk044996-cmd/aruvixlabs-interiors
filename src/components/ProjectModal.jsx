import { useEffect, useRef } from 'react';
import { X, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectModal({ project, onClose, onEnquire }) {
  const closeRef = useRef(null);

  // Focus close button when modal opens
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
          style={{ background: 'rgba(44,36,23,0.08)' }}
        >
          <X size={18} style={{ color: 'var(--color-espresso)' }} />
        </button>

        {/* Image */}
        <div className="overflow-hidden rounded-t-[6px]" style={{ aspectRatio: '16/7' }}>
          <img
            src={project.image}
            alt={project.alt}
            className="img-cover"
            onError={(e) => {
              e.currentTarget.parentElement.style.background = 'var(--color-linen)';
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-7 lg:p-10">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: 'var(--color-bronze)' }}
            >
              {project.category}
            </span>
            <span className="flex items-center gap-1.5" style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>
              <MapPin size={13} />
              {project.location}
            </span>
          </div>

          <h2
            className="font-serif font-semibold mb-4"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--color-espresso)' }}
          >
            {project.title}
          </h2>

          <p style={{ color: 'var(--color-muted)', fontSize: '0.93rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
            {project.description}
          </p>

          {/* Design highlights */}
          <div className="mb-8">
            <h3
              className="font-sans font-semibold text-sm mb-4 tracking-wide uppercase"
              style={{ color: 'var(--color-espresso)', letterSpacing: '0.1em' }}
            >
              Design Highlights
            </h3>
            <ul className="flex flex-col gap-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--color-bronze)' }}
                  />
                  <span style={{ color: 'var(--color-muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo notice */}
          <p
            className="mb-6 text-xs px-4 py-3 rounded-sm"
            style={{
              color: 'var(--color-muted)',
              background: 'var(--color-cream)',
              border: '1px solid var(--color-linen)',
              lineHeight: 1.65,
            }}
          >
            <strong>Note:</strong> This is a sample project shown for demonstration purposes.
            It does not represent work completed by a real studio unless this content has been updated.
          </p>

          {/* CTA */}
          <button onClick={onEnquire} className="btn-primary">
            Discuss a Similar Project
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
