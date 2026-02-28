import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import type { Author } from '../../../types';

interface AuthorCardProps {
  author: Author;
  variant?: 'default' | 'featured' | 'compact';
}

export default function AuthorCard({ author, variant = 'default' }: AuthorCardProps) {
  if (variant === 'featured') {
    return (
      <Link 
        to={`/author/${author.id}`}
        className="group block"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 aspect-square bg-[#f0f0ee] flex items-center justify-center">
            <User className="w-20 h-20 text-[#c0beba]" />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h3 className="font-serif text-3xl lg:text-4xl font-bold text-[#0f0f0f] group-hover:text-[#4a4a4a] transition-colors mb-4">
              {author.name}
            </h3>
            <p className="text-[16px] text-[#555555] italic leading-relaxed">
              {author.bio}
            </p>
            <span className="mt-6 text-[13px] text-[#777777] group-hover:text-[#0f0f0f] transition-colors">
              Все материалы автора →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link 
        to={`/author/${author.id}`}
        className="group flex items-center gap-4 py-4"
      >
        <div className="flex-shrink-0 w-12 h-12 bg-[#f0f0ee] border border-[#e5e5e5] flex items-center justify-center">
          <User className="w-5 h-5 text-[#c0beba]" />
        </div>
        <div>
          <h3 className="font-serif text-[16px] font-bold text-[#0f0f0f] group-hover:text-[#4a4a4a] transition-colors">
            {author.name}
          </h3>
          <p className="text-[13px] text-[#777777] italic line-clamp-1">
            {author.bio}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/author/${author.id}`}
      className="group block"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-16 h-16 bg-[#f0f0ee] border border-[#e5e5e5] flex items-center justify-center">
          <User className="w-7 h-7 text-[#c0beba]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-[18px] font-bold text-[#0f0f0f] group-hover:text-[#4a4a4a] transition-colors">
            {author.name}
          </h3>
          <p className="mt-1 text-[14px] text-[#777777] italic leading-relaxed line-clamp-2">
            {author.bio}
          </p>
        </div>
      </div>
    </Link>
  );
}
