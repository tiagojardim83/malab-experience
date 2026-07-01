import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import malabType from '@/assets/malab-type.png.asset.json';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'artistas', label: 'Artista' },
  { id: 'about', label: 'Quem Somos' },
  { id: 'impact', label: 'Impacto' },
  { id: 'eventos', label: 'Ingressos' },
  { id: 'services', label: 'Serviços' },
  { id: 'contact', label: 'Contato' }
];

export const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setIsVisible(scrollPosition > 50);

      // Find active section
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // route navigation removed (Blog) — only in-page sections remain
    

    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md backdrop-saturate-150 border-b border-white/5 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection('hero')} aria-label="Malab — Home" className="flex items-center">
            <span
              aria-hidden
              className="block h-8 w-24 bg-secondary"
              style={{
                WebkitMaskImage: `url(${malabType.url})`,
                maskImage: `url(${malabType.url})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
              }}
            />
          </button>


          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={`text-sm bg-transparent hover:bg-background/10 text-background hover:text-background ${activeSection === section.id ? 'underline underline-offset-4' : ''}`}
              >
                {section.label}
              </Button>
            ))}
          </div>

          
          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="sm" onClick={() => window.location.href = 'mailto:aluizer@malab.com.br'}>
              Fale Conosco
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="md:hidden text-background hover:bg-background/10 hover:text-background"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-b border-border/40 animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => scrollToSection(section.id)}
                  className="justify-start text-left w-full"
                >
                  {section.label}
                </Button>
              ))}
              <Button
                variant="hero"
                onClick={() => window.location.href = 'mailto:aluizer@malab.com.br'}
                className="w-full mt-4"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};