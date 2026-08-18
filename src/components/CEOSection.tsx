import aluizerPhoto from '@/assets/aluizer-malab.png.asset.json';

const highlights = [
  { k: 'Shows internacionais', v: 'Elton John · Beyoncé · Iron Maiden · Ed Sheeran' },
  { k: 'Bandas empresariadas', v: 'Pato Fu · Jota Quest' },
  { k: 'Setor público', v: 'Presidente da Belotur' },
  { k: 'Ministério do Turismo', v: 'Secretário Nacional de Desenvolvimento' },
];

export const CEOSection = () => {
  return (
    <section id="ceo" className="bg-background text-primary">
      <div className="container editorial-section">
        <header className="mb-14 max-w-6xl border-t border-primary/30 pt-5 md:mb-20">
          <p className="editorial-label text-secondary">Visão & liderança</p>
          <h2 className="editorial-display mt-6 text-5xl leading-[0.9] md:text-7xl lg:text-8xl">
            A mente por trás <span className="italic text-secondary">da Malab.</span>
          </h2>
        </header>

        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <figure className="h-full lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1.5rem] lg:h-full">
              <img src={aluizerPhoto.url} alt="Aluizer Malab - CEO e Fundador da Malab Produções" className="aspect-[4/5] w-full object-cover object-top lg:h-full lg:aspect-auto" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-primary p-6 text-background md:p-8">
                <p className="editorial-display text-3xl italic">Aluizer Malab</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">CEO & Fundador</p>
              </figcaption>
            </div>
          </figure>

          <div className="flex h-full flex-col lg:col-span-7">
            <blockquote className="border-l-2 border-secondary pl-6">
              <p className="editorial-quote text-3xl italic leading-tight md:text-5xl">
                “Mais de três décadas transformando a cena cultural de Minas Gerais em referência nacional.”
              </p>
            </blockquote>

            <div className="mt-10 space-y-5 text-base leading-7 text-primary/70 md:text-lg md:leading-8">
              <p>Um dos mais influentes produtores culturais de Minas Gerais, com uma trajetória dedicada à promoção e produção de eventos artísticos e musicais de grande porte.</p>
              <p>
                Graduado em <strong className="font-semibold text-primary">Economia e Administração de Empresas</strong>, iniciou sua carreira aproximando-se da cultura por meio do trabalho com o Giramundo Teatro de Bonecos.
              </p>
              <p>
                Como sócio-fundador da <strong className="font-semibold text-primary">Malab Produções</strong>, trouxe para Belo Horizonte grandes shows internacionais e criou festivais como o <strong className="font-semibold text-primary">Eletronika</strong>, em cartaz desde <span data-motion-number>1999</span>.
              </p>
            </div>

            <div className="mt-12 grid border-l border-t border-primary/25 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight.k} className="border-b border-r border-primary/25 p-6 md:p-8">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">{highlight.k}</p>
                  <p className="mt-3 text-sm leading-6 text-primary md:text-base">{highlight.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
