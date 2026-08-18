import { useEffect, useState } from 'react';
import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSmoothScrollTo } from '@/hooks/use-smooth-scroll-to';
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
  const smoothScrollTo = useSmoothScrollTo();

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const scroll = () => smoothScrollTo(`#${sectionId}`);

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scroll, 100);
    } else {
      scroll();
    }

    setIsMobileMenuOpen(false);
  };

  const foreground = isScrolled ? 'text-primary' : 'text-background';

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        isMobileMenuOpen
          ? 'border-background/20 bg-primary'
          : isScrolled
            ? 'border-primary/15 bg-background/95 backdrop-blur-md'
            : 'border-background/20 bg-transparent'
      }`}
    >
      <div className="container relative z-20 flex h-20 items-center justify-between md:h-24">
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
            isMobileMenuOpen
              ? 'border-background/40 text-background'
              : isScrolled
                ? 'border-primary/30 text-primary'
                : 'border-background/50 text-background'
          }`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span aria-hidden className="relative block h-4 w-5">
            <span className={`absolute left-0 top-1 block h-px w-5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`absolute bottom-1 left-0 block h-px w-5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-navigation" className="mobile-menu-panel fixed inset-0 z-10 bg-primary pt-20 text-background md:hidden">
          <div className="container flex h-full min-h-0 flex-col pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
            <div className="flex items-center justify-between border-t border-background/25 py-3">
              <p className="editorial-label text-secondary">Menu principal</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-background/45">Belo Horizonte · MG</p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col border-t border-background/25">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="mobile-menu-item group flex min-h-0 flex-1 items-center gap-4 border-b border-background/20 py-1 text-left"
                  style={{ animationDelay: `${80 + index * 45}ms` }}
                >
                  <span className="w-7 shrink-0 text-[9px] font-bold tracking-[0.16em] text-secondary">0{index + 1}</span>
                  <span className={`editorial-display flex-1 text-[clamp(1.55rem,7vw,2.15rem)] leading-none transition-colors group-hover:text-secondary ${activeSection === section.id ? 'text-secondary' : 'text-background'}`}>
                    {section.label}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-background/30 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary" strokeWidth={1.25} />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_auto] items-end gap-6 border-t border-background/25 pt-4">
              <div>
                <p className="editorial-label text-secondary">Siga a Malab</p>
                <div className="mt-3 flex items-center gap-5">
                  <a href="https://www.instagram.com/malabproducoes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-background transition-colors hover:text-secondary">
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                  <a href="https://www.linkedin.com/in/aluizermalab/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-background transition-colors hover:text-secondary">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>
              <p className="hidden font-editorial text-right text-xl italic leading-tight text-background/55 min-[390px]:block">Cultura em<br />movimento.</p>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
