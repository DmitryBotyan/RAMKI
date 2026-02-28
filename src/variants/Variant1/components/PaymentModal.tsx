import { useState } from 'react';
import { X, Check, Download } from 'lucide-react';
import type { MagazineIssue } from '../../../types';

interface PaymentModalProps {
  issue: MagazineIssue;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ issue, isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="relative w-full max-w-md bg-white rounded-[2px] shadow-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-[#f5f5f5] rounded-[2px] transition-colors"
        >
          <X className="w-5 h-5 text-[#555555]" />
        </button>

        {step === 'form' && (
          <div className="p-8">
            <h3 className="font-serif text-xl text-[#0f0f0f] mb-2">
              Покупка выпуска
            </h3>
            <p className="text-[14px] text-[#555555] mb-6">
              {issue.number}: {issue.title}
            </p>
            <div className="text-3xl font-light text-[#0f0f0f] mb-8">
              {issue.price} ₽
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] uppercase tracking-wider text-[#6b6b6b] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 text-[15px] border border-[#d0d0d0] rounded-[2px] focus:outline-none focus:border-[#0f0f0f]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#0f0f0f] text-white text-[14px] font-medium rounded-[2px] hover:bg-[#1a1a1a] transition-colors"
              >
                Оплатить
              </button>
            </form>
            <p className="mt-4 text-[12px] text-[#777777] text-center">
              Тестовый режим — оплата не взимается
            </p>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-2 border-[#e5e5e5] border-t-[#0f0f0f] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[15px] text-[#555555]">
              Обработка платежа...
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-[#0f0f0f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif text-xl text-[#0f0f0f] mb-2">
              Оплата прошла успешно
            </h3>
            <p className="text-[14px] text-[#555555] mb-6">
              Чек отправлен на {email || 'ваш email'}
            </p>
            <a
              href="#"
              className="inline-flex items-center space-x-2 py-3 px-6 border border-[#0f0f0f] text-[14px] text-[#0f0f0f] rounded-[2px] hover:bg-[#f5f5f5] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Скачать PDF</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}