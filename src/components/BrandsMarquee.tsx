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
    <section className="overflow-hidden border-y border-primary/25 bg-background py-14 text-primary md:py-20">
      <div className="container mb-12 max-w-6xl border-t border-primary/30 pt-5 md:mb-16">
        <p className="editorial-label text-secondary">Parcerias</p>
        <h2 className="editorial-display mt-6 text-4xl leading-none md:text-6xl">Marcas que já confiaram na Malab.</h2>
      </div>

      <div className="flex w-max animate-marquee items-center">
        {loop.map((brand, index) => (
          <div key={`${brand.name}-${index}`} className="flex shrink-0 items-center gap-10 px-8 md:gap-16 md:px-12">
            <img src={brand.src} alt={brand.name} loading="lazy" className="h-10 w-auto max-w-48 object-contain opacity-75 brightness-0 transition-opacity hover:opacity-100 md:h-14 md:max-w-60" />
            <span aria-hidden className="font-display text-4xl font-black text-black">×</span>
          </div>
        ))}
      </div>
    </section>
  );
};
