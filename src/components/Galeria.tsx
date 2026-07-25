import React, { useState } from 'react';
import { GaleriaItem } from '../types';
import { X, ZoomIn, Camera } from 'lucide-react';

interface GaleriaProps {
  items: GaleriaItem[];
}

export const Galeria: React.FC<GaleriaProps> = ({ items }) => {
  const [selectedImg, setSelectedImg] = useState<GaleriaItem | null>(null);

  return (
    <section id="galeria" className="py-20 bg-[#FFF8E7] dark:bg-[#1a1412] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8BBD0]/30 text-[#F48FB1] font-bold text-xs uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Nuestras Obras de Arte</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
            Galería Dulce
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#F8BBD0] to-[#D4AF37] mx-auto rounded-full" />
          <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80">
            Un vistazo a nuestras creaciones más bellas y los momentos inolvidables que hemos endulzado para nuestros clientes.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          {items.map((g) => (
            <div
              key={g.id}
              onClick={() => setSelectedImg(g)}
              className={`group relative rounded-3xl overflow-hidden shadow-md cursor-pointer border border-[#F8BBD0]/20 ${
                g.tall ? 'md:row-span-2' : ''
              } ${g.wide ? 'md:col-span-2' : ''}`}
            >
              <img
                src={g.img}
                alt={g.titulo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-left text-white">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-auto text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold">{g.titulo}</h3>
                <p className="text-xs text-white/80">{g.subtitulo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImg(null)}
        >
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg.img}
              alt={selectedImg.titulo}
              className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <h3 className="font-serif text-2xl font-bold">{selectedImg.titulo}</h3>
              <p className="text-sm text-gray-300">{selectedImg.subtitulo}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
