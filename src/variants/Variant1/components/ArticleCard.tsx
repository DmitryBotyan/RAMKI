import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Briefcase, Award, Building2, Coffee, Monitor, Leaf, Rocket, FileText } from 'lucide-react';
import type { Article } from '../../../types';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Психология': Brain,
  'Финансы и право': TrendingUp,
  'Бизнес': Briefcase,
  'Карьера и развитие': Award,
  'Карьера': Award,
  'Недвижимость': Building2,
  'Лайфстайл': Coffee,
  'Digital': Monitor,
  'ESG': Leaf,
  'Стартап': Rocket,
  'События': FileText,
};

function ArticleImagePlaceholder({ category, className }: { category: string; className?: string }) {
  const Icon = categoryIcons[category] ?? FileText;
  return (
    <div className={`w-full h-full bg-[#f0f0ee] flex flex-col items-center justify-center gap-3 ${className ?? ''}`}>
      <Icon className="w-10 h-10 text-[#c0beba]" />
      <span className="text-[10px] uppercase tracking-widest text-[#c0beba] font-medium">{category}</span>
    </div>
  );
}

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <article className="group">
        <Link to={`/article/${article.id}`} className="block">
          <div className="relative mb-4 sm:mb-6 overflow-hidden aspect-[16/10]">
            <ArticleImagePlaceholder category={article.category} />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <span className="text-[11px] uppercase tracking-wider text-[#6b6b6b] font-medium">
              {article.category}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#0f0f0f] leading-tight group-hover:text-[#4a4a4a] transition-colors">
              {article.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center space-x-4 text-[12px] text-[#777777]">
              <span>{article.date}</span>
              <span className="text-[#d0d0d0]">•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group">
        <Link to={`/article/${article.id}`} className="block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 relative overflow-hidden aspect-[4/3]">
              <ArticleImagePlaceholder category={article.category} />
            </div>
            <div className="md:col-span-2 space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#6b6b6b] font-medium">
                {article.category}
              </span>
              <h3 className="font-serif text-xl font-normal text-[#0f0f0f] leading-snug group-hover:text-[#4a4a4a] transition-colors">
                {article.title}
              </h3>
              <p className="text-[14px] text-[#555555] leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center space-x-4 text-[12px] text-[#777777]">
                <span>{article.date}</span>
                <span className="text-[#d0d0d0]">•</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group py-4 sm:py-5 border-b border-[#e5e5e5] last:border-b-0">
        <Link to={`/article/${article.id}`} className="block">
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden">
              <ArticleImagePlaceholder category={article.category} />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#6b6b6b]">
                <span className="uppercase tracking-wider">{article.category}</span>
                <span className="text-[#d0d0d0]">•</span>
                <span>{article.date}</span>
              </div>
              <h3 className="font-serif text-[16px] sm:text-lg text-[#0f0f0f] leading-snug group-hover:text-[#4a4a4a] transition-colors line-clamp-3">
                {article.title}
              </h3>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link to={`/article/${article.id}`} className="block">
        <div className="relative mb-4 overflow-hidden aspect-[16/10]">
          <ArticleImagePlaceholder category={article.category} />
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-[11px] text-[#6b6b6b]">
            <span className="uppercase tracking-wider font-medium">{article.category}</span>
            <span className="text-[#d0d0d0]">•</span>
            <span>{article.date}</span>
          </div>
          <h3 className="font-serif text-xl lg:text-[22px] font-normal text-[#0f0f0f] leading-snug group-hover:text-[#4a4a4a] transition-colors">
            {article.title}
          </h3>
          <p className="text-[14px] text-[#555555] leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center space-x-4 text-[12px] text-[#777777]">
            <span>{article.readTime}</span>
            {article.author && (
              <>
                <span className="text-[#d0d0d0]">•</span>
                <span>{article.author}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
