import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Nova proposta de ${formData.name}`);
    const body = encodeURIComponent(`Nome: ${formData.name}\nE-mail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:aluizer@malab.com.br?subject=${subject}&body=${body}`;
    toast({ title: 'Abrindo seu e-mail...', description: 'Finalize o envio no seu aplicativo de e-mail. Obrigado!' });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <section id="contact" className="bg-secondary text-background">
      <div className="container editorial-section">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="editorial-label">Vamos conversar</p>
            <h2 className="editorial-display mt-7 text-[clamp(2rem,4.7vw,4.25rem)] leading-[0.9]">
              <span className="block whitespace-nowrap">Seu próximo show</span>
              <span className="block whitespace-nowrap">merece o <span className="italic text-primary">calor</span></span>
              <span className="block whitespace-nowrap italic text-primary">de Minas.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-background/80 md:text-lg">
              Seja você artista, agente ou marca, a Malab tem um palco pronto para se transformar em história. Compartilhe sua ideia: nós cuidamos de acender as luzes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-background/50 pt-2 lg:col-span-6 lg:mt-14">
            <div className="grid md:grid-cols-2 md:gap-8">
              <div className="border-b border-background/50 py-6">
                <label htmlFor="name" className="block text-[9px] font-bold uppercase tracking-[0.2em]">Nome *</label>
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} placeholder="Seu nome completo" className="mt-4 h-10 w-full bg-transparent p-0 text-base text-background outline-none placeholder:text-background/45" />
              </div>
              <div className="border-b border-background/50 py-6">
                <label htmlFor="email" className="block text-[9px] font-bold uppercase tracking-[0.2em]">E-mail *</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" className="mt-4 h-10 w-full bg-transparent p-0 text-base text-background outline-none placeholder:text-background/45" />
              </div>
            </div>

            <div className="border-b border-background/50 py-6">
              <label htmlFor="message" className="block text-[9px] font-bold uppercase tracking-[0.2em]">Conte-nos sobre seu projeto *</label>
              <textarea id="message" name="message" required value={formData.message} onChange={handleInputChange} placeholder="Descreva sua ideia, tipo de evento, data prevista, público esperado..." rows={5} className="mt-5 w-full resize-none bg-transparent p-0 text-base leading-7 text-background outline-none placeholder:text-background/45" />
            </div>

            <div className="mt-8 flex justify-end">
              <button type="submit" className="inline-flex items-center gap-2 bg-primary px-6 py-4 text-[9px] font-bold uppercase tracking-[0.14em] text-background transition-colors hover:bg-background hover:text-secondary">
                Enviar proposta <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
