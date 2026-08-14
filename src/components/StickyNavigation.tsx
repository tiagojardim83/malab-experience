import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import malabType from '@/assets/malab-type.png.asset.json';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'artistas', label: 'Artistas' },
  { id: 'about', label: 'Quem somos' },
  { id: 'impact', label: 'Impacto' },
  { id: 'eventos', label: 'Ingressos' },
  { id: 'services', label: 'Serviços' },
  { id: 'contact', label: 'Contato' },
];

export const StickyNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      setIsScrolled(window.scrollY > 24);

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const scroll = () => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scroll, 100);
    } else {
      scroll();
    }

    setIsMobileMenuOpen(false);
  };

  const foreground = isScrolled || isMobileMenuOpen ? 'text-primary' : 'text-background';

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'border-primary/15 bg-background/95 backdrop-blur-md'
          : 'border-background/20 bg-transparent'
      }`}
    >
      <div className="container flex h-20 items-center justify-between md:h-24">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          aria-label="Malab — início"
          className="relative z-10 flex items-center"
        >
          <span
            aria-hidden
            className="block h-8 w-28 bg-secondary transition-colors duration-500"
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

        <div className="hidden items-center gap-7 lg:flex">
          {sections.slice(1, -1).map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`relative py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${foreground} ${
                activeSection === section.id
                  ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-secondary'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <a
          href="mailto:aluizer@malab.com.br"
          className={`hidden items-center gap-3 border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors md:inline-flex ${
            isScrolled
              ? 'border-primary bg-primary text-background hover:border-secondary hover:bg-secondary'
              : 'border-background/70 text-background hover:border-secondary hover:bg-secondary'
          }`}
        >
          Fale conosco
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className={`relative z-10 inline-flex h-11 w-11 items-center justify-center border md:hidden ${
            isScrolled || isMobileMenuOpen ? 'border-primary/30 text-primary' : 'border-background/50 text-background'
          }`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-navigation" className="border-t border-primary/15 bg-background lg:hidden">
          <div className="container py-6">
            <div className="flex flex-col">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center justify-between border-b border-primary/15 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em] text-primary"
                >
                  <span>{section.label}</span>
                  <span data-motion-number data-motion-visible="true" className="font-display text-2xl font-medium text-secondary">0{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
