import heroVideo from '@/assets/malab-hero.mp4.asset.json';

export const VideoShowcaseSection = () => {
  return (
    <section className="bg-black py-16 text-background md:py-24">
      <div className="container">
        <div className="mb-6 flex items-end justify-between border-t border-background/25 pt-4">
          <p className="editorial-label text-secondary">Em movimento</p>
          <p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-background/50 md:block">Malab · Live experience</p>
        </div>
        <div className="relative overflow-hidden rounded-[1.5rem]">
          <video src={heroVideo.url} autoPlay loop muted playsInline className="block aspect-video w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-background/10" />
        </div>
      </div>
    </section>
  );
};
