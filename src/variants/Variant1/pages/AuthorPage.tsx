import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, ChevronRight } from 'lucide-react';
import { authors, articles } from '../../../data/content';
import ArticleCard from '../components/ArticleCard';

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const author = authors.find((a) => a.id === id);
  const authorArticles = author
    ? articles.filter((a) => a.author === author.name)
    : [];

  // JSON-LD Person schema
  useEffect(() => {
    if (!author) return;

    document.title = `${author.name} — Авторы РАМКИ`;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.name,
      description: author.bio,
      worksFor: { '@type': 'Organization', name: 'РАМКИ' },
      url: window.location.href,
    };

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Авторы', item: `${window.location.origin}/avtory` },
        { '@type': 'ListItem', position: 3, name: author.name },
      ],
    };

    const scripts: HTMLScriptElement[] = [];
    [schema, breadcrumb].forEach((data) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.text = JSON.stringify(data);
      document.head.appendChild(el);
      scripts.push(el);
    });

    return () => scripts.forEach((el) => document.head.removeChild(el));
  }, [author]);

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <p className="font-serif text-3xl text-[#0f0f0f] mb-4">Автор не найден</p>
          <Link to="/avtory" className="text-[14px] text-[#555555] hover:text-[#0f0f0f] transition-colors">
            ← Все авторы
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumbs */}
      <nav aria-label="Хлебные крошки" className="pt-20 sm:pt-24 lg:pt-32 pb-6 px-4 sm:px-6 lg:px-12 border-b border-[#f0f0f0]">
        <ol className="flex flex-wrap items-center gap-1.5 max-w-[1400px] mx-auto text-[12px] text-[#888888]">
          <li><Link to="/" className="hover:text-[#0f0f0f] transition-colors">Главная</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li><Link to="/avtory" className="hover:text-[#0f0f0f] transition-colors">Авторы</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li className="text-[#555555]" aria-current="page">{author.name}</li>
        </ol>
      </nav>

      {/* Author profile */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-20 border-b border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">

            {/* Avatar */}
            <div className="lg:col-span-3">
              <div className="aspect-square bg-[#f0f0ee] border border-[#e8e8e8] flex items-center justify-center max-w-[180px] sm:max-w-[240px] lg:max-w-[280px]">
                <User className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 text-[#c0beba]" />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-9">
              <span className="text-[11px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-3 sm:mb-4 block">
                Автор РАМКИ
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-normal text-[#0f0f0f] leading-tight mb-4 sm:mb-6">
                {author.name}
              </h1>
              <p className="text-[15px] sm:text-[17px] text-[#444444] leading-relaxed max-w-2xl mb-6 sm:mb-8">
                {author.bio}
              </p>

              {authorArticles.length > 0 && (
                <div className="flex items-center gap-2 text-[13px] text-[#777777]">
                  <span className="font-medium text-[#0f0f0f] text-[15px]">{authorArticles.length}</span>
                  <span>
                    {authorArticles.length === 1 ? 'материал' :
                     authorArticles.length < 5 ? 'материала' : 'материалов'} в РАМКИ
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Author's articles */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-8 sm:mb-10 pb-4 border-b border-[#e5e5e5]">
            Материалы автора
          </h2>

          {authorArticles.length === 0 ? (
            <p className="text-[15px] text-[#777777]">Материалы пока не опубликованы.</p>
          ) : (
            <div className="space-y-16">
              {/* First article — featured */}
              {authorArticles.length >= 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <ArticleCard article={authorArticles[0]} variant="featured" />
                  {authorArticles[1] && (
                    <ArticleCard article={authorArticles[1]} variant="featured" />
                  )}
                </div>
              )}

              {/* Rest — compact list */}
              {authorArticles.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t border-[#e5e5e5] pt-12">
                  {authorArticles.slice(2).map((a) => (
                    <ArticleCard key={a.id} article={a} variant="compact" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Other authors */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 bg-[#fafaf8] border-t border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10 pb-4 border-b border-[#e5e5e5]">
            <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium">
              Другие авторы
            </h2>
            <Link to="/avtory" className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors">
              Все авторы →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-8">
            {authors
              .filter((a) => a.id !== author.id)
              .slice(0, 3)
              .map((a) => (
                <Link
                  key={a.id}
                  to={`/author/${a.id}`}
                  className="group flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-[#f0f0ee] border border-[#e5e5e5] flex items-center justify-center">
                    <User className="w-6 h-6 text-[#c0beba]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-[17px] text-[#0f0f0f] group-hover:text-[#4a4a4a] transition-colors mb-1">
                      {a.name}
                    </p>
                    <p className="text-[13px] text-[#777777] line-clamp-2 leading-relaxed">
                      {a.bio}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
}
