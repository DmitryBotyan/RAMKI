import { ecosystemBlocks, socialLinks } from '../../../data/content';
import { ArrowUpRight, Radio, Users, Handshake, Youtube, type LucideProps } from 'lucide-react';

const blockIcons: React.ComponentType<LucideProps>[] = [Radio, Users, Handshake, Youtube];

export default function Ecosystem() {
  return (
    <div className="min-h-screen bg-white pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal text-[#0f0f0f] leading-tight mb-6">
            Экосистема РАМКИ
          </h1>
          <p className="text-[18px] text-[#555555] leading-relaxed">
            Подкасты, мероприятия, партнёрства и сообщество. Мы создаём пространство для развития и нетворкинга.
          </p>
        </div>

        {/* Ecosystem Blocks with Images */}
        <div className="space-y-24">
          {ecosystemBlocks.map((block, index) => {
            const BlockIcon = blockIcons[index] ?? Radio;

            return (
            <div
              key={block.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] bg-[#f0f0ee] flex items-center justify-center overflow-hidden">
                  <BlockIcon className="w-16 h-16 text-[#c0beba]" />
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center space-x-3">
                  {index === 0 && <Radio className="w-5 h-5 text-[#6b6b6b]" />}
                  {index === 1 && <Users className="w-5 h-5 text-[#6b6b6b]" />}
                  {index === 2 && <Handshake className="w-5 h-5 text-[#6b6b6b]" />}
                  {index === 3 && <Youtube className="w-5 h-5 text-[#6b6b6b]" />}
                  <span className="text-[12px] uppercase tracking-wider text-[#6b6b6b]">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-normal text-[#0f0f0f]">
                  {block.title}
                </h2>
                <p className="text-[16px] text-[#555555] leading-relaxed">
                  {block.description}
                </p>
                <a
                  href={block.link}
                  className="inline-flex items-center space-x-2 text-[14px] font-medium text-[#0f0f0f] hover:text-[#4a4a4a] transition-colors group"
                >
                  <span>{block.linkText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="mt-32 pt-16 border-t border-[#e5e5e5]">
          <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-8">
            Мы в социальных сетях
          </h2>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="px-6 py-3 border border-[#e5e5e5] text-[14px] text-[#555555] rounded-[2px] hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
