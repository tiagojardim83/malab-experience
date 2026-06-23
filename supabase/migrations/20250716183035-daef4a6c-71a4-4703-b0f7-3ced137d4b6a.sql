-- Create blog_posts table for managing articles
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Equipe Malab',
  reading_time TEXT NOT NULL DEFAULT '5 min de leitura',
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to published posts
CREATE POLICY "Published blog posts are viewable by everyone" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the existing blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, image_url, category, author, reading_time, published, featured, meta_title, meta_description, meta_keywords) VALUES
(
  'De Pão & Queijo: o novo destaque entre os eventos gastronômicos em Belo Horizonte',
  'de-pao-e-queijo-festival-gastronomico-bh',
  'Nos dias 15 e 16 de agosto o Parque do Palácio recebe o festival De Pão & Queijo – Arte, Sabores e Modos de Fazer. A programação foi pensada para todas as idades e reúne o melhor do pão de queijo, cafés especiais, vinhos mineiros e queijos premiados.',
  '<p>O festival De Pão & Queijo surge como uma celebração única da cultura gastronômica mineira, reunindo no Parque do Palácio uma experiência completa que vai muito além do tradicional pão de queijo.</p><p>Com uma programação cuidadosamente pensada para todas as idades, o evento promete ser um marco na agenda cultural de Belo Horizonte, destacando não apenas os sabores, mas também as histórias e tradições por trás de cada quitute mineiro.</p><p>Durante os dois dias de festival, os visitantes poderão degustar diferentes variações do famoso pão de queijo, desde as receitas mais tradicionais até criações inovadoras desenvolvidas especialmente para o evento. Cafés especiais de diversas regiões de Minas Gerais estarão disponíveis, proporcionando a harmonização perfeita com os quitutes oferecidos.</p><p>A seleção de vinhos mineiros representa outro ponto alto do festival, com rótulos premiados que mostram a qualidade da viticultura no estado. Os queijos artesanais, muitos deles ganhadores de concursos nacionais e internacionais, completam a experiência gastronômica única.</p><p>Além da parte gastronômica, o festival conta com apresentações culturais, oficinas culinárias e espaços dedicados para que as famílias possam aproveitar o evento de forma completa. A Malab Produções, responsável pela organização, garantiu que cada detalhe fosse pensado para proporcionar uma experiência memorável aos participantes.</p>',
  '/lovable-uploads/12a1764e-83e6-4a5b-9c9a-3d922d9ea285.png',
  'Eventos Gastronômicos',
  'Equipe Malab',
  '8 min de leitura',
  true,
  true,
  'Festival De Pão & Queijo BH 2024 | Malab Produções',
  'Descubra o festival De Pão & Queijo em Belo Horizonte: tradição mineira, cafés especiais e queijos premiados no Parque do Palácio.',
  'festival gastronômico, pão de queijo, Belo Horizonte, eventos culturais, gastronomia mineira, Malab Produções'
),
(
  'Como a Malab Produções Transformou o Carnaval de BH em um dos Maiores do Brasil',
  'carnaval-bh-transformacao-malab-producoes',
  'Conheça os bastidores da produção do Carnaval de Belo Horizonte e como a Malab ajudou a transformar a festa em um fenômeno nacional.',
  '<p>O Carnaval de Belo Horizonte passou por uma transformação extraordinária nas últimas décadas, evoluindo de uma festa regional para se tornar um dos maiores e mais reconhecidos carnavais do Brasil. Por trás dessa metamorfose está o trabalho incansável da Malab Produções.</p><p>A jornada começou com a visão de criar um carnaval único, que respeitasse as tradições mineiras enquanto incorporava elementos inovadores capazes de atrair foliões de todo o país. A Malab assumiu o desafio de repensar completamente a estrutura e a logística do evento.</p><p>Uma das principais inovações foi a criação de circuitos temáticos que permitem diferentes experiências dentro do mesmo evento. Cada circuito foi cuidadosamente planejado para atender diferentes públicos, desde famílias com crianças até jovens em busca de diversão noturna.</p><p>A produção técnica envolveu desafios complexos, incluindo a coordenação de mais de 500 profissionais, a instalação de sistemas de som de última geração em múltiplos pontos da cidade, e a criação de uma infraestrutura capaz de receber mais de 2 milhões de foliões ao longo dos dias de festa.</p><p>O impacto econômico foi imenso: o Carnaval de BH movimenta hoje mais de R$ 800 milhões na economia local, gerando milhares de empregos diretos e indiretos. Hotéis, restaurantes, comércio e serviços de toda a região metropolitana se beneficiam do evento.</p><p>Hoje, o Carnaval de Belo Horizonte é reconhecido nacionalmente como um dos mais organizados e seguros do país, servindo de modelo para outras cidades que desejam desenvolver seus próprios eventos carnavalescos.</p>',
  '/lovable-uploads/eb8f4311-79bc-43cb-b734-308489c5a4f2.png',
  'Eventos Populares',
  'Aluizer Malab',
  '6 min de leitura',
  true,
  false,
  'Carnaval de BH: Como se Tornou um dos Maiores do Brasil | Malab',
  'Descubra como a Malab Produções transformou o Carnaval de Belo Horizonte em um fenômeno nacional com inovação e organização.',
  'Carnaval BH, Carnaval Belo Horizonte, Malab Produções, eventos populares, festa nacional'
),
(
  'Eletronika: O Festival que Colocou BH no Mapa da Música Eletrônica Mundial',
  'eletronika-festival-musica-eletronica-bh',
  'Entenda como o Eletronika, criado e produzido pela Malab, se tornou referência em música e estética vanguardista.',
  '<p>O Eletronika nasceu da visão ousada de posicionar Belo Horizonte no cenário internacional da música eletrônica. Criado e produzido pela Malab Produções, o festival rapidamente se estabeleceu como uma referência em inovação musical e experiência sensorial.</p><p>Desde sua primeira edição, o Eletronika se diferenciou por sua curadoria musical criteriosa, trazendo para Belo Horizonte artistas internacionais renomados ao lado de talentos nacionais emergentes. A proposta sempre foi criar uma experiência que fosse além da música, incorporando elementos visuais, tecnológicos e artísticos únicos.</p><p>A produção do festival envolve desafios técnicos complexos, incluindo a criação de instalações sonoras imersivas, sistemas de iluminação sincronizados com a música e cenografias que transformam completamente o ambiente. Cada edição traz inovações tecnológicas que posteriormente influenciam outros eventos do gênero.</p><p>O impacto cultural do Eletronika foi fundamental para estabelecer uma cena de música eletrônica sólida em Minas Gerais. O festival serviu como plataforma de lançamento para diversos DJs e produtores locais, muitos dos quais hoje têm carreiras internacionais consolidadas.</p><p>A estética vanguardista do Eletronika se tornou sua marca registrada. Cada edição explora conceitos visuais únicos, criando ambientes futurísticos que transportam o público para experiências sensoriais completamente novas. A integração entre música, arte visual e tecnologia define a identidade do festival.</p><p>Hoje, o Eletronika é reconhecido internacionalmente como um dos festivais de música eletrônica mais inovadores da América Latina, atraindo público de diversos países e estabelecendo Belo Horizonte como um destino obrigatório para os amantes do gênero.</p>',
  '/lovable-uploads/eb8f4311-79bc-43cb-b734-308489c5a4f2.png',
  'Festivais Culturais',
  'Aluizer Malab',
  '5 min de leitura',
  true,
  false,
  'Festival Eletronika BH: Música Eletrônica Mundial | Malab',
  'Conheça o Eletronika, festival que colocou BH no mapa da música eletrônica mundial com estética vanguardista e inovação tecnológica.',
  'Eletronika, música eletrônica, festival BH, Malab Produções, eventos culturais, música eletrônica Brasil'
),
(
  'Bastidores de um Megaevento: Como Produzimos Shows de Estrelas Internacionais em BH',
  'bastidores-shows-internacionais-bh-malab',
  'Descubra o que está por trás da produção de grandes shows internacionais como Elton John, Iron Maiden e Beyoncé.',
  '<p>Produzir shows de artistas internacionais do calibre de Elton John, Iron Maiden e Beyoncé em Belo Horizonte representa um dos maiores desafios na indústria de entretenimento. Cada megaevento demanda meses de planejamento meticuloso e coordenação de centenas de profissionais especializados.</p><p>O processo começa muito antes do artista pisar em solo brasileiro. As negociações envolvem múltiplas empresas internacionais, questões alfandegárias complexas para equipamentos especializados, e a adaptação de riders técnicos extremamente específicos às condições locais.</p><p>A logística é verdadeiramente impressionante: são necessários dezenas de caminhões para transportar equipamentos de som, iluminação e cenografia. Palcos gigantescos são montados por equipes que trabalham ininterruptamente por dias, seguindo especificações técnicas rigorosas definidas pelas produções internacionais dos artistas.</p><p>Um dos aspectos mais desafiadores é a adaptação de shows pensados para estádios europeus ou norte-americanos às particularidades dos venues brasileiros. Isso inclui desde questões estruturais até adaptações para o clima tropical e regulamentações locais de segurança.</p><p>A segurança é prioridade absoluta. Cada show internacional demanda protocolos específicos que envolvem múltiplas agências, desde a Polícia Federal até bombeiros e órgãos municipais. A Malab desenvolveu expertise única em coordenar esses diferentes stakeholders.</p><p>O resultado final – ver dezenas de milhares de pessoas emocionadas durante performances históricas – justifica todos os meses de trabalho intenso. Esses eventos não apenas marcam a vida dos fãs, mas consolidam Belo Horizonte como uma praça fundamental no circuito internacional de entretenimento.</p>',
  '/lovable-uploads/eb8f4311-79bc-43cb-b734-308489c5a4f2.png',
  'Shows Musicais',
  'Aluizer Malab',
  '7 min de leitura',
  true,
  false,
  'Bastidores Shows Internacionais BH: Elton John, Iron Maiden | Malab',
  'Descubra os bastidores da produção de megashows internacionais em BH: logística, desafios e como a Malab faz acontecer.',
  'shows internacionais, Elton John, Iron Maiden, Beyoncé, produção musical, Malab Produções, megaeventos'
);