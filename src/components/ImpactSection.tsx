import { useEffect, useRef, useState } from 'react';
import { CounterAnimation } from './CounterAnimation';
import impactBg from '@/assets/impact-crowd.jpg.asset.json';


const impactData = [
  {
    number: 28,
    suffix: "",
    label: "ANOS",
    sub: "de História",
    description: "Construindo legados culturais"
  },
  {
    number: 350,
    suffix: "+",
    label: "SHOWS",
    sub: "Produzidos",
    description: "Experiências inesquecíveis"
  },
  {
    number: 2.5,
    suffix: "M+",
    label: "PESSOAS",
    sub: "Impactadas",
    description: "Vidas tocadas pela música"
  },
  {
    number: 1500,
    suffix: "+",
    label: "PARCEIROS",
    sub: "Fornecedores",
    description: "Rede de parceiros certificados"
  },
  {
    number: 45,
    suffix: "+",
    label: "CIDADES",
    sub: "Alcance Nacional",
    description: "Presença em todo o Brasil"
  },
  {
    number: 5000,
    suffix: "+",
    label: "INGRESSOS",
    sub: "Sociais",
    description: "Distribuídos anualmente"
  }
];

interface RevealRowProps {
  item: typeof impactData[number];
  index: number;
}

const RevealRow = ({ item, index }: RevealRowProps) => {
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
      <div
        className="relative flex items-stretch rounded-2xl border border-background/60 overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]"
      >


        {/* Left: number */}
        <div className="flex flex-col items-start justify-center px-6 md:px-10 py-6 md:py-8 min-w-[180px] md:min-w-[260px]">
          <div className="leading-none">
            <CounterAnimation end={item.number} suffix={item.suffix} duration={2200} />
          </div>
          <span className="mt-1 text-base md:text-lg italic font-light text-background/85">
            {item.sub}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px bg-background/30 my-5" />

        {/* Right: description */}
        <div className="flex items-center px-6 md:px-10 py-6 md:py-8 flex-1">
          <p className="text-xl md:text-3xl font-light text-background tracking-tight">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ImpactSection = () => {
  return (
    <section
      id="impact"
      className="relative py-24 md:py-32 overflow-hidden bg-[hsl(265_65%_10%)]"
    >
      {/* Background photo, desaturated */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url(${impactBg.url})`,
          filter: 'grayscale(100%) contrast(1.05)',
        }}
      />
      {/* Purple gradient map overlay (duotone-like) */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color"
        style={{
          background:
            'linear-gradient(135deg, hsl(280 80% 35%) 0%, hsl(265 85% 28%) 50%, hsl(250 90% 18%) 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'linear-gradient(180deg, hsl(265 70% 15% / 0.55) 0%, hsl(265 75% 8% / 0.85) 100%)',
        }}
      />
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[520px] rounded-full bg-accent/15 blur-3xl" />


      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-background">
              Impacto em Números
            </h2>
            <p className="text-lg md:text-xl font-light text-background max-w-3xl mx-auto">
              Nosso impacto vai além das luzes do palco: ele movimenta cidades,
              inspira pessoas e gera oportunidades.
            </p>

          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            {impactData.map((item, index) => (
              <RevealRow key={index} item={item} index={index} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-base md:text-lg text-background/70 font-light">
              Cada número representa histórias, conexões e momentos únicos que criamos juntos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
