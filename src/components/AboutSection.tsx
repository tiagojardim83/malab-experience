import { useEffect, useState } from 'react';
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
    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 2800);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="about" className="relative min-h-[100svh] overflow-hidden bg-black text-background">
      <div className="absolute inset-0">
        {slides.map((slide, slideIndex) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ${
              slideIndex === index ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.2)_32%,rgba(0,0,0,0.2)_58%,rgba(0,0,0,0.88)_100%)]" />
      </div>

      <div className="container relative z-10 flex min-h-[100svh] flex-col py-20 md:py-24 lg:py-28">
        <header className="max-w-6xl border-t border-background/35 pt-5">
          <p className="editorial-label text-secondary">Legado & visão</p>
          <h2 className="editorial-display mt-6 text-5xl leading-[0.9] text-background md:text-7xl lg:text-8xl">
            Quem somos: <span className="italic text-secondary">três décadas</span> de impacto.
          </h2>
        </header>

        <div className="mt-auto grid gap-10 pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <img
              data-motion-number
              src="/Selo_Malab.svg"
              alt="Selo Malab · Est. 1994"
              className="h-28 w-auto invert md:h-36"
            />
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-6 border-t border-background/25 pt-7 text-base leading-7 text-background/80 md:text-lg md:leading-8">
              <p>
                A <strong className="font-semibold text-background">Malab Produções</strong> nasce do olhar inquieto de{' '}
                <span className="font-semibold text-background">Aluizer Malab</span>, produtor cultural mineiro premiado que transformou seu sobrenome em sinônimo de inovação.
              </p>
              <p>
                De <strong className="font-semibold text-background">Elton John</strong> a{' '}
                <strong className="font-semibold text-background">Beyoncé</strong>, do{' '}
                <strong className="font-semibold text-background">Mercado Central</strong> ao{' '}
                <strong className="font-semibold text-background">Mineirão</strong>, criamos palcos onde a arte ecoa, a economia pulsa e o público se reconhece.
              </p>
            </div>

            <p className="mt-8 border-l-2 border-secondary pl-5 text-xs font-bold uppercase tracking-[0.2em] text-background/70">
              Minas Gerais · Brasil · Mundo
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-background/35 pt-5 sm:flex-row sm:items-end sm:justify-between md:mt-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-background/75 md:text-xs">Arquivo Malab</span>
          <div className="flex items-center gap-4">
            <div className="flex gap-2" aria-label="Selecionar imagem">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Ir para foto ${slideIndex + 1}`}
                  onClick={() => setIndex(slideIndex)}
                  className={`h-1 w-6 shrink-0 transition-colors sm:w-8 ${slideIndex === index ? 'bg-secondary' : 'bg-background/25'}`}
                />
              ))}
            </div>
            <span data-motion-number className="whitespace-nowrap font-display text-xl italic text-background/75">
              0{index + 1} / 05
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-background/20">
        <div className="container grid md:grid-cols-3">
          {values.map((value) => (
            <article key={value.n} className="border-b border-background/20 py-10 md:border-b-0 md:border-r md:px-8 md:py-14 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
              <span data-motion-number className="font-display text-5xl italic text-secondary">{value.n}</span>
              <h3 className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-background">{value.t}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-background/70">{value.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
