import React from 'react';
import { Star, Utensils, PhoneCall, Sparkles, Heart, Award } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onMakeOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, onMakeOrder }) => {
  return (
    <section id="inicio" className="relative min-h-[90vh] pt-24 pb-16 flex items-center overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#FFF0F5] to-[#DCC6E0]/40 dark:from-[#1a1412] dark:via-[#2d1f24] dark:to-[#2d1a30]">
      {/* Decorative background glow blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F8BBD0]/30 dark:bg-[#AD1457]/15 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#DCC6E0]/30 dark:bg-[#7B1FA2]/15 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8BBD0]/30 dark:bg-[#AD1457]/30 text-[#6D4C41] dark:text-[#EFEBE9] border border-[#F48FB1]/30 backdrop-blur-md text-xs sm:text-sm font-medium shadow-sm">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Repostería 100% Artesanal y Personalizada</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl font-bold text-[#6D4C41] dark:text-[#EFEBE9] leading-[1.15]">
              Cada postre está hecho con{' '}
              <span className="bg-gradient-to-r from-[#F48FB1] via-[#D4AF37] to-[#CE93D8] bg-clip-text text-transparent">
                amor, creatividad
              </span>{' '}
              y un toque de magia.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 max-w-2xl leading-relaxed">
              Descubre sabores únicos elaborados artesanalmente para convertir cada momento en una experiencia inolvidable. Ingredientes de la más alta calidad y recetas que enamoran a primera vista.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Ver catálogo</span>
              </button>

              <button
                onClick={onMakeOrder}
                className="px-7 py-3.5 rounded-full bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-[#EFEBE9] border-2 border-[#F8BBD0] dark:border-[#F48FB1] font-semibold text-sm shadow-md hover:bg-[#F8BBD0] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hacer pedido</span>
              </button>
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#6D4C41]/10 dark:border-[#D7CCC8]/10 w-full max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F8BBD0]/20 flex items-center justify-center text-[#F48FB1] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#6D4C41] dark:text-[#D7CCC8]">Sabores caseros</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F8BBD0]/20 flex items-center justify-center text-[#F48FB1] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#6D4C41] dark:text-[#D7CCC8]">Materia prima top</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F8BBD0]/20 flex items-center justify-center text-[#F48FB1] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#6D4C41] dark:text-[#D7CCC8]">Entrega puntual</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
                alt="Pastel decorado artesanal Capricho Mágico"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Decorative dotted border frame */}
              <div className="absolute inset-0 border-4 border-dashed border-[#F8BBD0]/60 rounded-3xl pointer-events-none p-2 animate-spin-slow opacity-40" />

              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-[#2d2420]/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#F8BBD0]/30 flex justify-between items-center text-center">
                <div className="px-2">
                  <div className="font-serif text-lg sm:text-xl font-extrabold text-[#F48FB1]">500+</div>
                  <div className="text-[10px] sm:text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 font-medium">Clientes felices</div>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-neutral-700" />
                <div className="px-2">
                  <div className="font-serif text-lg sm:text-xl font-extrabold text-[#D4AF37]">50+</div>
                  <div className="text-[10px] sm:text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 font-medium">Recetas únicas</div>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-neutral-700" />
                <div className="px-2">
                  <div className="font-serif text-lg sm:text-xl font-extrabold text-[#CE93D8]">5</div>
                  <div className="text-[10px] sm:text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 font-medium">Años creando magia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
