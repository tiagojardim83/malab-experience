import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import backstageImg from '@/assets/backstage.jpg';
import festivalImg from '@/assets/festival.jpg';
import corporateImg from '@/assets/corporate-event.jpg';

const portfolioItems = [
  {
    id: 1,
    title: "Festival de Inverno Bonito",
    category: "Festivais",
    year: "2023",
    audience: "15 mil pessoas",
    image: festivalImg,
    description: "Festival que uniu música internacional e cultura local em cenário único."
  },
  {
    id: 2,
    title: "Turnê Nacional Rock Brasil",
    category: "Shows",
    year: "2023",
    audience: "85 mil pessoas",
    image: backstageImg,
    description: "Produção completa de turnê nacional com 12 shows em capitais."
  },
  {
    id: 3,
    title: "Corporate Experience Summit",
    category: "Corporativo",
    year: "2023",
    audience: "2 mil executivos",
    image: corporateImg,
    description: "Evento corporativo premium com experiência imersiva de marca."
  },
  {
    id: 4,
    title: "Festival Eletrônico MG",
    category: "Festivais",
    year: "2022",
    audience: "25 mil pessoas",
    image: festivalImg,
    description: "Maior festival de música eletrônica do interior de Minas Gerais."
  },
  {
    id: 5,
    title: "Show Sertanejo Arena",
    category: "Shows",
    year: "2022",
    audience: "40 mil pessoas",
    image: backstageImg,
    description: "Megashow sertanejo com estrutura completa de arena."
  },
  {
    id: 6,
    title: "Lançamento Produto Tech",
    category: "Corporativo",
    year: "2022",
    audience: "500 convidados",
    image: corporateImg,
    description: "Evento de lançamento com experiência tecnológica imersiva."
  }
];

const categories = ["Todos", "Shows", "Festivais", "Corporativo"];

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredItems = activeCategory === "Todos" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
              Palcos que já iluminamos
            </h2>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto mb-8">
              De festivais independentes a turnês globais, estes são alguns capítulos 
              que escrevemos com artistas e marcas ao redor do planeta.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="animate-scale-in"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="card-elegant group overflow-hidden animate-slide-up flex flex-col h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center mb-3 text-sm text-muted-foreground">
                      <span>{item.year}</span>
                      <span className="font-medium text-primary">{item.audience}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>


          {/* CTA */}
          <div className="text-center animate-fade-in">
            <Button variant="hero" size="lg">
              Ver todos os cases
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};