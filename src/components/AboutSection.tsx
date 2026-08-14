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
    <section id="about" className="relative overflow-hidden bg-background text-foreground">
      <div className="container py-20 md:py-24 lg:py-28">
        <header className="mb-12 max-w-6xl border-t border-primary/30 pt-5 md:mb-20">
          <p className="editorial-label text-secondary">Legado & visão</p>
          <h2 className="editorial-display mt-6 text-5xl leading-[0.9] text-primary md:text-7xl lg:text-8xl">
            Quem somos: <span className="italic text-secondary">três décadas</span> de impacto.
          </h2>
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-7">
            <div className="relative min-h-[34rem] overflow-hidden rounded-[1.5rem] md:min-h-[48rem]">
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
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5 pt-24 text-background md:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Arquivo Malab</span>
                <span data-motion-number className="font-display text-3xl italic">0{index + 1} / 05</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2" aria-label="Selecionar imagem">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Ir para foto ${slideIndex + 1}`}
                  onClick={() => setIndex(slideIndex)}
                  className={`h-1 flex-1 transition-colors ${slideIndex === index ? 'bg-secondary' : 'bg-primary/20'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between lg:col-span-5 lg:py-8">
            <div>
              <div data-motion-number className="mb-12 font-display text-[9rem] font-medium leading-[0.65] text-secondary md:text-[13rem]">30</div>
              <p className="editorial-quote mb-8 text-3xl italic leading-tight text-primary md:text-4xl">
                <span data-motion-number>30</span> anos transformando Minas Gerais no epicentro cultural do Brasil.
              </p>
              <div className="space-y-6 border-t border-primary/25 pt-7 text-base leading-7 text-primary/75 md:text-lg md:leading-8">
                <p>
                  A <strong className="font-semibold text-primary">Malab Produções</strong> nasce do olhar inquieto de{' '}
                  <span className="font-semibold text-primary">Aluizer Malab</span>, produtor cultural mineiro premiado que transformou seu sobrenome em sinônimo de inovação.
                </p>
                <p>
                  De <strong className="font-semibold text-primary">Elton John</strong> a{' '}
                  <strong className="font-semibold text-primary">Beyoncé</strong>, do{' '}
                  <strong className="font-semibold text-primary">Mercado Central</strong> ao{' '}
                  <strong className="font-semibold text-primary">Mineirão</strong>, criamos palcos onde a arte ecoa, a economia pulsa e o público se reconhece.
                </p>
              </div>
            </div>

            <p className="mt-12 border-l-2 border-secondary pl-5 text-xs font-bold uppercase tracking-[0.2em] text-primary/65">
              Minas Gerais · Brasil · Mundo
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary text-background">
        <div className="container grid md:grid-cols-3">
          {values.map((value) => (
            <article key={value.n} className="border-b border-background/20 py-10 md:border-b-0 md:border-r md:px-8 md:py-14 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
              <span data-motion-number className="font-display text-5xl italic text-secondary">{value.n}</span>
              <h3 className="mt-7 text-sm font-bold uppercase tracking-[0.18em]">{value.t}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-background/70">{value.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
