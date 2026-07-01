import { ArrowRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative bg-primary text-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-8">
        {/* Top: Headline + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start mb-20 md:mb-28">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-background/60 mb-6">
              Vamos criar algo memorável.
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-background">
              Pronto para subir <br /> ao palco?
            </h2>
          </div>

          <div className="lg:justify-self-end lg:pt-24">
            <button
              onClick={() => scrollToSection('contact')}
              className="group inline-flex items-center gap-4 text-secondary border-b border-secondary/40 pb-2 hover:border-secondary transition-colors"
            >
              <span className="text-sm md:text-base uppercase tracking-[0.25em] font-semibold">
                Iniciar uma colaboração
              </span>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* Middle: Info columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
          {/* Copyright */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-background/50 mb-3">
              © Malab {currentYear}
            </p>
            <p className="text-background/70 text-sm">
              Belo Horizonte, MG <br /> Brasil
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-background/50 mb-3">
              Navegação
            </p>
            <ul className="space-y-1.5 text-sm">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'artistas', label: 'Artista' },
                { id: 'about', label: 'Quem Somos' },
                { id: 'impact', label: 'Impacto' },
                { id: 'eventos', label: 'Ingressos' },
                { id: 'services', label: 'Serviços' },
                { id: 'contact', label: 'Contato' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-background/80 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-background/50 mb-3">
              Contato
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a
                  href="mailto:Malab@malab.com.br"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  Malab@malab.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-background/50 mb-3">
              Social
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/malabproducoes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/aluizermalab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-secondary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized brand wordmark marquee */}
        <div className="relative -mx-6 md:-mx-10 mb-8 select-none pointer-events-none overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="font-bold tracking-tighter text-secondary leading-none shrink-0"
                style={{ fontSize: 'clamp(80px, 22vw, 360px)' }}
              >
                ©MALAB
              </span>
            ))}
          </div>
        </div>


        {/* Bottom bar */}
        <div className="border-t border-background/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-xs">
            © {currentYear} Malab Produções. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-background/50 hover:text-background transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-background/50 hover:text-background transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
