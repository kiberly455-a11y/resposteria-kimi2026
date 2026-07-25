import React, { useState, useEffect } from 'react';
import { Promocion } from '../types';
import { Gift, Tag, Users, Clock, Sparkles, FileDown } from 'lucide-react';
import { generatePromoPDF } from '../lib/pdfExport';

interface PromocionesProps {
  promociones: Promocion[];
  onSelectPromo: (promo: Promocion) => void;
}

export const Promociones: React.FC<PromocionesProps> = ({ promociones, onSelectPromo }) => {
  const [timeLeft, setTimeLeft] = useState({
    dias: 2,
    hrs: 14,
    min: 35,
    seg: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { dias, hrs, min, seg } = prev;
        if (seg > 0) {
          seg--;
        } else {
          seg = 59;
          if (min > 0) {
            min--;
          } else {
            min = 59;
            if (hrs > 0) {
              hrs--;
            } else {
              hrs = 23;
              if (dias > 0) dias--;
            }
          }
        }
        return { dias, hrs, min, seg };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gift':
        return <Gift className="w-8 h-8 text-white" />;
      case 'Tag':
        return <Tag className="w-8 h-8 text-white" />;
      default:
        return <Users className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section id="promociones" className="py-20 bg-gradient-to-br from-[#F8BBD0] via-[#F48FB1] to-[#CE93D8] text-white relative overflow-hidden">
      {/* Decorative ambient blur circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ofertas por Tiempo Limitado</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Promociones Especiales
          </h2>
          <div className="w-16 h-1 bg-white mx-auto rounded-full" />
          <p className="text-sm text-white/90">
            Aprovecha nuestros paquetes especiales y descuentos para consentir a quienes más quieres al mejor precio.
          </p>
          <div className="pt-2">
            <button
              onClick={() => generatePromoPDF(promociones)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#6D4C41] hover:bg-[#FFF8E7] font-bold text-xs shadow-lg transition-all cursor-pointer hover:scale-105"
            >
              <FileDown className="w-4 h-4 text-[#F48FB1]" />
              <span>Descargar Folleto de Cupones en PDF</span>
            </button>
          </div>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promociones.map((p) => (
            <div
              key={p.id}
              className="bg-white/95 dark:bg-[#2d2420]/95 backdrop-blur-md text-[#6D4C41] dark:text-[#EFEBE9] p-8 rounded-3xl shadow-2xl flex flex-col justify-between text-center relative overflow-hidden border border-white/50 group hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D4AF37] to-[#F48FB1]" />

              <div className="space-y-4">
                {/* Icon Blob */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                  {getIcon(p.icono)}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                  {p.titulo}
                </h3>

                <p className="text-xs text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed">
                  {p.desc}
                </p>

                {/* Discount Badge */}
                <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-bold text-sm shadow-md">
                  {p.descuento}
                </div>

                {/* Live Countdown Timer */}
                <div className="pt-2">
                  <div className="flex justify-center gap-2 text-center">
                    <div className="bg-[#FFF8E7] dark:bg-[#1a1412] px-3 py-2 rounded-xl min-w-[50px] shadow-inner">
                      <div className="font-serif text-lg font-bold text-[#F48FB1]">
                        {String(timeLeft.dias).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-500">Días</div>
                    </div>
                    <div className="bg-[#FFF8E7] dark:bg-[#1a1412] px-3 py-2 rounded-xl min-w-[50px] shadow-inner">
                      <div className="font-serif text-lg font-bold text-[#F48FB1]">
                        {String(timeLeft.hrs).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-500">Hrs</div>
                    </div>
                    <div className="bg-[#FFF8E7] dark:bg-[#1a1412] px-3 py-2 rounded-xl min-w-[50px] shadow-inner">
                      <div className="font-serif text-lg font-bold text-[#F48FB1]">
                        {String(timeLeft.min).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-500">Min</div>
                    </div>
                    <div className="bg-[#FFF8E7] dark:bg-[#1a1412] px-3 py-2 rounded-xl min-w-[50px] shadow-inner">
                      <div className="font-serif text-lg font-bold text-[#F48FB1]">
                        {String(timeLeft.seg).padStart(2, '0')}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-500">Seg</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[11px] text-[#F48FB1] font-semibold mt-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>¡Quedan pocas existencias!</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6">
                <button
                  onClick={() => onSelectPromo(p)}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white font-semibold text-xs shadow-md hover:shadow-lg hover:scale-102 transition-all cursor-pointer"
                >
                  Aprovechar Promoción
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
