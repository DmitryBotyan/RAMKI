import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Brain, TrendingUp, Briefcase, Award, Building2, Coffee,
  Monitor, Leaf, Rocket, FileText, User, Clock, Calendar,
  Share2, Copy, Check, ChevronRight, Image,
} from 'lucide-react';
import { articles, authors } from '../../../data/content';
import ArticleCard from '../components/ArticleCard';
import type { ArticleBodyBlock } from '../../../types';

// ── Category → icon mapping ──────────────────────────────────────────────────
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Психология':        Brain,
  'Финансы и право':   TrendingUp,
  'Бизнес':            Briefcase,
  'Карьера и развитие':Award,
  'Карьера':           Award,
  'Недвижимость':      Building2,
  'Лайфстайл':         Coffee,
  'Digital':           Monitor,
  'ESG':               Leaf,
  'Стартап':           Rocket,
  'События':           FileText,
};

// ── JSON-LD injection ─────────────────────────────────────────────────────────
function useStructuredData(article: (typeof articles)[0] | undefined) {
  useEffect(() => {
    if (!article) return;

    document.title = `${article.title} — РАМКИ`;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.lede ?? article.excerpt,
      datePublished: new Date().toISOString().split('T')[0],
      author: { '@type': 'Person', name: article.author ?? 'Редакция РАМКИ' },
      publisher: {
        '@type': 'Organization',
        name: 'РАМКИ',
        logo: { '@type': 'ImageObject', url: `${window.location.origin}/logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': window.location.href },
      articleSection: article.category,
      keywords: article.tags?.join(', '),
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Статьи',  item: `${window.location.origin}/statji` },
        { '@type': 'ListItem', position: 3, name: article.category },
        { '@type': 'ListItem', position: 4, name: article.title },
      ],
    };

    const scripts: HTMLScriptElement[] = [];
    [articleSchema, breadcrumbSchema].forEach((data) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.text = JSON.stringify(data);
      document.head.appendChild(el);
      scripts.push(el);
    });

    return () => scripts.forEach((el) => document.head.removeChild(el));
  }, [article]);
}

// ── Body block renderer ───────────────────────────────────────────────────────
function renderBlock(block: ArticleBodyBlock, index: number, category: string) {
  const CategoryIcon = categoryIcons[category] ?? FileText;

  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-[15px] sm:text-[17px] leading-[1.8] text-[#2d2d2d] mb-6 sm:mb-7">
          {block.text}
        </p>
      );
    case 'h2':
      return (
        <h2 key={index} className="font-serif text-2xl lg:text-[28px] font-normal text-[#0f0f0f] leading-snug mt-14 mb-5 pb-3 border-b border-[#e5e5e5]">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={index} className="font-serif text-xl font-normal text-[#0f0f0f] mt-9 mb-3">
          {block.text}
        </h3>
      );
    case 'blockquote':
      return (
        <blockquote key={index} className="relative my-8 sm:my-10 pl-4 sm:pl-8 border-l-[3px] border-[#0f0f0f]">
          <p className="font-serif text-[18px] sm:text-xl lg:text-2xl text-[#0f0f0f] italic leading-relaxed">
            {block.text}
          </p>
          {block.attribution && (
            <cite className="block mt-4 text-[13px] text-[#777777] not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case 'list':
      return (
        <ul key={index} className="my-7 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 sm:gap-4 text-[15px] sm:text-[17px] text-[#2d2d2d] leading-[1.7]">
              <span className="flex-shrink-0 mt-[5px] w-5 h-5 border border-[#c0c0c0] flex items-center justify-center text-[11px] text-[#999]">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure key={index} className="my-10 -mx-4 sm:mx-0">
          <div className="aspect-[16/9] bg-[#f0f0ee] flex flex-col items-center justify-center gap-4">
            <CategoryIcon className="w-12 h-12 text-[#c0beba]" />
            <Image className="w-5 h-5 text-[#d8d4d0]" />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-[13px] text-[#888888] text-center leading-relaxed px-4">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}

// ── Share button ──────────────────────────────────────────────────────────────
function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {/* ignore */}
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] uppercase tracking-wider text-[#999999] mr-1">
        Поделиться
      </span>
      {/* VK */}
      <a
        href={`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Поделиться ВКонтакте"
        className="w-9 h-9 border border-[#e5e5e5] flex items-center justify-center text-[#555555] hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors text-[13px] font-medium"
      >
        VK
      </a>
      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Поделиться в Telegram"
        className="w-9 h-9 border border-[#e5e5e5] flex items-center justify-center text-[#555555] hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
        </svg>
      </a>
      {/* Copy */}
      <button
        onClick={handleCopy}
        aria-label="Скопировать ссылку"
        className="w-9 h-9 border border-[#e5e5e5] flex items-center justify-center text-[#555555] hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4 text-[#0f0f0f]" /> : <Copy className="w-4 h-4" />}
      </button>
      {copied && (
        <span className="text-[12px] text-[#555555] animate-pulse">Скопировано</span>
      )}
    </div>
  );
}

// ── Main page component ───────────────────────────────────────────────────────
export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);
  const author = article?.authorId ? authors.find((a) => a.id === article.authorId) : undefined;

  useStructuredData(article);

  // Scroll to top on navigation
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <p className="font-serif text-3xl text-[#0f0f0f] mb-4">Статья не найдена</p>
          <Link to="/statji" className="text-[14px] text-[#555555] hover:text-[#0f0f0f] transition-colors">
            ← Вернуться к статьям
          </Link>
        </div>
      </div>
    );
  }

  const CategoryIcon = categoryIcons[article.category] ?? FileText;

  // Related: same category, excluding current
  const related = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  const fallbackRelated = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3 - related.length);
  const relatedArticles = [...related, ...fallbackRelated].slice(0, 3);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Breadcrumbs ──────────────────────────────────────────────────── */}
      <nav
        aria-label="Хлебные крошки"
        className="pt-20 sm:pt-24 lg:pt-32 pb-6 px-4 sm:px-6 lg:px-12 border-b border-[#f0f0f0]"
      >
        <ol className="flex flex-wrap items-center gap-1.5 max-w-[1400px] mx-auto text-[12px] text-[#888888]">
          <li>
            <Link to="/" className="hover:text-[#0f0f0f] transition-colors">
              Главная
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li>
            <Link to="/statji" className="hover:text-[#0f0f0f] transition-colors">
              Статьи
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li>
            <Link to="/statji" className="hover:text-[#0f0f0f] transition-colors">
              {article.category}
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
          <li className="text-[#555555] line-clamp-1 max-w-[160px] sm:max-w-[260px]" aria-current="page">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* ── Article header ────────────────────────────────────────────────── */}
      <header className="px-4 sm:px-6 lg:px-12 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="max-w-[720px] mx-auto">

          {/* Category tag */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#6b6b6b] font-medium">
              <CategoryIcon className="w-3.5 h-3.5" />
              {article.category}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#0f0f0f] leading-[1.15] tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Lede */}
          {article.lede && (
            <p className="text-[16px] sm:text-[18px] lg:text-[21px] text-[#444444] leading-[1.65] font-light mb-8 border-l-[3px] border-[#e5e5e5] pl-4 sm:pl-5">
              {article.lede}
            </p>
          )}

          {/* Meta line: author · date · readtime */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#777777] pt-6 border-t border-[#e5e5e5]">
            {article.author && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#f0f0ee] border border-[#e5e5e5] flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-[#c0beba]" />
                </div>
                {author ? (
                  <Link
                    to={`/author/${author.id}`}
                    className="hover:text-[#0f0f0f] transition-colors"
                  >
                    {article.author}
                  </Link>
                ) : (
                  <span>{article.author}</span>
                )}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime} чтения</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero image ───────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-12 pb-8 sm:pb-10">
        <div className="max-w-[960px] mx-auto">
          <div className="aspect-[16/9] bg-[#f0f0ee] flex flex-col items-center justify-center gap-4">
            <CategoryIcon className="w-14 h-14 text-[#c0beba]" />
            <span className="text-[11px] uppercase tracking-widest text-[#c8c4c0] font-medium">
              {article.category}
            </span>
          </div>
        </div>
      </div>

      {/* ── Top share bar ────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-12 pb-8 sm:pb-10">
        <div className="max-w-[720px] mx-auto flex items-center justify-between">
          <ShareButtons title={article.title} />
          <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#aaaaaa]">
            <Share2 className="w-3.5 h-3.5" />
            Поделитесь с коллегами
          </span>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-[720px] mx-auto">
          {article.body && article.body.length > 0 ? (
            <div>
              {article.body.map((block, i) => renderBlock(block, i, article.category))}
            </div>
          ) : (
            /* Fallback: show excerpt if no body */
            <p className="text-[17px] leading-[1.8] text-[#2d2d2d]">{article.excerpt}</p>
          )}
        </div>
      </div>

      {/* ── Tags + Share footer ───────────────────────────────────────────── */}
      <footer className="px-4 sm:px-6 lg:px-12 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="max-w-[720px] mx-auto border-t border-[#e5e5e5] pt-8">

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 border border-[#e5e5e5] text-[12px] text-[#666666] hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <ShareButtons title={article.title} />
        </div>
      </footer>

      {/* ── Author block ─────────────────────────────────────────────────── */}
      {author && (
        <section
          aria-label="Об авторе"
          className="px-4 sm:px-6 lg:px-12 py-8 sm:py-10 border-t border-[#e5e5e5]"
        >
          <div className="max-w-[720px] mx-auto">
            <p className="text-[11px] uppercase tracking-wider text-[#999999] mb-6">Об авторе</p>
            <Link
              to={`/author/${author.id}`}
              className="group flex gap-5 items-start"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-[#f0f0ee] border border-[#e5e5e5] flex items-center justify-center">
                <User className="w-7 h-7 text-[#c0beba]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-[20px] text-[#0f0f0f] group-hover:text-[#4a4a4a] transition-colors mb-1">
                  {author.name}
                </h3>
                <p className="text-[14px] text-[#666666] leading-relaxed mb-3">
                  {author.bio}
                </p>
                <span className="text-[13px] text-[#777777] group-hover:text-[#0f0f0f] transition-colors">
                  Все материалы автора →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Related articles ─────────────────────────────────────────────── */}
      <section
        aria-label="Читайте также"
        className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 border-t border-[#e5e5e5] bg-[#fafaf8]"
      >
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-10 pb-4 border-b border-[#e5e5e5]">
            Читайте также
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.id} article={a} variant="default" />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
