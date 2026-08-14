import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock, MapPin, Ticket } from 'lucide-react';
import mariaRita from '@/assets/event-maria-rita.jpg.asset.json';
import viradaLiberdade from '@/assets/event-virada-liberdade.png.asset.json';
import martinhoMartnalia from '@/assets/event-martinho.png.asset.json';

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
    title: 'Virada da Liberdade',
    location: 'Praça da Liberdade · BH/MG',
    time: '31.12 · 18h',
    price: 'Gratuito',
    description: '31.12 · 18h · Praça da Liberdade · BH/MG. Virada da Liberdade com Biquíni, Juarez Moreira, Lagum, Aline Calixto e Pé de Sonho.',
    image: viradaLiberdade.url,
    link: 'https://www.instagram.com/viradadaliberdadeoficial/',
    ctaLabel: 'Saiba mais',
    done: true,
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
                {event.done ? (
                  <span className="absolute right-0 top-0 inline-flex items-center gap-1.5 bg-secondary px-4 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-background"><Check className="h-3.5 w-3.5" /> Realizado</span>
                ) : null}
              </a>

              <div className="flex flex-1 flex-col pt-5">
                <h3 className="editorial-display h-20 overflow-hidden text-2xl leading-[1.02] md:text-3xl">{event.title}</h3>
                <p className="mt-4 h-28 overflow-hidden text-sm leading-6 text-primary/65">{event.description}</p>
                <ul className="mt-6 space-y-2 border-t border-primary/20 pt-5 text-xs text-primary/70">
                  <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />{event.location}</li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-secondary" /><span data-motion-number>{event.time}</span></li>
                  <li className="flex items-center gap-2"><Ticket className="h-4 w-4 text-secondary" />{event.price}</li>
                </ul>
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 bg-primary px-5 py-4 text-[9px] font-bold uppercase tracking-[0.14em] text-background transition-colors hover:bg-secondary">
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
            <div className="mt-3 flex border-b border-background">
              <input id="newsletter-email" type="email" placeholder="voce@email.com" className="h-14 min-w-0 flex-1 bg-transparent px-0 text-sm text-background outline-none placeholder:text-background/45" />
              <button type="submit" className="inline-flex h-14 items-center gap-2 px-3 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-background hover:text-secondary">Cadastrar <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
