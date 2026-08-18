import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useSmoothScrollTo } from '@/hooks/use-smooth-scroll-to';
import heroConcert from '@/assets/hero-concert.jpg';
import heroVideo from '@/assets/malab-hero.mp4.asset.json';

export const HeroSection = () => {
  const smoothScrollTo = useSmoothScrollTo();

  const scrollToEvents = () => smoothScrollTo('#eventos');
  const scrollToAbout = () => smoothScrollTo('#about');

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-black text-background">
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline poster={heroConcert} className="h-full w-full object-cover">
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.38)_52%,rgba(0,0,0,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.04)_45%,rgba(0,0,0,0.82)_100%)]" />
      </div>

      <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end pb-8 pt-32 md:pb-12 md:pt-40">
        <div className="mb-auto flex items-center justify-between border-t border-background/35 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-background/75 md:text-xs">
          <span>Produção cultural · desde <span data-motion-number>1994</span></span>
          <span className="hidden md:block">Belo Horizonte · Minas Gerais</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="editorial-label mb-6 text-secondary">Malab Produções</p>
            <h1 className="editorial-display max-w-6xl text-[clamp(3.65rem,9vw,9.5rem)] leading-[0.78] text-background">
              O palco onde <span className="italic text-secondary">Minas</span> encontra o mundo.
            </h1>
          </div>

          <div className="flex flex-col items-start border-l border-background/35 pl-6 lg:col-span-3 lg:mb-2">
            <p className="max-w-sm text-sm leading-relaxed text-background/80 md:text-base">
              Há quase três décadas, conectamos artistas, plateias e cidades inteiras a experiências inesquecíveis.
            </p>
            <button
              type="button"
              onClick={scrollToEvents}
              className="site-cta mt-7 bg-secondary text-background hover:bg-background hover:text-foreground"
            >
              Próximos eventos
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-between border-t border-background/35 pt-5 md:mt-14">
          <button
            type="button"
            onClick={scrollToAbout}
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-background/75 transition-colors hover:text-secondary"
          >
            Descubra a Malab
            <ArrowDown className="h-4 w-4" />
          </button>
          <span className="font-editorial text-2xl italic text-background/70 md:text-3xl">Cultura em movimento.</span>
        </div>
      </div>
    </section>
  );
};
