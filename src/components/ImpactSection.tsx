import { CounterAnimation } from './CounterAnimation';
import impactBg from '@/assets/impact-crowd.jpg.asset.json';

const impactData = [
  { number: 28, suffix: '', label: 'ANOS', sub: 'de História', description: 'Construindo legados culturais' },
  { number: 350, suffix: '+', label: 'SHOWS', sub: 'Produzidos', description: 'Experiências inesquecíveis' },
  { number: 2.5, suffix: 'M+', label: 'PESSOAS', sub: 'Impactadas', description: 'Vidas tocadas pela música' },
  { number: 1500, suffix: '+', label: 'PARCEIROS', sub: 'Fornecedores', description: 'Rede de parceiros certificados' },
  { number: 45, suffix: '+', label: 'CIDADES', sub: 'Alcance Nacional', description: 'Presença em todo o Brasil' },
  { number: 5000, suffix: '+', label: 'INGRESSOS', sub: 'Sociais', description: 'Distribuídos anualmente' },
];

export const ImpactSection = () => {
  return (
    <section id="impact" className="bg-primary text-background">
      <div className="container editorial-section">
        <header className="mb-14 max-w-6xl border-t border-background/30 pt-5 md:mb-20">
          <p className="editorial-label text-secondary">Nosso alcance</p>
          <h2 className="editorial-display mt-6 text-5xl leading-[0.9] md:text-7xl lg:text-8xl">Impacto em números.</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-background/70 md:text-lg">
            Nosso impacto vai além das luzes do palco: ele movimenta cidades, inspira pessoas e gera oportunidades.
          </p>
        </header>

        <div className="grid items-stretch border-l border-t border-background/25 lg:grid-cols-12">
          <figure className="min-h-[34rem] border-b border-r border-background/25 p-4 lg:col-span-5 lg:min-h-full md:p-5">
            <div className="relative h-full min-h-[32rem] overflow-hidden rounded-[1.5rem]">
              <img src={impactBg.url} alt="Público reunido em um grande evento" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <p className="editorial-quote text-3xl italic leading-tight md:text-4xl">Cada número representa histórias, conexões e momentos únicos.</p>
                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">Cultura em movimento</p>
              </figcaption>
            </div>
          </figure>

          <div className="grid sm:grid-cols-2 lg:col-span-7">
            {impactData.map((item) => (
              <article key={item.label} className="flex min-h-64 flex-col border-b border-r border-background/25 p-6 md:min-h-72 md:p-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-secondary">{item.label}</p>
                <CounterAnimation end={item.number} suffix={item.suffix} duration={2200} className="editorial-display mt-6 block text-5xl leading-none text-background md:text-7xl" />
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-secondary">{item.sub}</p>
                <p className="mt-auto max-w-xs pt-8 text-sm leading-6 text-background/60">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
