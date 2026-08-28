import govMinas from '@/assets/brand-gov-minas.png.asset.json';
import copasa from '@/assets/brand-copasa-gov.png.asset.json';
import palacio from '@/assets/brand-palacio-liberdade.png.asset.json';
import codemge from '@/assets/brand-codemge.png.asset.json';
import cdl from '@/assets/brand-cdl-bh.png.asset.json';
import circuito from '@/assets/brand-circuito-liberdade.png.asset.json';
import castas from '@/assets/brand-castas.png.asset.json';
import chivas from '@/assets/brand-chivas-regal.png.asset.json';
import estrella from '@/assets/brand-estrella-galicia.png.asset.json';

const brands = [
  { name: 'Governo de Minas', src: govMinas.url, markClass: 'w-[72%]' },
  { name: 'Copasa', src: copasa.url, markClass: 'w-[96%]' },
  { name: 'Palácio da Liberdade', src: palacio.url, markClass: 'w-[65%]' },
  { name: 'Codemge', src: codemge.url, markClass: 'w-[88%]' },
  { name: 'CDL Belo Horizonte', src: cdl.url, markClass: 'w-[82%]' },
  { name: 'Circuito Liberdade BH/MG', src: circuito.url, markClass: 'w-[68%]' },
  { name: 'Castas Importadora', src: castas.url, markClass: 'h-[70%] w-auto' },
  { name: 'Chivas Regal', src: chivas.url, markClass: 'h-[82%] w-auto' },
  { name: 'Estrella Galicia', src: estrella.url, markClass: 'h-[82%] w-auto' },
];

export const BrandsMarquee = () => {
  return (
    <section className="overflow-hidden border-y border-primary/25 bg-background py-20 text-primary md:py-32">
      <div className="container">
        <header className="mb-14 max-w-6xl border-t border-primary/30 pt-5 md:mb-20">
          <p className="editorial-label text-secondary">Parcerias</p>
          <h2 className="editorial-display mt-6 text-4xl leading-none md:text-6xl">Marcas que já confiaram na Malab.</h2>
        </header>
      </div>

      <div className="brands-carousel pl-5 md:pl-8">
        <div className="brand-carousel-track flex w-max">
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} aria-hidden={copyIndex === 1 ? true : undefined} className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6">
              {brands.map((brand, index) => (
                <article key={`${copyIndex}-${brand.name}`} className="group relative flex aspect-square w-[72vw] max-w-[19rem] shrink-0 items-center justify-center border border-primary/25 bg-background p-8 sm:w-[48vw] md:w-96 md:max-w-none md:p-12 lg:w-[27rem]">
                  <span className="absolute left-5 top-5 text-[8px] font-bold tracking-[0.16em] text-primary/35 md:left-7 md:top-7">0{index + 1}</span>
                  <div className="flex h-24 w-full items-center justify-center md:h-28">
                    <img
                      src={brand.src}
                      alt={copyIndex === 0 ? brand.name : ''}
                      loading="lazy"
                      className={`max-h-full max-w-full object-contain opacity-75 brightness-0 transition-[opacity,transform] duration-300 group-hover:scale-[1.035] group-hover:opacity-100 ${brand.markClass}`}
                    />
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
