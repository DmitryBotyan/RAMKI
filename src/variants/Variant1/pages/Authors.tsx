import { authors } from '../../../data/content';
import AuthorCard from '../components/AuthorCard';

export default function Authors() {
  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-28 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 lg:mb-24">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-[#0f0f0f] leading-tight mb-4 sm:mb-6">
              Среди наших авторов
            </h1>
          </div>
          <div className="lg:pt-4">
            <p className="text-[15px] sm:text-[17px] text-[#555555] leading-relaxed max-w-lg">
              Эксперты, практики и мыслители, создающие материалы для РАМКИ.{' '}
              Каждый автор — профессионал с уникальным опытом и взглядом.
            </p>
          </div>
        </div>

        {/* Authors Grid - Featured First */}
        <div className="space-y-12 sm:space-y-16">
          {/* First 2 authors - large cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
            {authors.slice(0, 2).map((author) => (
              <AuthorCard key={author.id} author={author} variant="featured" />
            ))}
          </div>

          {/* Next 4 authors - regular grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-16 gap-y-8 sm:gap-y-10 border-t border-[#e5e5e5] pt-12 sm:pt-16">
            {authors.slice(2, 6).map((author) => (
              <AuthorCard key={author.id} author={author} variant="default" />
            ))}
          </div>

          {/* Remaining - compact list */}
          {authors.length > 6 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-16 border-t border-[#e5e5e5] pt-12 sm:pt-16">
              {authors.slice(6).map((author) => (
                <AuthorCard key={author.id} author={author} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
