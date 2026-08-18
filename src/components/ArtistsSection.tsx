import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Instagram, MessageCircle } from 'lucide-react';
import patoFuImg from '@/assets/artist-patofu.jpg.asset.json';
import rodrigoBorgesImg from '@/assets/artist-rodrigoborges.jpg.asset.json';

interface Artist {
  id: string;
  name: string;
  description: string;
  image: { url: string };
  imageAlt: string;
  instagramUrl: string;
}

const WHATSAPP_NUMBER = '+553199514594';

const artists: Artist[] = [
  {
    id: 'pato-fu',
    name: 'Pato Fu',
    description: 'Uma das bandas mais criativas do rock brasileiro, conhecida por misturar sonoridades inovadoras e performances marcantes que conquistam gerações.',
    image: patoFuImg,
    imageAlt: 'Foto promocional do Pato Fu',
    instagramUrl: 'https://www.instagram.com/patofu/?hl=en',
  },
  {
    id: 'rodrigo-borges',
    name: 'Rodrigo Borges',
    description: 'Cantor, compositor e instrumentista com trajetória singular, trazendo autenticidade e energia para cada palco que pisa.',
    image: rodrigoBorgesImg,
    imageAlt: 'Foto promocional de Rodrigo Borges',
    instagramUrl: 'https://www.instagram.com/rodrigoborgesoficial/?hl=en',
  },
];

const buildWhatsAppUrl = (artistName: string) => {
  const text = encodeURIComponent(`Olá! Gostaria de contratar ${artistName} através da Malab Produções.`);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${text}`;
};

export const ArtistsSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number>();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const scrollDistance = Math.max(0, track.scrollWidth - window.innerWidth);
      setWrapperHeight(window.innerHeight + scrollDistance);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrapper.getBoundingClientRect();
      const scrollDistance = Math.max(0, track.scrollWidth - window.innerWidth);
      if (scrollDistance <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance));
      track.style.transform = `translate3d(${-progress * scrollDistance}px, 0, 0)`;
    };
    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="artistas" className="bg-black text-background">
      <div className="container pb-0 pt-8 md:pt-10">
        <header className="mb-4 max-w-6xl border-t border-background/25 pt-5">
          <p className="editorial-label text-secondary">Casting Malab</p>
          <h2 className="editorial-display mt-6 text-5xl leading-[0.9] md:text-7xl lg:text-8xl">Artistas representados.</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-background/65 md:text-lg">
            Talentos que carregam a essência da Malab Produções para os palcos mais importantes do Brasil.
          </p>
        </header>
      </div>

      <div ref={wrapperRef} style={{ height: wrapperHeight ? `${wrapperHeight}px` : undefined }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center gap-10 pl-6 will-change-transform md:gap-20 md:pl-16 lg:pl-24">
            {artists.map((artist, index) => (
              <article key={artist.id} className="flex h-[86%] w-[86vw] max-w-6xl shrink-0 flex-col justify-center gap-8 md:h-auto md:w-[78vw] md:flex-row md:items-center md:gap-14">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] md:aspect-[16/10] md:flex-1">
                  <img src={artist.image.url} alt={artist.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-0 top-0 bg-secondary px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
                    Artista <span data-motion-number>0{index + 1}</span>
                  </span>
                </div>

                <div className="w-full max-w-md shrink-0">
                  <h3 className="editorial-display text-5xl italic text-secondary md:text-6xl">{artist.name}</h3>
                  <p className="mt-6 max-w-md text-sm leading-7 text-background/70 md:text-base">{artist.description}</p>
                  <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                    <a href={buildWhatsAppUrl(artist.name)} target="_blank" rel="noopener noreferrer" className="editorial-link text-background hover:text-secondary">
                      <MessageCircle className="h-4 w-4" /> Contratar
                    </a>
                    <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="editorial-link text-background hover:text-secondary">
                      <Instagram className="h-4 w-4" /> Instagram
                    </a>
                  </div>
                  <ArrowUpRight className="mt-10 h-10 w-10 text-secondary" strokeWidth={1} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
