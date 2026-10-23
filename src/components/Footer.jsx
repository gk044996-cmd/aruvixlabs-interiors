import { SITE_CONFIG } from '../data/siteConfig.js';
import { SERVICES } from '../data/services.js';
import { Share2, Link2 } from 'lucide-react';

const NAV_SECTIONS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
];

const scrollTo = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer({ onBookConsultation }) {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: 'var(--color-espresso)', color: 'rgba(255,255,255,0.65)' }}
      aria-label="Site footer"
    >
      {/* CTA strip */}
      <div
        className="py-14 text-center px-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p
          className="font-serif font-semibold mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'white', lineHeight: 1.2 }}
        >
          Ready to begin your project?
        </p>
        <p style={{ maxWidth: '420px', margin: '0 auto 2rem', fontSize: '0.9rem', lineHeight: 1.75 }}>
          Book a no-commitment consultation and tell us about your space.
        </p>
        <button onClick={onBookConsultation} className="btn-light">
          Book a Consultation
        </button>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p
              className="font-serif text-lg font-semibold tracking-widest mb-2"
              style={{ color: 'white', letterSpacing: '0.07em' }}
            >
              {SITE_CONFIG.brand.name.toUpperCase()}
            </p>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-stone)', letterSpacing: '0.14em' }}
            >
              {SITE_CONFIG.brand.tagline}
            </p>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.75, maxWidth: '220px' }}>
              {SITE_CONFIG.brand.shortDescription}
            </p>

            {/* Social links */}
            {(SITE_CONFIG.social.instagram || SITE_CONFIG.social.pinterest) && (
              <div className="flex gap-3 mt-5">
                {SITE_CONFIG.social.instagram && (
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <Share2 size={16} />
                  </a>
                )}
                {SITE_CONFIG.social.pinterest && (
                  <a
                    href={SITE_CONFIG.social.pinterest}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Pinterest"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <Link2 size={16} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick navigation */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: 'white', letterSpacing: '0.13em' }}
            >
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
              {NAV_SECTIONS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm hover:text-white transition-colors duration-200 bg-transparent border-0 cursor-pointer text-left"
                    style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-sans)', padding: 0 }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: 'white', letterSpacing: '0.13em' }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-sm hover:text-white transition-colors duration-200 bg-transparent border-0 cursor-pointer text-left"
                    style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-sans)', padding: 0 }}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: 'white', letterSpacing: '0.13em' }}
            >
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              {SITE_CONFIG.contact.email ? (
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-stone)' }}>Email</p>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-sm hover:text-white transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              ) : (
                <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Email to be configured in siteConfig.js
                </p>
              )}

              {SITE_CONFIG.contact.phone ? (
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-stone)' }}>Phone</p>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="text-sm hover:text-white transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
                  >
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              ) : (
                <p className="text-xs italic" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Phone to be configured in siteConfig.js
                </p>
              )}

              {SITE_CONFIG.contact.city && (
                <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.55)' }}>
                  {SITE_CONFIG.contact.city}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto flex flex-wrap justify-between gap-3 items-center"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
          © {year} {SITE_CONFIG.brand.name}. All rights reserved. Website for demonstration purposes.
        </p>
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
          Built with React + Vite + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
