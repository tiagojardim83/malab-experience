import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import artistCrowd from '@/assets/artist-crowd.jpg.asset.json';
import artistAcoustic from '@/assets/artist-acoustic.jpg.asset.json';
import artistRock from '@/assets/artist-rock.jpg.asset.json';
import artistRed from '@/assets/artist-red.jpg.asset.json';
import artistSinger from '@/assets/artist-singer.jpg.asset.json';

const slides = [
  { src: artistRed.url, alt: 'Artista em apresentação com figurino vermelho' },
  { src: artistRock.url, alt: 'Show de rock com iluminação cênica intensa' },
  { src: artistCrowd.url, alt: 'Público lotado em grande festival' },
  { src: artistAcoustic.url, alt: 'Artista solo com violão no palco' },
  { src: artistSinger.url, alt: 'Cantora em performance ao vivo' },
];

const values = [
  { n: '01', t: 'Inovação', d: 'Transformamos lugares impossíveis em palcos memoráveis.' },
  { n: '02', t: 'Excelência', d: 'Cada detalhe é pensado para garantir a perfeição do evento.' },
  { n: '03', t: 'Impacto', d: 'Geramos valor econômico e social em cada produção.' },
];

export const AboutSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="relative bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch relative">
          {/* Watermark "30" */}
          <div
            aria-hidden
            className="pointer-events-none select-none absolute -top-16 -right-6 text-[14rem] md:text-[20rem] font-black leading-none text-foreground/10 -z-0"
          >
            30
          </div>

          {/* Left column: Narrative */}
          <div className="lg:col-span-7 relative z-10 text-foreground flex flex-col justify-between gap-10 h-full">
            <header className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-4">
                <span className="h-[2px] w-12 bg-foreground" />
                <span className="text-foreground font-semibold tracking-[0.2em] uppercase text-xs">
                  Legado & Visão
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-[1.05] text-foreground">
                Quem Somos: <br />
                <span className="italic font-light">Três décadas</span> de impacto.
              </h2>
            </header>

            <div className="space-y-6 text-lg leading-relaxed text-foreground/90 max-w-2xl animate-slide-up">
              <p className="text-xl italic text-foreground font-medium">
                30 anos transformando Minas Gerais no epicentro cultural do Brasil.
              </p>
              <p>
                A <strong className="text-foreground">Malab Produções</strong> nasce do olhar inquieto de{' '}
                <span className="text-foreground font-semibold underline decoration-foreground/60 decoration-[3px] underline-offset-4">
                  Aluizer Malab
                </span>
                , produtor cultural mineiro premiado que transformou seu sobrenome em sinônimo de inovação.
              </p>
              <p>
                De <strong className="text-foreground">Elton John</strong> a{' '}
                <strong className="text-foreground">Beyoncé</strong>, do{' '}
                <strong className="text-foreground">Mercado Central</strong> ao{' '}
                <strong className="text-foreground">Mineirão</strong>, criamos palcos onde a arte ecoa, a
                economia pulsa e o público se reconhece.
              </p>
            </div>
          </div>


          {/* Right column: Carousel */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/40">
              {slides.map((s, i) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-700 ease-in-out ${
                    i === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir para foto ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? 'w-6 bg-background' : 'w-1.5 bg-background/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* Decorative offset frame */}
            <div
              aria-hidden
              className="absolute inset-0 border border-secondary/30 translate-x-3 translate-y-3 -z-10 rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Values band */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {values.map((v, i) => (
              <div
                key={v.n}
                className="group flex gap-5 items-start transition-transform duration-300 ease-out hover:scale-105 cursor-default animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="shrink-0 inline-flex items-center justify-center w-16 h-16 border-2 border-secondary text-secondary text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-110">
                  {v.n}
                </span>
                <div>
                  <h4 className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase">
                    {v.t}
                  </h4>
                  <p className="text-primary-foreground/80 text-sm md:text-base mt-1 max-w-xs">
                    {v.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
