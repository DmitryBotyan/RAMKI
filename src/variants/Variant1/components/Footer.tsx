import { Link } from 'react-router-dom';
import { navItems, socialLinks } from '../../../data/content';

export default function Footer() {
  return (
    <footer className="bg-[#fafaf8] border-t border-[#e5e5e5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="font-serif text-2xl font-bold tracking-tight text-[#0f0f0f]"
            >
              РАМКИ
            </Link>
            <p className="mt-4 text-[13px] text-[#555555] leading-relaxed">
              Федеральное деловое издание о бизнесе, карьере, психологии и жизни.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#555555] hover:text-[#0f0f0f] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[12px] font-medium uppercase tracking-wider text-[#0f0f0f] mb-4">
              Разделы
            </h3>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-[12px] font-medium uppercase tracking-wider text-[#0f0f0f] mb-4">
              Контакты
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:ramki.mag@yandex.ru"
                  className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors"
                >
                  ramki.mag@yandex.ru
                </a>
              </li>
              <li className="text-[13px] text-[#555555]">ИП Лахина О.А.</li>
              <li className="text-[13px] text-[#777777] italic">
                Свидетельство о регистрации СМИ
              </li>
            </ul>
          </div>

          {/* Useful links */}
          <div>
            <h3 className="text-[12px] font-medium uppercase tracking-wider text-[#0f0f0f] mb-4">
              Полезное
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/avtory" className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors">
                  Авторы
                </Link>
              </li>
              <li>
                <Link to="/zhurnal" className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors">
                  Журнал
                </Link>
              </li>
              <li>
                <Link to="/ekosistema" className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors">
                  Экосистема
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-[13px] text-[#555555] hover:text-[#0f0f0f] transition-colors">
                  Правовая информация
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Links */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#e5e5e5]">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#777777]">
            <Link to="/legal/terms" className="hover:text-[#0f0f0f] transition-colors">
              Пользовательское соглашение
            </Link>
            <span className="text-[#d0d0d0]">•</span>
            <Link to="/legal/privacy" className="hover:text-[#0f0f0f] transition-colors">
              Политика конфиденциальности
            </Link>
            <span className="text-[#d0d0d0]">•</span>
            <Link to="/legal/cookies" className="hover:text-[#0f0f0f] transition-colors">
              Куки
            </Link>
            <span className="text-[#d0d0d0]">•</span>
            <Link to="/legal/offer" className="hover:text-[#0f0f0f] transition-colors">
              Оферта
            </Link>
            <span className="text-[#d0d0d0]">•</span>
            <Link to="/legal/reprint" className="hover:text-[#0f0f0f] transition-colors">
              Перепечатка
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-[#999999]">
            © 2026 РАМКИ. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
