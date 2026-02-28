import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { navItems } from '../../../data/content';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e5e5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-[#0f0f0f] hover:text-[#4a4a4a] transition-colors"
          >
            РАМКИ
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[13px] tracking-wide transition-colors ${
                  isActive(item.path)
                    ? 'text-[#0f0f0f] font-medium'
                    : 'text-[#555555] hover:text-[#0f0f0f]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    className="w-32 sm:w-40 lg:w-56 px-3 py-1.5 text-sm border border-[#d0d0d0] rounded-[2px] focus:outline-none focus:border-[#0f0f0f]"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    aria-label="Закрыть поиск"
                    className="ml-2 p-1 hover:bg-[#f5f5f5] rounded-[2px] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-[#555555]" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openSearch}
                  aria-label="Открыть поиск"
                  className="p-2 hover:bg-[#f5f5f5] rounded-[2px] transition-colors cursor-pointer"
                >
                  <Search className="w-[18px] h-[18px] text-[#555555]" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#f5f5f5] rounded-[2px] transition-colors cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#0f0f0f]" />
              ) : (
                <Menu className="w-5 h-5 text-[#555555]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-[#e5e5e5] bg-white">
          <div className="px-4 sm:px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 text-[15px] ${
                  isActive(item.path)
                    ? 'text-[#0f0f0f] font-medium'
                    : 'text-[#555555]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
