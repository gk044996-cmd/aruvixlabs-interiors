import { useState, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../data/services.js';
import { SITE_CONFIG } from '../data/siteConfig.js';
import { MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';

const PROPERTY_TYPES = ['Apartment', 'Independent House / Villa', 'Studio', 'Penthouse', 'Office Space', 'Other'];
const BUDGET_RANGES = ['Under ₹5 Lakhs', '₹5 – 10 Lakhs', '₹10 – 20 Lakhs', '₹20 – 50 Lakhs', '₹50 Lakhs+', 'To be discussed'];
const CONTACT_METHODS = ['Email', 'Phone Call', 'WhatsApp', 'Video Call'];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  propertyType: '',
  service: '',
  budget: '',
  contactMethod: '',
  details: '',
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[+]?[\d\s\-().]{7,15}$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!values.propertyType) errors.propertyType = 'Please select a property type.';
  if (!values.service) errors.service = 'Please select a service.';
  if (!values.budget) errors.budget = 'Please select an approximate budget.';
  if (!values.contactMethod) errors.contactMethod = 'Please select a contact method.';
  return errors;
}

export default function ConsultationForm({ prefillService, onPrefillConsumed }) {
  const formId = useId();
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Apply prefilled service when triggered from service cards
  useEffect(() => {
    if (prefillService) {
      setValues((v) => ({ ...v, service: prefillService }));
      onPrefillConsumed?.();
    }
  }, [prefillService, onPrefillConsumed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => { const e2 = { ...err }; delete e2[name]; return e2; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus first error field
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }
    setLoading(true);
    // Simulate async submission (frontend demo only)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setValues(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  const whatsappUrl = SITE_CONFIG.contact.whatsapp
    ? `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%2C%20I%27d%20like%20to%20discuss%20an%20interior%20design%20project.`
    : null;

  const field = (name) => `${formId}-${name}`;

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ background: 'var(--color-ivory)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-3">Get In Touch</p>
            <div className="divider" />
            <h2 className="section-heading mb-5">
              Let's Design a Space You'll Love.
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Tell us about your project and we'll be in touch to arrange a conversation.
              There's no commitment required at this stage.
            </p>

            {/* Contact details (only shown if configured) */}
            <div className="flex flex-col gap-4">
              {SITE_CONFIG.contact.email && (
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-bronze)' }}>Email</span>
                  <p style={{ color: 'var(--color-charcoal)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {SITE_CONFIG.contact.email}
                    </a>
                  </p>
                </div>
              )}
              {SITE_CONFIG.contact.phone && (
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-bronze)' }}>Phone</span>
                  <p style={{ color: 'var(--color-charcoal)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    <a href={`tel:${SITE_CONFIG.contact.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </p>
                </div>
              )}
              {!SITE_CONFIG.contact.email && !SITE_CONFIG.contact.phone && (
                <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>
                  Contact details will appear here once configured in <code>src/data/siteConfig.js</code>.
                </p>
              )}
            </div>

            {/* WhatsApp CTA */}
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-8 w-fit"
                style={{ gap: '0.5rem' }}
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            ) : (
              <p
                className="mt-6 text-xs"
                style={{ color: 'var(--color-stone)', fontStyle: 'italic' }}
              >
                WhatsApp link will appear here once a phone number is configured in <code>src/data/siteConfig.js</code>.
              </p>
            )}
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {submitted ? (
              <div
                className="rounded-sm p-10 flex flex-col items-center text-center gap-5"
                style={{ background: 'white', border: '1px solid var(--color-linen)' }}
              >
                <CheckCircle size={44} style={{ color: 'var(--color-bronze)' }} strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif font-semibold mb-2" style={{ fontSize: '1.5rem', color: 'var(--color-espresso)' }}>
                    Enquiry Received
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '400px' }}>
                    Thank you for your interest. This is a frontend demonstration — no information has been sent to a server or
                    received by a business. In a live setup, your enquiry would be forwarded appropriately.
                  </p>
                </div>
                <button onClick={handleReset} className="btn-outline mt-2">
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Consultation enquiry form"
                className="rounded-sm p-7 lg:p-10 flex flex-col gap-5"
                style={{ background: 'white', border: '1px solid var(--color-linen)' }}
              >
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={field('fullName')} className="form-label">
                      Full Name <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <input
                      id={field('fullName')}
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={values.fullName}
                      onChange={handleChange}
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="Your full name"
                      aria-describedby={errors.fullName ? `${field('fullName')}-err` : undefined}
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && <p id={`${field('fullName')}-err`} className="form-error" role="alert">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor={field('email')} className="form-label">
                      Email Address <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <input
                      id={field('email')}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={values.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="you@example.com"
                      aria-describedby={errors.email ? `${field('email')}-err` : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p id={`${field('email')}-err`} className="form-error" role="alert">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={field('phone')} className="form-label">
                      Phone Number <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <input
                      id={field('phone')}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={values.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+91 98765 43210"
                      aria-describedby={errors.phone ? `${field('phone')}-err` : undefined}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <p id={`${field('phone')}-err`} className="form-error" role="alert">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor={field('propertyType')} className="form-label">
                      Property Type <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <select
                      id={field('propertyType')}
                      name="propertyType"
                      required
                      value={values.propertyType}
                      onChange={handleChange}
                      className={`form-input ${errors.propertyType ? 'error' : ''}`}
                      aria-describedby={errors.propertyType ? `${field('propertyType')}-err` : undefined}
                      aria-invalid={!!errors.propertyType}
                    >
                      <option value="">Select property type</option>
                      {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.propertyType && <p id={`${field('propertyType')}-err`} className="form-error" role="alert">{errors.propertyType}</p>}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={field('service')} className="form-label">
                      Service Interested In <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <select
                      id={field('service')}
                      name="service"
                      required
                      value={values.service}
                      onChange={handleChange}
                      className={`form-input ${errors.service ? 'error' : ''}`}
                      aria-describedby={errors.service ? `${field('service')}-err` : undefined}
                      aria-invalid={!!errors.service}
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.enquiryValue}>{s.title}</option>
                      ))}
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                    {errors.service && <p id={`${field('service')}-err`} className="form-error" role="alert">{errors.service}</p>}
                  </div>
                  <div>
                    <label htmlFor={field('budget')} className="form-label">
                      Approximate Budget <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <select
                      id={field('budget')}
                      name="budget"
                      required
                      value={values.budget}
                      onChange={handleChange}
                      className={`form-input ${errors.budget ? 'error' : ''}`}
                      aria-describedby={errors.budget ? `${field('budget')}-err` : undefined}
                      aria-invalid={!!errors.budget}
                    >
                      <option value="">Select budget range</option>
                      {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {errors.budget && <p id={`${field('budget')}-err`} className="form-error" role="alert">{errors.budget}</p>}
                  </div>
                </div>

                {/* Row 4 */}
                <div>
                  <label htmlFor={field('contactMethod')} className="form-label">
                    Preferred Contact Method <span aria-hidden="true" style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <select
                    id={field('contactMethod')}
                    name="contactMethod"
                    required
                    value={values.contactMethod}
                    onChange={handleChange}
                    className={`form-input ${errors.contactMethod ? 'error' : ''}`}
                    aria-describedby={errors.contactMethod ? `${field('contactMethod')}-err` : undefined}
                    aria-invalid={!!errors.contactMethod}
                  >
                    <option value="">Select contact method</option>
                    {CONTACT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {errors.contactMethod && <p id={`${field('contactMethod')}-err`} className="form-error" role="alert">{errors.contactMethod}</p>}
                </div>

                {/* Row 5 */}
                <div>
                  <label htmlFor={field('details')} className="form-label">
                    Project Details <span style={{ color: 'var(--color-stone)', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    id={field('details')}
                    name="details"
                    rows={4}
                    value={values.details}
                    onChange={handleChange}
                    className="form-input resize-none"
                    placeholder="Tell us about your space, what you're hoping to achieve, any specific requirements..."
                  />
                </div>

                {/* Demo notice */}
                <p className="text-xs" style={{ color: 'var(--color-muted)', lineHeight: 1.65 }}>
                  <strong>Demo mode:</strong> This form demonstrates frontend validation only.
                  No data is sent to any server. In production, connect a form service such as
                  Formspree, Netlify Forms, or your own API.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary self-start"
                  style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
                  id="form-submit-btn"
                >
                  {loading ? 'Sending…' : 'Send Enquiry'}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
