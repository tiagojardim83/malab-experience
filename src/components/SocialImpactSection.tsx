import { GraduationCap, Leaf, Ticket } from 'lucide-react';
import { CounterAnimation } from './CounterAnimation';

const impactAreas = [
  {
    title: 'Acesso & Inclusão',
    description: 'Mais de 5 mil ingressos gratuitos distribuídos anualmente para escolas públicas e projetos sociais.',
    icon: Ticket,
    statNumber: 5000,
    statSuffix: '+',
    statLabel: 'Ingressos sociais anuais',
  },
  {
    title: 'Sustentabilidade',
    description: 'Parcerias com cooperativas locais para reciclagem de resíduos pós-evento.',
    icon: Leaf,
    statNumber: 15,
    statSuffix: 't',
    statLabel: 'Resíduos reciclados',
  },
  {
    title: 'Fomento de Talentos',
    description: 'Oficinas de capacitação em backstage e produção cultural para jovens.',
    icon: GraduationCap,
    statNumber: 200,
    statSuffix: '+',
    statLabel: 'Jovens capacitados',
  },
];

export const SocialImpactSection = () => {
  return (
    <section className="bg-secondary text-background">
      <div className="container editorial-section">
        <header className="max-w-6xl border-t border-background/40 pt-5">
          <p className="editorial-label">Compromisso social</p>
          <div className="mt-6 grid items-end gap-7 lg:grid-cols-12">
            <h2 className="editorial-display text-5xl leading-[0.9] md:text-7xl lg:col-span-8 lg:text-8xl">Cultura que transforma.</h2>
            <p className="max-w-md text-sm leading-6 text-background/75 md:text-base lg:col-span-4 lg:pb-2">
              Nosso compromisso vai além do entretenimento. Cada evento é uma oportunidade de gerar impacto positivo na sociedade.
            </p>
          </div>
        </header>

        <div className="mt-14 grid border-l border-t border-background/35 md:mt-20 md:grid-cols-3">
          {impactAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <article key={area.title} className="flex min-h-[30rem] flex-col border-b border-r border-background/35 p-6 md:p-8 lg:p-10">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-background/55"><Icon className="h-5 w-5" strokeWidth={1.5} /></div>
                  <span data-motion-number className="text-[9px] font-bold uppercase tracking-[0.18em] text-background/55">0{index + 1}</span>
                </div>
                <h3 className="editorial-display mt-10 text-3xl leading-none md:text-4xl">{area.title}</h3>
                <p className="mt-5 text-sm leading-6 text-background/75">{area.description}</p>
                <div className="mt-auto border-t border-background/30 pt-7">
                  <CounterAnimation end={area.statNumber} suffix={area.statSuffix} duration={2200} className="editorial-display block text-5xl text-background md:text-6xl" />
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-background/60">{area.statLabel}</p>
                </div>
              </article>
            );
          })}
        </div>

        <blockquote className="ml-auto mt-14 max-w-4xl border-l-2 border-primary pl-6 md:mt-20 md:pl-8">
          <p className="editorial-quote text-2xl italic leading-tight md:text-4xl">
            “Cada evento é uma oportunidade de retribuir à comunidade que nos acolhe. A cultura transforma, e nós somos agentes dessa transformação.”
          </p>
          <cite className="mt-5 block text-[9px] font-bold not-italic uppercase tracking-[0.18em] text-background/65">— Aluizer Malab, Fundador</cite>
        </blockquote>
      </div>
    </section>
  );
};
