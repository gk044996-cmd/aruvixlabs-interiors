import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    id: 'faq-1',
    question: 'How does the interior design process work?',
    answer:
      'Our process moves through four stages: Discover (understanding your brief), Plan (developing a spatial and material concept), Design (refining all details into a complete design), and Deliver (presenting the finished design package). Each stage is completed collaboratively with you before we move forward.',
  },
  {
    id: 'faq-2',
    question: 'Can I request a consultation?',
    answer:
      'Yes — use the contact form on this page to send us your details and project information. We will review your brief and get in touch to arrange an initial conversation. There is no obligation at the consultation stage.',
  },
  {
    id: 'faq-3',
    question: 'Can the design be customised to my preferences?',
    answer:
      'Every project we work on is bespoke. We do not use template designs or reuse the same concept for different clients. Your design is developed specifically around your home, your lifestyle, and your personal aesthetic preferences.',
  },
  {
    id: 'faq-4',
    question: 'Can I discuss my budget before starting?',
    answer:
      'Absolutely. Budget is an important part of the initial conversation. We would rather understand your budget early so that we can shape the design approach accordingly — being honest about what is achievable within a given range.',
  },
  {
    id: 'faq-5',
    question: 'What information should I prepare for a consultation?',
    answer:
      'It helps to have the approximate size of the space, your property type (apartment, house, etc.), a sense of your budget, any images or references that appeal to you, and a clear idea of the practical requirements — such as storage needs, how many people live in the home, and your daily routines.',
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        id={`${item.id}-trigger`}
        className="faq-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${item.id}-content`}
      >
        <span>{item.question}</span>
        <span className="flex-shrink-0" style={{ color: 'var(--color-bronze)' }}>
          {open ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${item.id}-content`}
            role="region"
            aria-labelledby={`${item.id}-trigger`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="faq-content">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-24 lg:py-32"
      style={{ background: 'var(--color-cream)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Heading */}
          <div className="lg:col-span-2">
            <p className="eyebrow mb-3">Questions</p>
            <div className="divider" />
            <h2 className="section-heading mb-4">Frequently Asked</h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Some questions we are commonly asked before a first consultation.
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-3">
            {FAQS.map((item) => (
              <FAQItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
