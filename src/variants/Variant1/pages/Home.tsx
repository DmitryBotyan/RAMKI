import { Link } from 'react-router-dom';
import { articles, featuredArticles } from '../../../data/content';
import ArticleCard from '../components/ArticleCard';
import { Search } from 'lucide-react';

export default function Home() {
  const heroArticle = featuredArticles[0];
  const editorialPick = articles[7];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-14 sm:pt-16 lg:pt-20">
        <div className="h-[55vh] sm:h-[60vh] lg:h-[70vh] bg-[#d0d0d0] flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 max-w-4xl">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] tracking-tight mb-4 sm:mb-6">
              Федеральное деловое издание
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#2d2d2d] max-w-2xl mx-auto">
              О бизнесе, карьере, психологии и жизни. Глубокие материалы для тех, кто принимает решения.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 bg-[#fafaf8]">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
            <input
              type="text"
              placeholder="Поиск по материалам..."
              className="w-full pl-12 pr-4 py-4 text-[15px] border border-[#e5e5e5] bg-white rounded-[2px] focus:outline-none focus:border-[#0f0f0f] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Featured Articles - Mixed Layout */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-8 sm:mb-10 pb-4 border-b border-[#e5e5e5]">
            Главное сегодня
          </h2>
          
          {/* First featured - large */}
          {heroArticle && (
            <div className="mb-12">
              <ArticleCard article={heroArticle} variant="featured" />
            </div>
          )}

          {/* Two smaller featured in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredArticles.slice(1, 3).map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles - Horizontal Layout */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#e5e5e5] bg-[#fafaf8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#e5e5e5]">
            <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium">
              Последние материалы
            </h2>
            <Link
              to="/statji"
              className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors"
            >
              Все статьи →
            </Link>
          </div>

          {/* Mixed grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {articles.slice(3, 7).map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant={index === 0 ? 'horizontal' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Pick - Full Width Image */}
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-10">
            Выбор редакции
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {editorialPick && (
              <div className="lg:col-span-8">
                <ArticleCard article={editorialPick} variant="featured" />
              </div>
            )}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] mb-6">
                Быстрое чтение
              </h3>
              {articles.slice(8, 11).map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-8 sm:mb-10 text-center">
            Разделы
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {['Бизнес', 'Психология', 'Карьера', 'Финансы'].map((category) => (
              <Link
                key={category}
                to="/statji"
                className="group block p-4 sm:p-6 md:p-8 border border-[#e5e5e5] text-center hover:bg-[#fafaf8] transition-colors"
              >
                <span className="font-serif text-lg text-[#0f0f0f] group-hover:text-[#4a4a4a] transition-colors">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
