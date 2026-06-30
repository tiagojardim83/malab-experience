import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, MessageCircle } from 'lucide-react';
import patoFuImg from '@/assets/artist-patofu.jpg.asset.json';
import rodrigoBorgesImg from '@/assets/artist-rodrigoborges.jpg.asset.json';

interface Artist {
  id: string;
  name: string;
  description: string;
  image: { url: string };
  imageAlt: string;
  imagePosition?: string;
  instagramUrl: string;
  whatsappNumber: string;
}


const WHATSAPP_NUMBER = '+553199514594';

const artists: Artist[] = [
  {
    id: 'pato-fu',
    name: 'Pato Fu',
    description:
      'Uma das bandas mais criativas do rock brasileiro, conhecida por misturar sonoridades inovadoras e performances marcantes que conquistam gerações.',
    image: patoFuImg,
    imageAlt: 'Foto promocional do Pato Fu',
    instagramUrl: 'https://www.instagram.com/patofu/?hl=en',
    whatsappNumber: WHATSAPP_NUMBER,
  },
  {
    id: 'rodrigo-borges',
    name: 'Rodrigo Borges',
    description:
      'Cantor, compositor e instrumentista com trajetória singular, trazendo autenticidade e energia para cada palco que pisa.',
    image: rodrigoBorgesImg,
    imageAlt: 'Foto promocional de Rodrigo Borges',
    imagePosition: '65% 20%',
    instagramUrl: 'https://www.instagram.com/rodrigoborgesoficial/?hl=en',
    whatsappNumber: WHATSAPP_NUMBER,
  },
];


const buildWhatsAppUrl = (artistName: string) => {
  const text = encodeURIComponent(
    `Olá! Gostaria de contratar ${artistName} através da Malab Produções.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${text}`;
};

export const ArtistsSection = () => {
  return (
    <section id="artistas" className="py-20 bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Artistas Representados
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Talentos que carregam a essência da Malab Produções para os
              palcos mais importantes do Brasil.
            </p>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artists.map((artist, index) => (
              <Card
                key={artist.id}
                className="group overflow-hidden flex flex-col h-full animate-slide-up bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/20 hover:border-primary-foreground/40 transition-all duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={artist.image.url}
                    alt={artist.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                </div>
                <CardContent className="p-6 flex flex-col flex-1 gap-4">
                  <h3 className="text-2xl font-bold text-primary-foreground">
                    {artist.name}
                  </h3>
                  <p className="text-primary-foreground/80 flex-1">
                    {artist.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Button
                      variant="hero"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={buildWhatsAppUrl(artist.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contratar
                      </a>
                    </Button>
                    <Button
                      variant="hero"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={artist.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

