import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export const FloatingControls: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('¡Hola! Me gustaría hacer una consulta sobre los pasteles y postres de Dulces Capricho Mágico.');
    window.open(`https://wa.me/5215512345678?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Volver arriba"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer animate-fadeIn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp Floating */}
      <button
        onClick={openWhatsApp}
        title="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer animate-bounce"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
