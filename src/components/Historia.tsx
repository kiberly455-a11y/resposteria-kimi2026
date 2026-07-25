import React from 'react';
import { Leaf, Heart, Award, Truck } from 'lucide-react';

export const Historia: React.FC = () => {
  return (
    <section id="nosotros" className="py-20 bg-white dark:bg-[#2d2420] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Images Section */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Image */}
              <div className="w-[85%] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-[#FFF8E7] dark:border-[#1a1412]">
                <img
                  src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=800&q=80"
                  alt="Preparación artesanal de repostería Dulces Capricho Mágico"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Floating Image */}
              <div className="absolute -bottom-8 right-0 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#3d302a] transform hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80"
                  alt="Detalles de decoración pastelera"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col space-y-5 text-left">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-widest text-[#F48FB1] font-bold">
                Nuestra Pasión Dulce
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9] mt-1">
                Nuestra historia cargada de magia y sabor
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed">
              Todo comenzó con una simple receta familiar transmitida por generaciones y un sueño compartido: crear postres que no solo deleitaran el paladar, sino que también despertaran sonrisas sinceras y momentos inolvidables.
            </p>

            <p className="text-sm sm:text-base text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed">
              En <strong className="text-[#F48FB1]">Dulces Capricho Mágico</strong>, cada pastel, brownie o cupcake es una pequeña obra de arte. Seleccionamos cuidadosamente mantequillas puras, chocolates belgas, frutos frescos locales y vainilla pura, combinando técnicas tradicionales con una decoración vanguardista.
            </p>

            <p className="text-sm sm:text-base text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed">
              Nuestro compromiso va más allá de la repostería: queremos acompañarte en tus cumpleaños, bodas, aniversarios y antojos cotidianos para hacer tus días infinitamente más dulces.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8E7] dark:bg-[#1a1412] shadow-sm border border-[#F8BBD0]/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#6D4C41] dark:text-[#EFEBE9]">
                  Ingredientes 100% Naturales
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8E7] dark:bg-[#1a1412] shadow-sm border border-[#F8BBD0]/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#6D4C41] dark:text-[#EFEBE9]">
                  Hecho con Amor y Cariño
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8E7] dark:bg-[#1a1412] shadow-sm border border-[#F8BBD0]/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#6D4C41] dark:text-[#EFEBE9]">
                  Calidad Repostera Premium
                </span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8E7] dark:bg-[#1a1412] shadow-sm border border-[#F8BBD0]/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#6D4C41] dark:text-[#EFEBE9]">
                  Entrega Segura a Domicilio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
