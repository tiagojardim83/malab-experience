export const MissionSection = () => {
  return (
    <section id="missao" className="relative pt-24 pb-8 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <span className="h-[2px] w-12 bg-secondary" />
            <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-xs">
              Nossa Missão
            </span>
          </div>

          <blockquote className="animate-slide-up">
            <p className="text-3xl md:text-5xl font-light leading-[1.2] text-foreground tracking-tight">
              Produzir experiências que unem{' '}
              <span className="text-gradient-primary font-semibold">excelência técnica</span>,{' '}
              <span className="text-secondary font-semibold">impacto social</span> e{' '}
              <span className="text-gradient-primary font-semibold">hospitalidade mineira</span>
              <span className="text-secondary">.</span>
            </p>
          </blockquote>

          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-4 text-[10rem] md:text-[14rem] font-black leading-none text-foreground/[0.04] select-none -z-0"
          >
            “
          </div>
        </div>
      </div>
    </section>
  );
};
