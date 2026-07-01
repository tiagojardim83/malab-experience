import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Open the user's email client with a pre-filled message to Malab
    const subject = encodeURIComponent(`Nova proposta de ${formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nE-mail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:aluizer@malab.com.br?subject=${subject}&body=${body}`;

    toast({
      title: "Abrindo seu e-mail...",
      description: "Finalize o envio no seu aplicativo de e-mail. Obrigado!",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#F25C2A]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16 animate-fade-in">
            <h2 className="text-[30px] leading-[1.15] font-bold mb-3 md:text-5xl md:mb-6 text-background">
              Seu próximo show <br /> merece o calor de Minas
            </h2>
            <p className="text-lg leading-[1.5] font-light text-background/90 max-w-3xl mx-auto">
              Seja você artista, agente ou marca, a Malab tem um palco pronto para 
              se transformar em história. Compartilhe sua ideia: nós cuidamos de acender as luzes.
            </p>
          </div>

          {/* Contact Form */}
          <Card className="animate-slide-up bg-transparent border-2 border-[#F5E6CC] rounded-2xl shadow-none">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#F5E6CC]">
                      Nome *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="bg-transparent border-[#F5E6CC]/60 text-[#F5E6CC] placeholder:text-[#F5E6CC]/50 focus-visible:ring-[#F5E6CC]/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#F5E6CC]">
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      className="bg-transparent border-[#F5E6CC]/60 text-[#F5E6CC] placeholder:text-[#F5E6CC]/50 focus-visible:ring-[#F5E6CC]/40"
                    />
                  </div>
                </div>
                

                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#F5E6CC]">
                    Conte-nos sobre seu projeto *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva sua ideia, tipo de evento, data prevista, público esperado..."
                    rows={4}
                    className="bg-transparent border-[#F5E6CC]/60 text-[#F5E6CC] placeholder:text-[#F5E6CC]/50 focus-visible:ring-[#F5E6CC]/40"
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-12 bg-transparent border-2 border-[#F5E6CC] text-[#F5E6CC] hover:bg-[#F5E6CC] hover:text-[#F25C2A] transition-colors"
                  >
                    Enviar proposta
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};