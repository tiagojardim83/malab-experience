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
  return (
    <section id="artistas" className="bg-black text-background">
      <div className="container editorial-section">
        <header className="mb-14 max-w-6xl border-t border-background/25 pt-5 md:mb-24">
          <p className="editorial-label text-secondary">Casting Malab</p>
          <h2 className="editorial-display mt-6 text-5xl leading-[0.9] md:text-7xl lg:text-8xl">Artistas representados.</h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-background/65 md:text-lg">
            Talentos que carregam a essência da Malab Produções para os palcos mais importantes do Brasil.
          </p>
        </header>

        <div className="space-y-20 md:space-y-32">
          {artists.map((artist, index) => (
            <article key={artist.id} className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} lg:col-span-8`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:aspect-[16/10]">
                  <img src={artist.image.url} alt={artist.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
                  <span className="absolute left-0 top-0 bg-secondary px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
                    Artista <span data-motion-number>0{index + 1}</span>
                  </span>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''} lg:col-span-4 lg:pb-4`}>
                <h3 className="editorial-display text-5xl italic text-secondary md:text-7xl">{artist.name}</h3>
                <p className={`mt-6 text-sm leading-7 text-background/70 md:text-base ${index % 2 === 1 ? 'lg:ml-auto' : ''} max-w-md`}>
                  {artist.description}
                </p>
                <div className={`mt-8 flex flex-wrap gap-x-7 gap-y-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  <a href={buildWhatsAppUrl(artist.name)} target="_blank" rel="noopener noreferrer" className="editorial-link text-background hover:text-secondary">
                    <MessageCircle className="h-4 w-4" /> Contratar
                  </a>
                  <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer" className="editorial-link text-background hover:text-secondary">
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                </div>
                <ArrowUpRight className={`mt-10 h-10 w-10 text-secondary ${index % 2 === 1 ? 'lg:ml-auto' : ''}`} strokeWidth={1} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
