import { useState } from 'react';
import { MapPin, Clock, Ticket, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import mariaRita from '@/assets/event-maria-rita.jpg.asset.json';
import viradaLiberdade from '@/assets/event-virada-liberdade.png.asset.json';
import martinhoMartnalia from '@/assets/event-martinho.png.asset.json';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: 'Maria Rita - Redescobrir Vol. 2',
      location: 'BeFly Hall · Belo Horizonte',
      time: '18.09',
      price: 'Symplá',
      description: '18.09 · BeFly Hall · BH. Maria Rita apresenta o show Redescobrir Vol. 2, uma celebração ao legado da MPB.',
      image: mariaRita.url,
      link: 'https://bileto.sympla.com.br/event/121295/d/388100',
      ctaLabel: 'Compre agora',
    },
    {
      id: 2,
      title: 'Martinho & Mart\u2019nália',
      location: 'Arena Hall · BH/MG',
      time: '04.SET · 21h30',
      price: 'Symplá',
      description: '04.SET · 21h30 · Arena Hall · BH/MG. Uma noite única com dois ícones do samba brasileiro.',
      image: martinhoMartnalia.url,
      link: 'https://bileto.sympla.com.br/event/120119/d/382999',
      ctaLabel: 'Compre agora',
    },
    {
      id: 3,
      title: 'Virada da Liberdade',
      location: 'Praça da Liberdade · BH/MG',
      time: '31.12 · 18h',
      price: 'Gratuito',
      description: '31.12 · 18h · Praça da Liberdade · BH/MG. Virada da Liberdade com Biquíni, Juarez Moreira, Lagum, Aline Calixto e Pé de Sonho.',
      image: viradaLiberdade.url,
      link: 'https://www.instagram.com/viradadaliberdadeoficial/',
      done: true,
    },
  ];

  // Center index in the events array — the carousel pivot.
  const [centerIdx, setCenterIdx] = useState(
    Math.min(1, events.length - 1),
  );

  const total = events.length;
  const wrap = (i: number) => ((i % total) + total) % total;
  const visible = [
    events[wrap(centerIdx - 1)],
    events[wrap(centerIdx)],
    events[wrap(centerIdx + 1)],
  ];
  const canCycle = total > 3;

  const handlePrev = () => setCenterIdx((i) => wrap(i - 1));
  const handleNext = () => setCenterIdx((i) => wrap(i + 1));

  return (
    <section id="eventos" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Próximos Eventos em Belo Horizonte
          </h2>
          <p className="text-xl font-light text-primary-foreground/80 max-w-3xl mx-auto">
            Agenda atualizada dos melhores eventos culturais e shows em Minas Gerais.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Evento anterior"
            disabled={!canCycle}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-40 h-11 w-11 rounded-full bg-background/95 text-primary shadow-lg ring-1 ring-primary/20 flex items-center justify-center transition hover:scale-105 hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo evento"
            disabled={!canCycle}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-40 h-11 w-11 rounded-full bg-background/95 text-primary shadow-lg ring-1 ring-primary/20 flex items-center justify-center transition hover:scale-105 hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start px-10 md:px-0">
            {visible.map((event, idx) => {
              const featured = idx === 1;
              return (
                <article
                  key={`${event.id}-${idx}`}
                  className={`group relative rounded-2xl overflow-hidden bg-card border transition-all duration-500 hover:-translate-y-2 ${
                    featured
                      ? 'shadow-2xl ring-1 ring-primary/40 border-primary/30 z-30 md:-translate-y-10'
                      : 'shadow-lg border-primary/10 opacity-95 hover:opacity-100 z-10'
                  }`}
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                    {event.done && (
                      <div className="absolute top-[10%] -left-[12%] z-20 w-[150%] -rotate-45 bg-gradient-to-r from-black/95 to-black/80 backdrop-blur-sm py-2.5 shadow-xl">
                        <div className="flex items-center justify-center gap-2">
                          <Check className="h-4 w-4 text-white" strokeWidth={3} />
                          <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
                            Realizado
                          </span>
                        </div>
                      </div>
                    )}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  <div className={featured ? 'p-6 md:p-7' : 'p-4 md:p-5'}>
                    <h3 className={`font-bold text-foreground mb-3 ${featured ? 'text-2xl mb-4' : 'text-lg'}`}>
                      {event.title}
                    </h3>

                    {featured ? (
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {event.description}
                      </p>
                    ) : (
                      <ul className="space-y-2 mb-5 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-xs">{event.location}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-xs">{event.time}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Ticket className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-xs">{event.price}</span>
                        </li>
                      </ul>
                    )}

                    <Button
                      size={featured ? 'default' : 'sm'}
                      className={`w-full rounded-full font-semibold tracking-wide ${
                        featured
                          ? 'bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground hover:opacity-90'
                          : 'bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground hover:opacity-90 text-xs'
                      }`}
                      onClick={() => window.open(event.link, '_blank')}
                    >
                      {event.ctaLabel || (featured ? 'Compre Agora' : 'Saiba Mais')}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>




        {/* CTA Section */}
        <div className="text-center bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-background/20">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Quer ser o primeiro a saber dos nossos eventos?
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Cadastre-se em nossa newsletter e receba informações exclusivas sobre lançamentos de ingressos,
            promoções especiais e eventos VIP.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 h-12 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="h-12 px-8 shrink-0">Cadastrar</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { EventsSection };
