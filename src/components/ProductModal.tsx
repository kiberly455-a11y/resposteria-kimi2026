import React, { useState } from 'react';
import { Producto } from '../types';
import { X, Plus, Minus, ShoppingBag, Heart, Star, Sparkles, Check } from 'lucide-react';

interface ProductModalProps {
  producto: Producto | null;
  onClose: () => void;
  onAddToCart: (producto: Producto, cantidad: number, notas: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  producto,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!producto) return null;

  const [cantidad, setCantidad] = useState(1);
  const [notas, setNotas] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(producto, cantidad, notas);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#2d2420] rounded-3xl shadow-2xl overflow-hidden border border-[#F8BBD0]/30 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-black/50 text-[#6D4C41] dark:text-white flex items-center justify-center backdrop-blur-sm hover:bg-[#F8BBD0] hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-neutral-100 dark:bg-neutral-800 aspect-square md:aspect-auto">
          <img
            src={producto.img}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
          {producto.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-md">
              {producto.badge}
            </span>
          )}
          <button
            onClick={() => onToggleFavorite(producto.id)}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer ${
              isFavorite
                ? 'bg-[#F48FB1] text-white'
                : 'bg-white/90 text-[#F48FB1] hover:bg-[#F48FB1] hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Product Details Form */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#F48FB1] bg-[#F8BBD0]/20 px-2.5 py-0.5 rounded-full">
                {producto.categoria}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#6D4C41] dark:text-[#EFEBE9] mt-2">
                {producto.nombre}
              </h3>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[#6D4C41]/70 dark:text-[#D7CCC8]/70">
                ({producto.ventas || 'Recomendado'})
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed">
              {producto.descripcion}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl font-bold text-[#F48FB1]">
                ${producto.precio.toLocaleString('es-MX')}.00
              </span>
              {producto.oldPrecio && (
                <span className="text-sm text-gray-400 line-through">
                  ${producto.oldPrecio.toLocaleString('es-MX')}.00
                </span>
              )}
            </div>

            {/* Notes / Special Requests Input */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F48FB1]" />
                <span>Instrucciones / Dedicatoria especial:</span>
              </label>
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="E.g., Agregar letrero de 'Feliz Cumpleaños Maria', vela rosa, etc."
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#F8BBD0] bg-[#FFF8E7]/50 dark:bg-[#1a1412] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F48FB1]"
              />
            </div>
          </div>

          {/* Quantity Controls & Add Button */}
          <div className="pt-6 border-t border-[#6D4C41]/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                Cantidad:
              </span>
              <div className="flex items-center gap-3 bg-[#FFF8E7] dark:bg-[#1a1412] px-3 py-1.5 rounded-full border border-[#F8BBD0]/40">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="w-6 h-6 rounded-full bg-white dark:bg-neutral-800 text-[#6D4C41] dark:text-white flex items-center justify-center hover:bg-[#F8BBD0] transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-sm text-[#6D4C41] dark:text-white w-6 text-center">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="w-6 h-6 rounded-full bg-white dark:bg-neutral-800 text-[#6D4C41] dark:text-white flex items-center justify-center hover:bg-[#F8BBD0] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`w-full py-3 px-6 rounded-full text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-500 scale-98'
                  : 'bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] hover:shadow-lg hover:scale-102'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  <span>¡Agregado al Carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Agregar al Carrito • ${(producto.precio * cantidad).toLocaleString('es-MX')}.00
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
