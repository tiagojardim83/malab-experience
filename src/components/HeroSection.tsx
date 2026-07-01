import { Button } from '@/components/ui/button';
import heroConcert from '@/assets/hero-concert.jpg';
import heroVideo from '@/assets/malab-hero.mp4.asset.json';
import octo1 from '@/assets/malab-octopus-01.png.asset.json';
import octo2 from '@/assets/malab-octopus.png.asset.json';
import octo3 from '@/assets/malab-octopus-03.png.asset.json';
import octo4 from '@/assets/malab-octopus-04.png.asset.json';

const octoFrames = [octo1, octo2, octo3, octo4, octo3, octo2];



export const HeroSection = () => {
  const scrollToEvents = () => {
    const element = document.getElementById('eventos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo.url} type="video/mp4" />
          {/* Fallback image */}
          <img 
            src={heroConcert} 
            alt="Palco iluminado da Malab Produções" 
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-background">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-[36px] leading-[1.1] font-bold mb-4 md:text-7xl md:leading-tight md:mb-6 whitespace-pre-line">
            O Palco onde&nbsp;{"\n"}
            <span className="text-secondary">Minas</span> se Encontra com o <span className="text-secondary">Mundo</span>
          </h1>
          
          <p className="text-lg leading-[1.5] font-light mb-8 md:text-xl md:mb-12 opacity-80 max-w-2xl mx-auto">
            Há quase três décadas, conectamos artistas, plateias e cidades inteiras a experiências inesquecíveis.
          </p>
          
          <div className="flex justify-center items-center mb-8 md:mb-16">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-base md:text-lg px-6 py-5 md:px-8 md:py-6"
              onClick={scrollToEvents}
            >
              Próximos Eventos
            </Button>
          </div>

          <div className="animate-slide-up flex justify-center">
            <button
              onClick={scrollToEvents}
              aria-label="Role para a próxima seção"
              className="animate-float-soft opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="relative block w-12 h-12 md:w-16 md:h-16 mx-auto">
                {octoFrames.map((frame, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="absolute inset-0 bg-secondary animate-octo-frame opacity-0"
                    style={{
                      WebkitMaskImage: `url(${frame.url})`,
                      maskImage: `url(${frame.url})`,
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      animationDelay: `${(i * 2.4) / octoFrames.length}s`,
                    }}
                  />
                ))}
              </span>
            </button>
          </div>

          



        </div>
      </div>
    </section>
  );
};