import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { SEOHelmet } from '@/components/SEOHelmet';
import { StickyNavigation } from '@/components/StickyNavigation';
import { Footer } from '@/components/Footer';

const BlogPost = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <StickyNavigation />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/404" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEOHelmet 
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        keywords={post.meta_keywords}
        image={post.image_url}
        url={`https://malabproducoes.com.br/blog/${post.slug}`}
      />
      
      <div className="min-h-screen bg-background">
        <StickyNavigation />
        
        {/* Hero Section - Full Screen */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          {post.image_url && (
            <div className="absolute inset-0 z-0">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          )}
          
          {/* Content Overlay */}
          <div className="relative z-10 container mx-auto px-4 text-center text-background">
            {/* Back Button */}
            <div className="absolute top-8 left-4">
              <Link to="/#blog">
                <Button variant="ghost" className="gap-2 text-background hover:bg-background/20 border border-background/30">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao Blog
                </Button>
              </Link>
            </div>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="px-6 py-3 rounded-full text-sm font-medium bg-primary text-background shadow-lg">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight max-w-5xl mx-auto drop-shadow-lg">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-background/90 mb-12">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="text-lg">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-lg">{post.reading_time}</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-background/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Excerpt */}
              <div className="text-xl text-muted-foreground mb-12 leading-relaxed border-l-4 border-primary pl-6 italic">
                {post.excerpt}
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none text-foreground
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-strong:text-foreground prose-em:text-foreground
                  prose-blockquote:border-l-4 prose-blockquote:border-primary 
                  prose-blockquote:pl-6 prose-blockquote:italic
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Gostou desta história?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  A Malab Produções tem mais de 30 anos criando eventos memoráveis. 
                  Entre em contato conosco para realizar o seu próximo evento.
                </p>
                <Link to="/#contato">
                  <Button size="lg" className="px-8">
                    Fale Conosco
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;