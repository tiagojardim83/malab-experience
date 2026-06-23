import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Leaf, GraduationCap } from 'lucide-react';
import { CounterAnimation } from './CounterAnimation';
import socialImpactImg from '@/assets/social-impact.jpg';

interface RevealCardProps {
  area: {
    title: string;
    description: string;
    icon: typeof Ticket;
    statNumber: number;
    statSuffix: string;
    statLabel: string;
  };
  index: number;
}

const RevealCard = ({ area, index }: RevealCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = area.icon;

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
        transitionDelay: `${index * 120}ms`,
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: '900ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-[6px]'}
    >
      <Card className="bg-transparent border-2 border-[#F5E6CC] rounded-2xl shadow-none hover:bg-[#F5E6CC]/10 transition-colors h-full">
        <CardContent className="p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-[#F5E6CC]/60 text-[#F5E6CC]">
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <span className="text-3xl md:text-4xl font-bold text-[#F5E6CC] tracking-tight">
              {visible && (
                <CounterAnimation end={area.statNumber} suffix={area.statSuffix} duration={2200} className="text-3xl md:text-4xl font-bold text-[#F5E6CC] tracking-tight" />
              )}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#F5E6CC]">
            {area.title}
          </h3>
          <p className="text-[#F5E6CC]/85 leading-relaxed mb-4">
            {area.description}
          </p>
          <p className="mt-auto text-xs uppercase tracking-[0.2em] text-[#F5E6CC]/70 font-semibold">
            {area.statLabel}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const impactAreas = [
  {
    title: "Acesso & Inclusão",
    description: "Mais de 5 mil ingressos gratuitos distribuídos anualmente para escolas públicas e projetos sociais.",
    icon: Ticket,
    statNumber: 5000,
    statSuffix: "+",
    statLabel: "Ingressos sociais anuais",
  },
  {
    title: "Sustentabilidade",
    description: "Parcerias com cooperativas locais para reciclagem de resíduos pós-evento.",
    icon: Leaf,
    statNumber: 15,
    statSuffix: "t",
    statLabel: "Resíduos reciclados",
  },
  {
    title: "Fomento de Talentos",
    description: "Oficinas de capacitação em backstage e produção cultural para jovens.",
    icon: GraduationCap,
    statNumber: 200,
    statSuffix: "+",
    statLabel: "Jovens capacitados",
  },
];


export const SocialImpactSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#F25C2A] via-[#E8451F] to-[#C2410C]">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <img 
          src={socialImpactImg} 
          alt="Impacto social da Malab"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#F5E6CC]">
              Cultura que Transforma
            </h2>
            <p className="text-xl text-[#F5E6CC]/90 max-w-3xl mx-auto">
              Nosso compromisso vai além do entretenimento. Cada evento é uma oportunidade 
              de gerar impacto positivo na sociedade.
            </p>
          </div>


          {/* Impact Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {impactAreas.map((area, index) => (
              <RevealCard key={index} area={area} index={index} />
            ))}
          </div>

          {/* Quote */}
          <div className="text-center mt-4 animate-fade-in">
            <blockquote className="text-xl italic text-[#F5E6CC]/90 max-w-2xl mx-auto">
              "Cada evento é uma oportunidade de retribuir à comunidade que nos acolhe.
              A cultura transforma, e nós somos agentes dessa transformação."
            </blockquote>
            <cite className="block mt-4 text-[#F5E6CC] font-semibold">
              — Aluizer Malab, Fundador
            </cite>
          </div>


        </div>
      </div>
    </section>
  );
};