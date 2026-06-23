import heroVideo from '@/assets/malab-hero.mp4.asset.json';

export const VideoShowcaseSection = () => {
  return (
    <section className="relative bg-background pt-4 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto rounded-sm overflow-hidden shadow-2xl ring-1 ring-border/40">
          <video
            src={heroVideo.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
};
