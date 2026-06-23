import { useEffect } from 'react';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHelmet = ({
  title = "Malab Produções | Produtora de Eventos BH | Shows e Festivais em Minas Gerais",
  description = "Malab Produções: 30 anos produzindo grandes eventos em Belo Horizonte e Minas Gerais. Shows internacionais, festivais culturais e carnaval. Eventos inesquecíveis desde 1994.",
  keywords = "malab produções, eventos belo horizonte, shows minas gerais, festival eletronika, carnaval bh, produtora cultural, eventos corporativos, megaeventos",
  image = "https://malabproducoes.lovable.app/malab.png",
  url = "https://malabproducoes.lovable.app/",
  type = "website"
}: SEOHelmetProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Additional SEO meta tags
    updateMetaTag('author', 'Malab Produções');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('language', 'pt-BR');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

  }, [title, description, keywords, image, url, type]);

  return null;
};