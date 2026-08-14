import { SEOHelmet } from '@/components/SEOHelmet';
import { StickyNavigation } from '@/components/StickyNavigation';
import { ViewportMotion } from '@/components/ViewportMotion';
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
  return (
    <>
      <SEOHelmet />
      <div className="min-h-screen bg-black">
        <ViewportMotion />
        <StickyNavigation />
        <HeroSection />
        <AboutSection />
        <ArtistsSection />
        <MissionSection />
        <ParallaxDivider image={parallax2} alt="Performance ao vivo" position="center 15%" intensity={140} />
        <CEOSection />
        <ParallaxDivider image={parallax4} alt="Banda em show ao vivo" position="center 40%" intensity={120} />
        <ImpactSection />
        <ParallaxDivider image={parallax1} alt="Cantora no palco" position="center 12%" intensity={130} />
        <EventsSection />
        
        <ServicesSection />
        <VideoShowcaseSection />
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
