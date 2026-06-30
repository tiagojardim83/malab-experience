import { Calendar, User, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

const BlogSection = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Blog Malab: Histórias dos Nossos Eventos
          </h2>
          <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto mb-8">
            Conheça os bastidores e as histórias por trás dos eventos que marcaram nossa trajetória em Minas Gerais. 
            Cada evento é uma experiência única que fica na memória de milhares de pessoas.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/blog" className="inline-flex items-center gap-2">
              Ver Todos os Posts <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                <div className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-background">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.reading_time}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10 transition-colors">
                      Ler História Completa
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Newsletter Section */}
        <div className="text-center bg-primary rounded-2xl p-10 md:p-12 border border-primary/40 shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 tracking-tight">
            Acompanhe Nossa Jornada
          </h3>
          <p className="text-base md:text-lg text-primary-foreground font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
            Inscreva-se para receber as últimas histórias dos nossos eventos,
            bastidores exclusivos e novidades do mundo da produção cultural.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              E-mail para receber a newsletter
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg border border-background/30 bg-background text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary"
            />
            <Button
              type="submit"
              className="px-8 py-3 bg-background text-primary hover:bg-background/90 font-semibold"
            >
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>

    </section>
  );
};

export { BlogSection };