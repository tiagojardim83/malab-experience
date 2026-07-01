import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import servicesBg from '@/assets/services-bg-singer.jpg.asset.json';

const services = [
  {
    title: "Produção completa de turnês",
    result: "Do planejamento ao bis final",
    description: "Cada detalhe afinado para que o artista foque na arte.",
    features: ["Logística completa", "Equipe técnica especializada", "Gestão de cronograma", "Suporte 24h"]
  },
  {
    title: "Venue & Ticketing",
    result: "Casas cheias, experiências fluídas",
    description: "Tecnologia e hospitalidade em cada acesso.",
    features: ["Sistema de ingressos", "Gestão de capacidade", "Experiência do cliente", "Analytics em tempo real"]
  },
  {
    title: "Projetos de marca & conteúdo",
    result: "Conexão genuína com o público",
    description: "Quando a cultura encontra o branding, nasce conversa.",
    features: ["Brand experience", "Ativações de marca", "Conteúdo exclusivo", "Engajamento digital"]
  },
  {
    title: "Audiovisual & live-streaming",
    result: "Alcance sem fronteiras",
    description: "Expandimos o palco para qualquer tela.",
    features: ["Transmissão ao vivo", "Gravação profissional", "Múltiplas plataformas", "Interatividade"]
  }
];

const differentials = [
  {
    title: "Inovação que abre caminhos",
    description: "Produzimos shows em lugares improváveis, do aeroporto de Confins ao Mercado Novo."
  },
  {
    title: "Integração total",
    description: "Cenografia, logística, licenças, brand-experience e transmissão ao vivo em um único hub."
  },
  {
    title: "Rede de especialistas",
    description: "Mais de 1.500 fornecedores e parceiros certificados."
  },
  {
    title: "Impacto social alinhado",
    description: "A cada evento, ingressos sociais, arrecadação de alimentos e capacitação de profissionais locais."
  }
];

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: '900ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={[
        className,
        visible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-6 blur-[6px]',
      ].join(' ')}
    >
      {children}
    </div>
  );
};

interface RevealServiceProps {
  item: typeof services[number];
  index: number;
}

const RevealService = ({ item, index }: RevealServiceProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 80}ms`,
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: '900ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={[
        'group relative',
        visible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-10 blur-[6px]',
      ].join(' ')}
    >
      <div className="relative flex flex-col md:flex-row items-stretch rounded-2xl border border-background/60 overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
        {/* Left: title + tagline */}
        <div className="flex flex-col justify-center px-6 md:px-10 py-6 md:py-8 md:min-w-[320px] md:max-w-[360px]">
          <h3 className="text-xl leading-[1.2] md:text-3xl font-bold text-background leading-tight">
            {item.title}
          </h3>
          <span className="mt-2 text-base leading-[1.5] italic font-light text-secondary md:text-lg">
            {item.result}
          </span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-background/30 my-5" />
        <div className="md:hidden h-px bg-background/30 mx-5" />

        {/* Right: description + features */}
        <div className="flex flex-col justify-center px-6 md:px-10 py-6 md:py-8 flex-1 gap-4">
          <p className="text-lg leading-[1.5] font-light text-background tracking-tight italic md:text-2xl">
            "{item.description}"
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {item.features.map((feature, i) => (
              <li key={i} className="flex items-center text-base leading-[1.6] text-background/85">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3 shrink-0"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface RevealDifferentialProps {
  item: typeof differentials[number];
  index: number;
}

const RevealDifferential = ({ item, index }: RevealDifferentialProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 80}ms`,
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: '900ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={[
        'group relative',
        visible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-10 blur-[6px]',
      ].join(' ')}
    >
      <div className="relative flex items-stretch rounded-2xl border border-background/60 overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
        <div className="flex items-center px-6 md:px-10 py-6 md:py-8 min-w-[200px] md:min-w-[300px]">
          <h4 className="text-xl md:text-2xl font-bold text-background leading-tight">
            {item.title}
          </h4>
        </div>
        <div className="w-px bg-background/30 my-5" />
        <div className="flex items-center px-6 md:px-10 py-6 md:py-8 flex-1">
          <p className="text-base md:text-xl font-light text-background tracking-tight">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-[4.5rem] md:py-32 overflow-hidden bg-black"
    >
      {/* Background photo, full B&W */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-55"
        style={{
          backgroundImage: `url(${servicesBg.url})`,
          backgroundPosition: 'center 20%',
          filter: 'grayscale(100%) contrast(1.15) brightness(0.95)',
        }}
      />
      {/* Black & white gradient map overlay (shadows → highlights) */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'linear-gradient(135deg, hsl(0 0% 95%) 0%, hsl(0 0% 60%) 50%, hsl(0 0% 20%) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(0 0% 0% / 0.45) 0%, hsl(0 0% 0% / 0.8) 100%)',
        }}
      />
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-secondary/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[520px] rounded-full bg-accent/15 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <Reveal className="text-center mb-10 md:mb-16">
            <h2 className="text-[30px] leading-[1.15] font-bold mb-3 md:text-5xl md:mb-6 text-background">
              Serviços de Produção Cultural <br /> em Minas Gerais
            </h2>
            <p className="text-lg leading-[1.5] font-light text-background max-w-3xl mx-auto">
              Oferecemos soluções completas para eventos, shows e festivais. Da concepção
              à execução, transformamos ideias em experiências inesquecíveis.
            </p>
          </Reveal>

          {/* Services */}
          <div className="flex flex-col gap-5 md:gap-6 mb-20">
            {services.map((item, index) => (
              <RevealService key={index} item={item} index={index} />
            ))}
          </div>


          {/* CTA */}
          <Reveal className="text-center" delay={150}>
            <Button
              variant="hero"
              size="lg"
              className="text-base md:text-lg px-8"
              onClick={() => window.location.href = 'mailto:aluizer@malab.com.br'}
            >
              Vamos conversar
            </Button>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export const DifferentialsSection = () => {
  return (
    <section
      id="differentials"
      className="relative py-[4.5rem] md:py-32 overflow-hidden bg-[hsl(265_70%_18%)]"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[520px] rounded-full bg-accent/20 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-[30px] leading-[1.15] font-bold md:text-5xl text-background animate-fade-in">
              Como Fazemos a Diferença
            </h2>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            {differentials.map((item, index) => (
              <RevealDifferential key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
