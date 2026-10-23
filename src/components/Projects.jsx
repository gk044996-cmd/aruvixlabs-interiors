import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects.js';

function ProjectCard({ project, onView }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer overflow-hidden rounded-sm"
      style={{ background: 'white', border: '1px solid var(--color-linen)' }}
      onClick={() => onView(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onView(project); } }}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ aspectRatio: '3/2' }}>
        <img
          src={project.image}
          alt={project.alt}
          className="img-cover transition-transform duration-700 group-hover:scale-107"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.parentElement.style.background = 'var(--color-linen)';
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Overlay on hover */}
      <div className="relative p-5">
        <span
          className="inline-block text-xs font-medium tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-bronze)' }}
        >
          {project.category}
        </span>
        <h3
          className="font-sans font-semibold mb-1.5"
          style={{ fontSize: '1rem', color: 'var(--color-espresso)' }}
        >
          {project.title}
        </h3>
        <div className="flex items-center gap-1 mb-3" style={{ color: 'var(--color-muted)' }}>
          <MapPin size={12} />
          <span style={{ fontSize: '0.78rem' }}>{project.location}</span>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)', lineHeight: 1.65 }}>
          {project.shortDescription}
        </p>
        <span
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase transition-all duration-200 group-hover:gap-3"
          style={{ color: 'var(--color-bronze)' }}
        >
          View Project →
        </span>
      </div>
    </motion.article>
  );
}

export default function Projects({ onViewProject }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categorySlug === activeCategory);

  return (
    <section
      id="projects"
      className="py-24 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-xl mb-10">
          <p className="eyebrow mb-3">Portfolio</p>
          <div className="divider" />
          <h2 className="section-heading mb-4">Spaces Designed to Inspire.</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
            Explore thoughtful interiors shaped around everyday living.{' '}
            <em style={{ color: 'var(--color-stone)', fontStyle: 'normal', fontSize: '0.82rem' }}>
              Sample projects shown for demonstration purposes.
            </em>
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by category">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              aria-pressed={activeCategory === cat.slug}
              className="px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.03em',
                background: activeCategory === cat.slug ? 'var(--color-espresso)' : 'white',
                color: activeCategory === cat.slug ? 'white' : 'var(--color-charcoal)',
                border: `1.5px solid ${activeCategory === cat.slug ? 'var(--color-espresso)' : 'var(--color-linen)'}`,
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={onViewProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--color-muted)' }}>
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
