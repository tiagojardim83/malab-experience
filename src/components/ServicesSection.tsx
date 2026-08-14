import { ArrowUpRight } from 'lucide-react';
import servicesBg from '@/assets/services-bg-singer.jpg.asset.json';

const services = [
  {
    title: 'Produção completa de turnês',
    result: 'Do planejamento ao bis final',
    description: 'Cada detalhe afinado para que o artista foque na arte.',
    features: ['Logística completa', 'Equipe técnica especializada', 'Gestão de cronograma', 'Suporte 24h'],
  },
  {
    title: 'Venue & Ticketing',
    result: 'Casas cheias, experiências fluídas',
    description: 'Tecnologia e hospitalidade em cada acesso.',
    features: ['Sistema de ingressos', 'Gestão de capacidade', 'Experiência do cliente', 'Analytics em tempo real'],
  },
  {
    title: 'Projetos de marca & conteúdo',
    result: 'Conexão genuína com o público',
    description: 'Quando a cultura encontra o branding, nasce conversa.',
    features: ['Brand experience', 'Ativações de marca', 'Conteúdo exclusivo', 'Engajamento digital'],
  },
  {
    title: 'Audiovisual & live-streaming',
    result: 'Alcance sem fronteiras',
    description: 'Expandimos o palco para qualquer tela.',
    features: ['Transmissão ao vivo', 'Gravação profissional', 'Múltiplas plataformas', 'Interatividade'],
  },
];

const differentials = [
  { title: 'Inovação que abre caminhos', description: 'Produzimos shows em lugares improváveis, do aeroporto de Confins ao Mercado Novo.' },
  { title: 'Integração total', description: 'Cenografia, logística, licenças, brand-experience e transmissão ao vivo em um único hub.' },
  { title: 'Rede de especialistas', description: 'Mais de 1.500 fornecedores e parceiros certificados.' },
  { title: 'Impacto social alinhado', description: 'A cada evento, ingressos sociais, arrecadação de alimentos e capacitação de profissionais locais.' },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="bg-black text-background">
      <div className="relative flex min-h-[72vh] items-end overflow-hidden">
        <img src={servicesBg.url} alt="Cantora em apresentação produzida pela Malab" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[center_20%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10" />
        <div className="container relative z-10 pb-10 md:pb-16">
          <div className="border-t border-background/35 pt-5">
            <p className="editorial-label text-secondary">O que fazemos</p>
            <h2 className="editorial-display mt-6 text-[clamp(1.35rem,7.2vw,8rem)] leading-[0.86]">
              <span className="block whitespace-nowrap">Serviços de produção</span>
              <span className="block whitespace-nowrap">cultural em MG.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-background/75 md:text-lg">
              Oferecemos soluções completas para eventos, shows e festivais. Da concepção à execução, transformamos ideias em experiências inesquecíveis.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="border-t border-background/30">
          {services.map((service, index) => (
            <article key={service.title} className="group grid gap-y-8 border-b border-background/30 py-9 md:py-12 lg:grid-cols-12 lg:items-start lg:gap-x-8">
              <div className="flex items-center justify-between lg:col-span-1 lg:block">
                <span data-motion-number className="font-display text-4xl italic text-secondary">0{index + 1}</span>
                <ArrowUpRight className="h-5 w-5 text-background/35 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 lg:mt-8" strokeWidth={1} />
              </div>

              <div className="lg:col-span-4">
                <h3 className="editorial-display max-w-md text-3xl leading-none md:text-4xl">{service.title}</h3>
                <p className="mt-4 max-w-md font-editorial text-2xl italic leading-tight text-secondary">{service.result}</p>
              </div>

              <p className="max-w-sm text-sm leading-7 text-background/65 lg:col-span-3">“{service.description}”</p>

              <ul className="grid gap-x-6 gap-y-3 border-t border-background/20 pt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-background/70 sm:grid-cols-2 lg:col-span-4 lg:border-t-0 lg:pt-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 before:mt-1.5 before:h-1 before:w-1 before:shrink-0 before:bg-secondary">{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-end md:mt-16">
          <a href="mailto:aluizer@malab.com.br" className="inline-flex items-center gap-2 bg-secondary px-6 py-4 text-[9px] font-bold uppercase tracking-[0.14em] text-background transition-colors hover:bg-background hover:text-primary">
            Vamos conversar <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export const DifferentialsSection = () => {
  return (
    <section id="differentials" className="bg-background text-primary">
      <div className="container editorial-section">
        <header className="mb-14 max-w-6xl border-t border-primary/30 pt-5 md:mb-20">
          <p className="editorial-label text-secondary">Método Malab</p>
          <h2 className="editorial-display mt-6 text-5xl leading-[0.9] md:text-7xl lg:text-8xl">Como fazemos a diferença.</h2>
        </header>

        <div className="grid border-l border-t border-primary/25 md:grid-cols-2">
          {differentials.map((item, index) => (
            <article key={item.title} className="min-h-72 border-b border-r border-primary/25 p-6 md:p-10">
              <span data-motion-number className="font-display text-5xl italic text-secondary">0{index + 1}</span>
              <h3 className="editorial-display mt-9 text-3xl leading-none md:text-4xl">{item.title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-primary/65 md:text-base">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
