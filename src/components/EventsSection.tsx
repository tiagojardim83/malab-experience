import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, MapPin, Ticket } from 'lucide-react';
import mariaRita from '@/assets/event-maria-rita.jpg.asset.json';
import vertBattle from '@/assets/event-vert-battle.jpeg.asset.json';
import martinhoMartnalia from '@/assets/event-martinho.png.asset.json';
import zeRamalho from '@/assets/event-ze-ramalho.jpg.asset.json';

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
    title: 'Martinho & Mart’nália',
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
    title: 'Vert Battle — 10 anos',
    location: 'Parque das Mangabeiras · BH/MG',
    time: '12–13.SET',
    price: 'Gratuito',
    description: '12 e 13 de setembro · Parque das Mangabeiras · BH/MG. O maior circuito de skate vertical do país celebra 10 anos com etapa inédita em Belo Horizonte.',
    image: vertBattle.url,
    link: 'https://www.instagram.com/vertbattle/',
    ctaLabel: 'Saiba mais',
  },
  {
    id: 4,
    title: 'Zé Ramalho — Show dos Sucessos',
    location: 'Arena Hall · BH/MG',
    time: '20.NOV · 21h',
    price: 'Sympla',
    description: '20.11 · 21h · Arena Hall · BH/MG. Zé Ramalho apresenta a turnê 2026 “Show dos Sucessos”, reunindo os grandes clássicos de sua carreira.',
    image: zeRamalho.url,
    link: 'https://bileto.sympla.com.br/event/124968/d/405155',
    ctaLabel: 'Compre agora',
  },
];

export const EventsSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => () => window.cancelAnimationFrame(scrollFrameRef.current), []);

  const scrollToEvent = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + events.length) % events.length;
    const carousel = carouselRef.current;
    const target = carousel?.children.item(normalizedIndex) as HTMLElement | null;
    target?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setActiveIndex(normalizedIndex);
  };

  const updateActiveEvent = () => {
    if (scrollFrameRef.current) return;
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = 0;
      const carousel = carouselRef.current;
      if (!carousel) return;
      const cards = Array.from(carousel.children) as HTMLElement[];
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - carousel.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    });
  };

  return (
    <section id="eventos" className="bg-background text-primary">
      <div className="container editorial-section">
        <header className="mb-12 border-t border-primary/30 pt-5 md:mb-16">
          <p className="editorial-label text-secondary">Agenda cultural</p>
          <div className="mt-6 grid items-end gap-7 lg:grid-cols-12">
            <h2 className="editorial-display text-5xl leading-[0.9] md:text-7xl lg:col-span-8 lg:text-8xl">Próximos eventos em Belo Horizonte.</h2>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="max-w-md text-sm leading-6 text-primary/65 md:text-base">Agenda atualizada dos melhores eventos culturais e shows em Minas Gerais.</p>
              <div className="mt-6 flex items-center gap-2">
                <button type="button" onClick={() => scrollToEvent(activeIndex - 1)} aria-label="Evento anterior" className="flex h-11 w-11 items-center justify-center border border-primary/35 transition-colors hover:border-secondary hover:bg-secondary hover:text-background">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => scrollToEvent(activeIndex + 1)} aria-label="Próximo evento" className="flex h-11 w-11 items-center justify-center border border-primary/35 transition-colors hover:border-secondary hover:bg-secondary hover:text-background">
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span data-motion-number className="ml-2 text-[9px] font-bold uppercase tracking-[0.16em] text-primary/50">0{activeIndex + 1} / 0{events.length}</span>
              </div>
            </div>
          </div>
        </header>

        <div
          ref={carouselRef}
          onScroll={updateActiveEvent}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
        >
          {events.map((event, index) => (
            <article key={event.id} className="flex basis-[88%] shrink-0 snap-start flex-col sm:basis-[65%] md:basis-[calc((100%-3rem)/3)]">
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-muted">
                <img src={event.image} alt={event.title} loading="lazy" className="event-poster h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />
                <span data-motion-number className="absolute left-0 top-0 bg-primary px-4 py-3 text-sm font-black text-background">0{index + 1}</span>
              </a>

              <div className="flex flex-1 flex-col pt-5">
                <h3 className="editorial-display h-20 overflow-hidden text-2xl leading-[1.02] md:text-3xl">{event.title}</h3>
                <p className="mt-4 h-28 overflow-hidden text-sm leading-6 text-primary/65">{event.description}</p>
                <ul className="mt-6 space-y-2 border-t border-primary/20 pt-5 text-xs text-primary/70">
                  <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />{event.location}</li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-secondary" /><span data-motion-number>{event.time}</span></li>
                  <li className="flex items-center gap-2"><Ticket className="h-4 w-4 text-secondary" />{event.price}</li>
                </ul>
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="site-cta mt-6 bg-primary text-background hover:bg-secondary">
                  {event.ctaLabel}<ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-secondary text-background">
        <div className="container grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="editorial-label">Agenda em primeira mão</p>
            <h3 className="editorial-display mt-6 text-4xl leading-[0.95] md:text-6xl">Quer ser o primeiro a saber dos nossos eventos?</h3>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-background/80 md:text-base">Cadastre-se em nossa newsletter e receba informações exclusivas sobre lançamentos de ingressos, promoções especiais e eventos VIP.</p>
          </div>
          <form className="lg:col-span-5" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="newsletter-email" className="text-[9px] font-bold uppercase tracking-[0.18em]">Seu melhor e-mail</label>
            <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-0">
              <input id="newsletter-email" type="email" placeholder="voce@email.com" className="h-14 w-full min-w-0 border-b border-background bg-transparent px-0 text-sm text-background outline-none placeholder:text-background/45 sm:flex-1" />
              <button type="submit" className="site-cta bg-primary text-background hover:bg-background hover:text-secondary">Cadastrar <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
