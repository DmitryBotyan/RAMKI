import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const STORAGE_KEY = 'ramki-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании файлов cookie"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none"
    >
      <div className="max-w-[680px] mx-auto pointer-events-auto">
        <div className="bg-white border border-[#e5e5e5] shadow-[0_-2px_24px_rgba(0,0,0,0.08)] px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] text-[#333333] leading-relaxed">
                Мы используем куки для корректной работы сайта и анализа аудитории.{' '}
                <Link
                  to="/legal/cookies"
                  className="underline underline-offset-2 text-[#555555] hover:text-[#0f0f0f] transition-colors whitespace-nowrap"
                >
                  Подробнее
                </Link>
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={accept}
                  className="px-5 py-2 bg-[#0f0f0f] text-white text-[13px] hover:bg-[#222] transition-colors cursor-pointer"
                >
                  Принять все
                </button>
                <button
                  onClick={decline}
                  className="px-5 py-2 border border-[#d0d0d0] text-[#555555] text-[13px] hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors cursor-pointer"
                >
                  Только необходимые
                </button>
              </div>
            </div>
            <button
              onClick={decline}
              aria-label="Закрыть"
              className="flex-shrink-0 p-1 text-[#aaaaaa] hover:text-[#0f0f0f] transition-colors mt-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
