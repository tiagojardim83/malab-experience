import { ArrowUpRight } from 'lucide-react';
import { useSmoothScrollTo } from '@/hooks/use-smooth-scroll-to';

const footerLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'artistas', label: 'Artistas' },
  { id: 'about', label: 'Quem somos' },
  { id: 'impact', label: 'Impacto' },
  { id: 'eventos', label: 'Ingressos' },
  { id: 'services', label: 'Serviços' },
  { id: 'contact', label: 'Contato' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const smoothScrollTo = useSmoothScrollTo();

  const scrollToSection = (sectionId: string) => smoothScrollTo(`#${sectionId}`);

  return (
    <footer className="overflow-hidden bg-primary text-background">
      <div className="container pt-20 md:pt-28">
        <div className="grid gap-10 border-t border-background/25 pt-5 lg:grid-cols-12">
          <p className="editorial-label text-secondary lg:col-span-4">Vamos criar algo memorável</p>
          <div className="lg:col-span-8">
            <h2 className="editorial-display text-6xl leading-[0.82] md:text-8xl lg:text-[9rem]">Pronto para subir ao palco?</h2>
            <a href="mailto:aluizer@malab.com.br" className="site-cta mt-10 bg-secondary text-background hover:bg-background hover:text-primary">
              Iniciar uma colaboração <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="my-20 grid grid-cols-2 gap-10 border-y border-background/20 py-10 md:grid-cols-4 md:py-14">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">© Malab {currentYear}</p>
            <p className="mt-4 text-sm leading-6 text-background/60">Belo Horizonte, MG<br />Brasil</p>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Navegação</p>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {footerLinks.map((link) => (
                <li key={link.id}><button type="button" onClick={() => scrollToSection(link.id)} className="transition-colors hover:text-secondary">{link.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Contato</p>
            <a href="mailto:aluizer@malab.com.br" className="mt-4 block break-all text-sm text-background/70 transition-colors hover:text-secondary">aluizer@malab.com.br</a>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Social</p>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              <li><a href="https://www.instagram.com/malabproducoes/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary">Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/aluizermalab/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="relative left-1/2 flex w-screen -translate-x-1/2 items-center overflow-hidden border-y border-background/30 py-10 md:py-14">
          <div className="flex w-max min-w-max animate-marquee items-center whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} className="shrink-0 px-7 font-display text-[clamp(8rem,24vw,22rem)] leading-[0.78] tracking-[-0.07em] text-secondary md:px-12">MALAB ©</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 py-7 text-[9px] font-semibold uppercase tracking-[0.14em] text-background/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Malab Produções. Todos os direitos reservados.</p>
          <a href="https://www.tgarden.com.br/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary">Webdesign: TGARDEN_STUDIO</a>
        </div>
      </div>
    </footer>
  );
};
