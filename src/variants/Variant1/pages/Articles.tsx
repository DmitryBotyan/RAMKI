import { useState } from 'react';
import { articles, articleCategories } from '../../../data/content';
import ArticleCard from '../components/ArticleCard';

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState('Все');

  const filteredArticles = activeCategory === 'Все' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="font-serif text-4xl lg:text-5xl font-normal text-[#0f0f0f] leading-tight mb-6">
            Статьи
          </h1>
          <p className="text-[17px] text-[#555555] leading-relaxed">
            Глубокие материалы о бизнесе, карьере, психологии и личностном развитии.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-[#e5e5e5] mb-12 overflow-x-auto">
          <div className="flex space-x-8 min-w-max pb-px">
            {articleCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-4 text-[14px] transition-colors relative ${
                  activeCategory === category
                    ? 'text-[#0f0f0f] font-medium'
                    : 'text-[#777777] hover:text-[#0f0f0f]'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#0f0f0f]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid - Mixed Layout */}
        <div className="space-y-16">
          {/* First row - 2 large articles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredArticles.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>

          {/* Second row - 3 medium articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(2, 5).map((article) => (
              <ArticleCard key={article.id} article={article} variant="default" />
            ))}
          </div>

          {/* Third row - Horizontal layout */}
          <div className="space-y-8 border-t border-[#e5e5e5] pt-12">
            {filteredArticles.slice(5, 8).map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>

          {/* Remaining - Compact list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t border-[#e5e5e5] pt-12">
            {filteredArticles.slice(8).map((article) => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center pt-16">
          <button className="px-8 py-3.5 border border-[#0f0f0f] text-[14px] text-[#0f0f0f] rounded-[2px] hover:bg-[#0f0f0f] hover:text-white transition-colors">
            Загрузить ещё
          </button>
        </div>
      </div>
    </div>
  );
}
