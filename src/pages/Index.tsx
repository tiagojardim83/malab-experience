import { useEffect } from 'react';
import { SEOHelmet } from '@/components/SEOHelmet';
import { StickyNavigation } from '@/components/StickyNavigation';
import { HeroSection } from '@/components/HeroSection';
import { ArtistsSection } from '@/components/ArtistsSection';
import { AboutSection } from '@/components/AboutSection';
import { MissionSection } from '@/components/MissionSection';
import { VideoShowcaseSection } from '@/components/VideoShowcaseSection';
import { CEOSection } from '@/components/CEOSection';
import { ImpactSection } from '@/components/ImpactSection';
import { EventsSection } from '@/components/EventsSection';
import { ServicesSection, DifferentialsSection } from '@/components/ServicesSection';

import { SocialImpactSection } from '@/components/SocialImpactSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ParallaxDivider } from '@/components/ParallaxDivider';
import { BrandsMarquee } from '@/components/BrandsMarquee';

import parallax1 from '@/assets/parallax-12478598655.jpg.asset.json';
import parallax2 from '@/assets/parallax-12478859465.jpg.asset.json';
import parallax3 from '@/assets/parallax-12479367253.jpg.asset.json';
import parallax4 from '@/assets/parallax-band-trio.jpg.asset.json';
import parallax5 from '@/assets/parallax-12479621763.jpg.asset.json';

const Index = () => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section, #root section'));
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    sections.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.willChange = 'opacity, transform';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'none';
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SEOHelmet />
      <div className="min-h-screen bg-black">
        <StickyNavigation />
        <HeroSection />
        <AboutSection />
        <ParallaxDivider image={parallax2} alt="Performance ao vivo" position="center 15%" intensity={140} />
        <MissionSection />
        <VideoShowcaseSection />
        <CEOSection />
        <ParallaxDivider image={parallax4} alt="Banda em show ao vivo" position="center 40%" intensity={120} />
        <ImpactSection />
        <ParallaxDivider image={parallax1} alt="Cantora no palco" position="center 12%" intensity={130} />
        <EventsSection />
        
        <ServicesSection />
        <DifferentialsSection />
        <ParallaxDivider image={parallax3} alt="Artista no palco" position="center 12%" intensity={150} />

        <SocialImpactSection />
        <ParallaxDivider image={parallax5} alt="Artista cantando ao vivo" position="center 42%" intensity={60} />


        <BrandsMarquee />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
