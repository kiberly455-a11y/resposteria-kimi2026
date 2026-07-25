import React from 'react';
import { Cake, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#6D4C41] dark:bg-[#1a1412] text-[#FFF8E7] pt-16 pb-8 transition-colors text-left border-t border-[#F8BBD0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shadow-md">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Dulces Capricho Mágico
              </span>
            </div>
            <p className="text-xs text-[#FFF8E7]/80 leading-relaxed">
              Endulzando momentos inolvidables desde 2019. Cada receta es elaborada artesanalmente con amor, creatividad y un toque de magia pura.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F8BBD0] uppercase tracking-wider">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF8E7]/80">
              <li><a href="#inicio" className="hover:text-[#F8BBD0] transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-[#F8BBD0] transition-colors">Nuestra Historia</a></li>
              <li><a href="#catalogo" className="hover:text-[#F8BBD0] transition-colors">Catálogo Completo</a></li>
              <li><a href="#personalizar" className="hover:text-[#F8BBD0] transition-colors">Diseña tu Pastel Mágico</a></li>
              <li><a href="#destacados" className="hover:text-[#F8BBD0] transition-colors">Productos Destacados</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F8BBD0] uppercase tracking-wider">
              Secciones
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF8E7]/80">
              <li><a href="#promociones" className="hover:text-[#F8BBD0] transition-colors">Promociones Activas</a></li>
              <li><a href="#galeria" className="hover:text-[#F8BBD0] transition-colors">Galería Fotográfica</a></li>
              <li><a href="#testimonios" className="hover:text-[#F8BBD0] transition-colors">Testimonios de Clientes</a></li>
              <li><a href="#faq" className="hover:text-[#F8BBD0] transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#contacto" className="hover:text-[#F8BBD0] transition-colors">Ubicación y Contacto</a></li>
            </ul>
          </div>

          {/* Schedule */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#F8BBD0] uppercase tracking-wider">
              Horarios de Atención
            </h4>
            <div className="space-y-2 text-xs text-[#FFF8E7]/80">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>Lunes - Viernes:</span>
                <span className="font-semibold text-white">9:00 - 20:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>Sábados:</span>
                <span className="font-semibold text-white">9:00 - 20:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>Domingos:</span>
                <span className="font-semibold text-white">10:00 - 16:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF8E7]/60 gap-4">
          <div className="flex items-center gap-1">
            <span>&copy; 2026 Dulces Capricho Mágico. Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-[#F48FB1] fill-[#F48FB1]" />
            <span>para ti.</span>
          </div>
          <div className="flex gap-6">
            <a href="#inicio" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#inicio" className="hover:text-white transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
