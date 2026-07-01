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
  { name: 'Governo de Minas', src: govMinas.url },
  { name: 'Copasa', src: copasa.url },
  { name: 'Palácio da Liberdade', src: palacio.url },
  { name: 'Codemge', src: codemge.url },
  { name: 'CDL Belo Horizonte', src: cdl.url },
  { name: 'Circuito Liberdade BH/MG', src: circuito.url },
  { name: 'Castas Importadora', src: castas.url },
  { name: 'Chivas Regal', src: chivas.url },
  { name: 'Estrella Galicia', src: estrella.url },
];

export const BrandsMarquee = () => {
  const loop = [...brands, ...brands];

  return (
    <section className="py-12 bg-primary text-primary-foreground overflow-hidden border-y border-secondary/30">
      <div className="container mx-auto px-4 mb-16 md:mb-20">
        <p className="text-center text-sm md:text-base uppercase tracking-[0.3em] text-secondary font-semibold whitespace-pre-line">
          MARCAS QUE JÁ&nbsp;{"\n"}CONFIARAM NA MALAB
        </p>
      </div>

      <div className="relative">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {loop.map((brand, i) => (
            <div key={i} className="flex items-center gap-16 shrink-0">
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                className="h-8 md:h-10 w-auto object-contain shrink-0"
              />
              <span className="text-secondary text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
