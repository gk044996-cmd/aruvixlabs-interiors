import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig.js';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ onBookConsultation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Focus first link when menu opens
  useEffect(() => {
    if (menuOpen) setTimeout(() => firstLinkRef.current?.focus(), 150);
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" ref={menuRef}>
      {/* Announcement bar — hidden on very small phones */}
      {SITE_CONFIG.announcement.show && (
        <div className="announcement-bar hidden xs:block">
          {SITE_CONFIG.announcement.text}{' '}
          <button
            onClick={onBookConsultation}
            className="underline underline-offset-2 font-medium hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-0 text-inherit"
          >
            Get in touch →
          </button>
        </div>
      )}

      {/* Main nav bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF8F3]/96 backdrop-blur-md shadow-sm border-b border-[#E8E0D0]'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">

          {/* Brand logo — truncated gracefully on tiny screens */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex flex-col leading-none no-underline min-w-0 flex-shrink"
            aria-label={`${SITE_CONFIG.brand.name} — home`}
          >
            <span
              className="font-serif font-semibold tracking-wide truncate"
              style={{
                fontSize: 'clamp(0.9rem, 3.5vw, 1.3rem)',
                color: menuOpen ? 'var(--color-espresso)' : scrolled ? 'var(--color-espresso)' : 'white',
                transition: 'color 0.3s ease',
              }}
            >
              {SITE_CONFIG.brand.name.toUpperCase()}
            </span>
            <span
              className="font-sans tracking-widest uppercase truncate"
              style={{
                fontSize: 'clamp(0.5rem, 1.5vw, 0.6rem)',
                color: menuOpen ? 'var(--color-bronze)' : scrolled ? 'var(--color-bronze)' : 'rgba(255,255,255,0.6)',
                transition: 'color 0.3s ease',
                letterSpacing: '0.14em',
              }}
            >
              {SITE_CONFIG.brand.tagline}
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 list-none m-0 p-0 flex-shrink-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-link"
                  style={{ color: scrolled ? 'var(--color-charcoal)' : 'rgba(255,255,255,0.9)' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block flex-shrink-0">
            <button onClick={onBookConsultation} className="btn-primary text-sm">
              Book a Consultation
            </button>
          </div>

          {/* Mobile: hamburger button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0 ml-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            style={{
              color: menuOpen ? 'var(--color-espresso)' : scrolled ? 'var(--color-espresso)' : 'white',
              background: menuOpen ? 'var(--color-cream)' : scrolled ? 'var(--color-cream)' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.25s ease',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 z-50 flex flex-col"
            style={{ background: 'var(--color-ivory)' }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-5 h-14 sm:h-16 border-b flex-shrink-0"
              style={{ borderColor: 'var(--color-linen)' }}
            >
              <div className="flex flex-col leading-none min-w-0">
                <span
                  className="font-serif font-semibold tracking-wide truncate"
                  style={{ fontSize: 'clamp(0.85rem, 3.5vw, 1.15rem)', color: 'var(--color-espresso)' }}
                >
                  {SITE_CONFIG.brand.name.toUpperCase()}
                </span>
                <span
                  className="font-sans uppercase truncate"
                  style={{ fontSize: '0.55rem', color: 'var(--color-bronze)', letterSpacing: '0.14em' }}
                >
                  {SITE_CONFIG.brand.tagline}
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0"
                style={{ background: 'var(--color-cream)', color: 'var(--color-espresso)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 pt-4 pb-6" aria-label="Mobile navigation">
              <ul className="list-none m-0 p-0 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center justify-between py-4 text-base font-medium border-b"
                      style={{
                        color: 'var(--color-charcoal)',
                        borderColor: 'var(--color-linen)',
                        textDecoration: 'none',
                        minHeight: '56px',
                      }}
                    >
                      <span>{link.label}</span>
                      <span style={{ color: 'var(--color-stone)', fontSize: '1rem' }}>→</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => { setMenuOpen(false); onBookConsultation(); }}
                  className="btn-primary w-full justify-center py-4 text-sm"
                >
                  Book a Consultation
                </button>
                {SITE_CONFIG.announcement.show && (
                  <p
                    className="text-center text-xs"
                    style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}
                  >
                    {SITE_CONFIG.announcement.text}
                  </p>
                )}
              </div>
            </nav>

            {/* Bottom brand strip */}
            <div
              className="flex-shrink-0 px-5 py-4 border-t"
              style={{ borderColor: 'var(--color-linen)' }}
            >
              <p style={{ fontSize: '0.75rem', color: 'var(--color-stone)' }}>
                {SITE_CONFIG.brand.shortDescription}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
