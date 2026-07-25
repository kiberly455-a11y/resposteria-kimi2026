import React from 'react';
import { Producto } from '../types';
import { Star, Flame, ShoppingBag } from 'lucide-react';

interface DestacadosProps {
  productos: Producto[];
  onAddToCart: (producto: Producto, cantidad: number, notas: string) => void;
}

export const Destacados: React.FC<DestacadosProps> = ({ productos, onAddToCart }) => {
  // Top 3 bestsellers
  const bestsellers = productos.slice(0, 3);

  return (
    <section id="destacados" className="py-20 bg-white dark:bg-[#2d2420] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Los Favoritos de la Casa
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
            Productos Destacados
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F48FB1] mx-auto rounded-full" />
          <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80">
            Los postres más aclamados y queridos por nuestros clientes. ¡Prueba el preferido de todos!
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestsellers.map((item, index) => (
            <div
              key={item.id}
              className="bg-[#FFF8E7] dark:bg-[#1a1412] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-[#F8BBD0]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
            >
              <div>
                {/* Image & Rank Badge */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={item.img}
                    alt={item.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-white font-serif font-extrabold text-lg flex items-center justify-center shadow-lg border-2 border-white">
                    #{index + 1}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 text-left space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#6D4C41] dark:text-[#EFEBE9] group-hover:text-[#F48FB1] transition-colors">
                    {item.nombre}
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 ml-1">
                      (5.0 / 5)
                    </span>
                  </div>

                  <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 leading-relaxed line-clamp-2">
                    {item.descripcion}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#6D4C41]/5 dark:border-[#D7CCC8]/5 mt-2">
                <div>
                  <span className="font-serif text-xl font-bold text-[#F48FB1]">
                    ${item.precio.toLocaleString('es-MX')}.00
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#6D4C41]/60 dark:text-[#D7CCC8]/60 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{item.ventas || 'Muy vendido'}</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(item, 1, '')}
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white font-semibold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Pedir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
