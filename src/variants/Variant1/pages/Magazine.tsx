import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { magazineIssues } from '../../../data/content';
import PaymentModal from '../components/PaymentModal';
import type { MagazineIssue } from '../../../types';

function MagazineCoverPlaceholder({ number, title }: { number: string; title: string }) {
  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center gap-4 px-8 text-center">
      <BookOpen className="w-10 h-10 text-white/25" />
      <span className="font-serif text-white/80 text-2xl tracking-wider">РАМКИ</span>
      <span className="text-white/40 text-[13px] uppercase tracking-widest">{number}</span>
      <span className="text-white/30 text-[12px] leading-snug mt-1">{title}</span>
    </div>
  );
}

export default function Magazine() {
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const latestIssue = magazineIssues[0];

  const handleBuy = (issue: MagazineIssue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-normal text-[#0f0f0f] leading-tight mb-6">
            Журнал РАМКИ
          </h1>
          <p className="text-[17px] text-[#555555] leading-relaxed">
            Печатные и электронные выпуски с глубокими материалами и эксклюзивными интервью.
          </p>
        </div>

        {/* Featured Issue - Large */}
        {latestIssue && (
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none overflow-hidden shadow-sm">
                <MagazineCoverPlaceholder number={latestIssue.number} title={latestIssue.title} />
              </div>
              <div className="space-y-6 text-center lg:text-left">
                <span className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium">
                  {latestIssue.number} — Последний выпуск
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-[#0f0f0f] leading-tight">
                  {latestIssue.title}
                </h2>
                <p className="text-[18px] text-[#555555]">
                  {latestIssue.price} ₽
                </p>
                <button
                  onClick={() => handleBuy(latestIssue)}
                  className="px-8 py-3.5 bg-[#0f0f0f] text-white text-[14px] rounded-[2px] hover:bg-[#222] transition-colors"
                >
                  Купить электронную версию
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Archive Issues Grid */}
        <div className="border-t border-[#e5e5e5] pt-16">
          <h2 className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium mb-10">
            Архив выпусков
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {magazineIssues.slice(1).map((issue) => (
              <div key={issue.id} className="group text-center">
                {/* Cover */}
                <div className="relative mb-6 overflow-hidden aspect-[3/4]">
                  <MagazineCoverPlaceholder number={issue.number} title={issue.title} />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <span className="text-[12px] uppercase tracking-wider text-[#6b6b6b] font-medium">
                    {issue.number}
                  </span>
                  <h3 className="font-serif text-lg text-[#0f0f0f] leading-snug">
                    {issue.title}
                  </h3>
                  <p className="text-[15px] text-[#555555]">
                    {issue.price} ₽
                  </p>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => handleBuy(issue)}
                  className="mt-5 px-6 py-2.5 border border-[#0f0f0f] text-[13px] text-[#0f0f0f] rounded-[2px] hover:bg-[#0f0f0f] hover:text-white transition-colors"
                >
                  Купить
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedIssue && (
        <PaymentModal
          issue={selectedIssue}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIssue(null);
          }}
        />
      )}
    </div>
  );
}
