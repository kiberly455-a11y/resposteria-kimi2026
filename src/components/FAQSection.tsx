import React, { useState } from 'react';
import { FAQ } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id || null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-[#FFF8E7] dark:from-[#2d2420] dark:to-[#1a1412] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8BBD0]/30 text-[#F48FB1] font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Claras</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
            Preguntas Frecuentes
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#F8BBD0] to-[#D4AF37] mx-auto rounded-full" />
          <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80">
            Resolvemos tus dudas principales para que tu experiencia de pedido sea perfecta de principio a fin.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((f) => {
            const isOpen = openId === f.id;
            return (
              <div
                key={f.id}
                className="bg-white dark:bg-[#2d2420] rounded-2xl border border-[#F8BBD0]/30 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(f.id)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-[#6D4C41] dark:text-[#EFEBE9] hover:text-[#F48FB1] transition-colors cursor-pointer"
                >
                  <span>{f.pregunta}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#F48FB1] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed border-t border-[#6D4C41]/5 dark:border-[#D7CCC8]/5 pt-3 animate-fadeIn">
                    {f.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
