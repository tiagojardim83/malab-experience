import aluizerPhoto from "@/assets/aluizer-malab.png.asset.json";
import octopusMark from "@/assets/malab-octopus.png.asset.json";


export const CEOSection = () => {
  return (
    <section id="ceo" className="relative py-[4.5rem] md:py-24 bg-secondary text-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-16 flex items-start justify-between gap-8 animate-fade-in">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-foreground" />
                <span className="text-foreground font-semibold tracking-[0.2em] uppercase text-xs">
                  Visão & Liderança
                </span>
              </div>
              <h2 className="text-[30px] leading-[1.15] font-bold mb-3 md:text-6xl md:leading-[1.05] md:mb-4 text-foreground">
                A mente por trás <br />
                <span className="italic font-light text-foreground">da Malab.</span>
              </h2>
            </div>
            <div
              aria-label="Marca Malab"
              role="img"
              className="hidden md:block w-28 lg:w-36 aspect-square shrink-0 mt-2 bg-foreground hover:bg-background transition-colors duration-500 ease-out cursor-pointer"
              style={{
                WebkitMaskImage: `url(${octopusMark.url})`,
                maskImage: `url(${octopusMark.url})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />

          </div>


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Photo */}
            <div className="lg:col-span-5 animate-slide-up flex flex-col h-full">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 border border-foreground/30 translate-x-3 translate-y-3 rounded-2xl"
                />
                <img
                  src={aluizerPhoto.url}
                  alt="Aluizer Malab - CEO e Fundador da Malab Produções"
                  className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl ring-1 ring-foreground/20 grayscale"
                />
              </div>

              <div className="mt-auto pt-6 pl-1">
                <h3 className="text-2xl font-bold text-foreground">Aluizer Malab</h3>
                <p className="text-foreground/80 font-semibold tracking-wide uppercase text-xs mt-1">
                  CEO & Fundador
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-7 animate-slide-up flex flex-col h-full gap-6 md:gap-8 justify-between">

              <p className="text-xl leading-[1.5] font-light md:text-3xl md:leading-snug text-foreground/90 italic">
                "Mais de três décadas transformando a cena cultural de Minas Gerais
                em referência nacional."
              </p>

              <div className="space-y-5 text-base leading-[1.6] md:text-lg md:leading-relaxed text-foreground/75">
                <p>
                  Um dos mais influentes produtores culturais de Minas Gerais, com uma trajetória
                  dedicada à promoção e produção de eventos artísticos e musicais de grande porte.
                </p>
                <p>
                  Graduado em <strong className="text-foreground">Economia e Administração de Empresas</strong>,
                  iniciou sua carreira aproximando-se da cultura por meio do trabalho com o
                  Giramundo Teatro de Bonecos.
                </p>
                <p>
                  Como sócio-fundador da <strong className="text-foreground">Malab Produções</strong>,
                  trouxe para Belo Horizonte grandes shows internacionais e criou festivais como o{' '}
                  <strong className="text-foreground">Eletronika</strong>, em cartaz desde 1999.
                </p>
              </div>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-px bg-foreground/20 border border-foreground/20">
                {[
                  { k: 'Shows internacionais', v: 'Elton John · Beyoncé · Iron Maiden · Ed Sheeran' },
                  { k: 'Bandas empresariadas', v: 'Pato Fu · Jota Quest' },
                  { k: 'Setor público', v: 'Presidente da Belotur' },
                  { k: 'Ministério do Turismo', v: 'Secretário Nacional de Desenvolvimento' },
                ].map((h) => (
                  <div key={h.k} className="bg-secondary p-5">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 font-semibold">
                      {h.k}
                    </p>
                    <p className="text-sm md:text-base text-foreground mt-2 leading-snug">
                      {h.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
