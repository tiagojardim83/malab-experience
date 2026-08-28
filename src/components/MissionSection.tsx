export const MissionSection = () => {
  return (
    <section id="missao" className="bg-secondary text-background">
      <div className="container py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl border-t border-background/35 pt-5">
          <p className="editorial-label">Nossa missão</p>
          <blockquote className="mt-8">
            <p className="editorial-display text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
              Produzir experiências que unem <span className="italic text-primary">excelência técnica,</span> impacto social e <span className="italic text-primary">hospitalidade mineira.</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};
