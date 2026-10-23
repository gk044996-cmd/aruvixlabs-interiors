import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import EditorialFeature from './components/EditorialFeature.jsx';
import DesignProcess from './components/DesignProcess.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import Testimonials from './components/Testimonials.jsx';
import ConsultationForm from './components/ConsultationForm.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ProjectModal from './components/ProjectModal.jsx';

export default function App() {
  const [activeModal, setActiveModal] = useState(null); // project object or null
  const [prefillService, setPrefillService] = useState('');

  const openProjectModal = useCallback((project) => {
    setActiveModal(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProjectModal = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = '';
  }, []);

  const scrollToContact = useCallback((service = '') => {
    setPrefillService(service);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal) closeProjectModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeProjectModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <Header onBookConsultation={() => scrollToContact()} />
      <main>
        <Hero onExploreProjects={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              onBookConsultation={() => scrollToContact()} />
        <About onContact={() => scrollToContact()} />
        <Services onServiceEnquiry={scrollToContact} />
        <Projects onViewProject={openProjectModal} />
        <EditorialFeature />
        <DesignProcess />
        <WhyChooseUs />
        <Testimonials />
        <ConsultationForm prefillService={prefillService} onPrefillConsumed={() => setPrefillService('')} />
        <FAQ />
      </main>
      <Footer onBookConsultation={() => scrollToContact()} />
      <ScrollToTop />
      {activeModal && (
        <ProjectModal project={activeModal} onClose={closeProjectModal} onEnquire={() => { closeProjectModal(); scrollToContact(activeModal.title); }} />
      )}
    </>
  );
}
