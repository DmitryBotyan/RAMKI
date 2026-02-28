import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setTimeout(() => setStatus('done'), 900);
  };

  return (
    <section className="bg-[#0f0f0f] px-4 sm:px-6 lg:px-12 py-12 sm:py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* Left: copy */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#666666] font-medium block mb-4">
              Рассылка РАМКИ
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight mb-4">
              Лучшие материалы — раз в неделю
            </h2>
            <p className="text-[15px] text-[#777777] leading-relaxed max-w-sm">
              Бизнес, карьера, психология и развитие. Только глубокие материалы, никакого спама.
            </p>
          </div>

          {/* Right: form */}
          <div>
            {status === 'done' ? (
              <div className="flex items-center gap-3 text-white text-[15px]">
                <div className="w-9 h-9 bg-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-[#0f0f0f]" />
                </div>
                Вы подписаны. Спасибо!
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ваш@email.ru"
                    required
                    className="flex-1 min-w-0 px-4 py-3.5 text-[15px] bg-white/8 border border-white/15 text-white placeholder:text-[#555555] focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="sm:flex-shrink-0 flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0f0f0f] text-[14px] font-medium hover:bg-[#e8e8e8] transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Отправка…' : (
                      <>Подписаться <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
                <p className="mt-4 text-[11px] text-[#4a4a4a] leading-relaxed">
                  Нажимая «Подписаться», вы соглашаетесь с{' '}
                  <Link
                    to="/legal/privacy"
                    className="text-[#666666] hover:text-white transition-colors underline underline-offset-2"
                  >
                    политикой конфиденциальности
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
