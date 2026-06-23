import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SEOHelmet } from '@/components/SEOHelmet';
import { StickyNavigation } from '@/components/StickyNavigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <>
      <SEOHelmet 
        title="Blog - Malab Produções | Notícias e Insights sobre Eventos"
        description="Acompanhe as últimas novidades, bastidores e insights sobre produção de eventos em Belo Horizonte. Blog oficial da Malab Produções com 30 anos de experiência."
        keywords="blog malab, notícias eventos bh, produção cultural, festivais minas gerais, eventos corporativos, carnaval belo horizonte"
        url="https://malabproducoes.lovable.app/blog"
      />
      
      <div className="min-h-screen bg-background">
        <StickyNavigation />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary mb-6">
                Blog Malab
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Descubra os bastidores dos grandes eventos, tendências do mercado cultural e insights únicos de 30 anos produzindo momentos inesquecíveis em Minas Gerais.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-96 animate-pulse">
                    <div className="h-48 bg-muted rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Todos os Posts</h2>
                  <p className="text-muted-foreground">
                    {posts.length} {posts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <article key={post.id} className="group">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        {post.image_url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            {post.featured && (
                              <Badge variant="default" className="text-xs">
                                Destaque
                              </Badge>
                            )}
                          </div>
                          
                          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground line-clamp-3 text-sm">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon size={12} />
                              <time dateTime={post.created_at}>
                                {new Date(post.created_at).toLocaleDateString('pt-BR')}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon size={12} />
                              <span>{post.reading_time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UserIcon size={12} />
                              <span>{post.author}</span>
                            </div>
                          </div>
                          
                          <Button 
                            asChild 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-4"
                          >
                            <Link to={`/blog/${post.slug}`}>
                              Ler Artigo Completo
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-4">Nenhum post encontrado</h3>
                <p className="text-muted-foreground">
                  Ainda não há posts publicados no blog. Volte em breve para conferir nossos conteúdos!
                </p>
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;