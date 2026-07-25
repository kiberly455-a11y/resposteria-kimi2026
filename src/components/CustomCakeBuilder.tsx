import React, { useState } from 'react';
import { Cake, Sparkles, ShoppingBag, CheckCircle2, Heart, FileDown } from 'lucide-react';
import { CartItem, CustomCake } from '../types';
import { generateCustomCakePDF } from '../lib/pdfExport';

interface CustomCakeBuilderProps {
  onAddCustomCakeToCart: (item: CartItem) => void;
}

export const CustomCakeBuilder: React.FC<CustomCakeBuilderProps> = ({ onAddCustomCakeToCart }) => {
  const tumanos = [
    { label: '6 - 8 Porciones (Chico)', sub: 'Ideal para reunión íntima', basePrice: 450 },
    { label: '12 - 15 Porciones (Mediano)', sub: 'El tamaño preferido para cumpleaños', basePrice: 680 },
    { label: '20 - 25 Porciones (Grande)', sub: 'Para festejos y reuniones familiares', basePrice: 950 },
    { label: '30+ Porciones (Familiar XL)', sub: 'Para bodas, XV años y mega eventos', basePrice: 1350 },
  ];

  const bizcochos = [
    { name: 'Vainilla Pura de Papantla', extra: 0, desc: 'Suave, esponjoso e impregnado en vainilla natural.' },
    { name: 'Chocolate Belga Gourmet', extra: 50, desc: 'Bizcocho denso, húmedo y rico en cacao 70%.' },
    { name: 'Red Velvet Terciopelo', extra: 60, desc: 'Textura sedosa con suave matiz de cacao y frutos.' },
    { name: 'Zanahoria & Nuez Especiada', extra: 70, desc: 'Con canela, nueces tostadas y toque de jengibre.' },
    { name: 'Limón y Semillas de Amapola', extra: 40, desc: 'Fresco, cítrico y delicado.' },
  ];

  const rellenos = [
    { name: 'Ganache de Chocolate Belga', extra: 50 },
    { name: 'Coulis Natural de Frutos Rojos', extra: 60 },
    { name: 'Dulce de Leche Artesanal', extra: 40 },
    { name: 'Crema Pastelera con Vainilla', extra: 30 },
    { name: 'Nutella & Avellanas Tostadas', extra: 70 },
    { name: 'Crema de Maracuyá Silvestre', extra: 50 },
  ];

  const coberturas = [
    { name: 'Buttercream Suave de Vainilla', extra: 0 },
    { name: 'Naked Cake (Estilo Rústico Elegante)', extra: 0 },
    { name: 'Frosting de Queso Crema', extra: 50 },
    { name: 'Fondant Personalizado Temático', extra: 150 },
    { name: 'Chantilly Ligero con Frutas', extra: 40 },
  ];

  const [selectedTamano, setSelectedTamano] = useState(tumanos[1]);
  const [selectedBizcocho, setSelectedBizcocho] = useState(bizcochos[0]);
  const [selectedRelleno, setSelectedRelleno] = useState(rellenos[0]);
  const [selectedCobertura, setSelectedCobertura] = useState(coberturas[0]);
  const [dedicatoria, setDedicatoria] = useState('');
  const [added, setAdded] = useState(false);

  const calculateTotal = () => {
    return (
      selectedTamano.basePrice +
      selectedBizcocho.extra +
      selectedRelleno.extra +
      selectedCobertura.extra
    );
  };

  const handleAddToCart = () => {
    const total = calculateTotal();
    const customItem: CartItem = {
      id: `custom-cake-${Date.now()}`,
      nombre: `Pastel Personalizado (${selectedTamano.label.split('(')[0].trim()})`,
      precio: total,
      cantidad: 1,
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
      descripcion: `Bizcocho: ${selectedBizcocho.name} | Relleno: ${selectedRelleno.name} | Cobertura: ${selectedCobertura.name}`,
      notas: dedicatoria ? `Dedicatoria: "${dedicatoria}"` : 'Sin dedicatoria',
      isCustomCake: true,
    };

    onAddCustomCakeToCart(customItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="personalizar" className="py-20 bg-gradient-to-br from-[#FFF0F5] via-[#FFF8E7] to-[#DCC6E0]/30 dark:from-[#2d1f24] dark:via-[#1a1412] dark:to-[#2d1a30] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F8BBD0]/30 text-[#F48FB1] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creador Interactivo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
            Diseña tu Pastel Mágico Personalizado
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#F8BBD0] to-[#D4AF37] mx-auto rounded-full" />
          <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80">
            Elige el número de porciones, el sabor del bizcocho, tu relleno favorito, la cobertura y la dedicatoria para crear una obra de arte a tu medida.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Options */}
          <div className="lg:col-span-8 space-y-8 bg-white dark:bg-[#2d2420] p-6 sm:p-8 rounded-3xl shadow-xl border border-[#F8BBD0]/30 text-left">
            {/* Step 1: Tamanos */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F8BBD0] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                <span>Selecciona las Porciones:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tumanos.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setSelectedTamano(t)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selectedTamano.label === t.label
                        ? 'border-[#F48FB1] bg-[#F8BBD0]/10 shadow-sm'
                        : 'border-[#6D4C41]/10 dark:border-[#D7CCC8]/10 hover:border-[#F8BBD0]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs sm:text-sm text-[#6D4C41] dark:text-[#EFEBE9]">
                        {t.label}
                      </span>
                      <span className="font-serif font-bold text-xs text-[#F48FB1]">
                        ${t.basePrice}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 mt-1">
                      {t.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Bizcocho */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F8BBD0] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                <span>Sabor del Bizcocho:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bizcochos.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setSelectedBizcocho(b)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selectedBizcocho.name === b.name
                        ? 'border-[#F48FB1] bg-[#F8BBD0]/10 shadow-sm'
                        : 'border-[#6D4C41]/10 dark:border-[#D7CCC8]/10 hover:border-[#F8BBD0]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-xs sm:text-sm text-[#6D4C41] dark:text-[#EFEBE9]">
                        {b.name}
                      </span>
                      {b.extra > 0 && (
                        <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                          +${b.extra}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6D4C41]/60 dark:text-[#D7CCC8]/60 mt-0.5">
                      {b.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Relleno */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F8BBD0] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                <span>Elige tu Relleno Favorito:</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {rellenos.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => setSelectedRelleno(r)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedRelleno.name === r.name
                        ? 'border-[#F48FB1] bg-[#F8BBD0]/20 font-bold text-[#F48FB1]'
                        : 'border-[#6D4C41]/10 dark:border-[#D7CCC8]/10 text-[#6D4C41] dark:text-[#D7CCC8] hover:border-[#F8BBD0]'
                    }`}
                  >
                    <div>{r.name}</div>
                    {r.extra > 0 && <span className="text-[10px] text-[#D4AF37]">+${r.extra}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Cobertura */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F8BBD0] text-white text-xs flex items-center justify-center font-sans font-bold">4</span>
                <span>Estilo de Cobertura & Decorado:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coberturas.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCobertura(c)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedCobertura.name === c.name
                        ? 'border-[#F48FB1] bg-[#F8BBD0]/20 font-bold text-[#F48FB1]'
                        : 'border-[#6D4C41]/10 dark:border-[#D7CCC8]/10 text-[#6D4C41] dark:text-[#D7CCC8] hover:border-[#F8BBD0]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{c.name}</span>
                      {c.extra > 0 && <span className="text-[10px] text-[#D4AF37]">+${c.extra}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Dedicatoria */}
            <div className="space-y-2 pt-2">
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F8BBD0] text-white text-xs flex items-center justify-center font-sans font-bold">5</span>
                <span>Mensaje / Dedicatoria en el Pastel:</span>
              </h3>
              <input
                type="text"
                value={dedicatoria}
                onChange={(e) => setDedicatoria(e.target.value)}
                placeholder="E.g., ¡Feliz Cumpleaños Mamá!, Te amo Sofia, #25 etc."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#F8BBD0] bg-[#FFF8E7]/40 dark:bg-[#1a1412] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F48FB1]"
              />
            </div>
          </div>

          {/* Live Order Card Summary */}
          <div className="lg:col-span-4 sticky top-28 bg-white dark:bg-[#2d2420] p-6 rounded-3xl shadow-xl border-2 border-[#F8BBD0]/50 space-y-6 text-left">
            <div className="flex items-center gap-3 border-b border-[#6D4C41]/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-[#F8BBD0]/20 flex items-center justify-center text-[#F48FB1]">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                  Resumen de tu Pastel
                </h4>
                <span className="text-[10px] text-[#F48FB1] font-semibold uppercase tracking-widest">
                  Cotización en vivo
                </span>
              </div>
            </div>

            {/* Spec Breakdown */}
            <div className="space-y-3 text-xs text-[#6D4C41] dark:text-[#D7CCC8]">
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-neutral-800">
                <span className="text-gray-500">Porciones:</span>
                <span className="font-bold">{selectedTamano.label}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-neutral-800">
                <span className="text-gray-500">Bizcocho:</span>
                <span className="font-bold">{selectedBizcocho.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-neutral-800">
                <span className="text-gray-500">Relleno:</span>
                <span className="font-bold">{selectedRelleno.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-neutral-800">
                <span className="text-gray-500">Cobertura:</span>
                <span className="font-bold">{selectedCobertura.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-gray-200 dark:border-neutral-800">
                <span className="text-gray-500">Dedicatoria:</span>
                <span className="font-bold italic">{dedicatoria ? `"${dedicatoria}"` : 'Sin mensaje'}</span>
              </div>
            </div>

            {/* Total Price Calculation */}
            <div className="pt-2 flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#6D4C41] dark:text-[#EFEBE9]">Precio Estimado:</span>
              <span className="font-serif text-3xl font-extrabold text-[#F48FB1]">
                ${calculateTotal().toLocaleString('es-MX')}.00
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-3.5 px-6 rounded-full text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                added
                  ? 'bg-emerald-500 scale-98'
                  : 'bg-gradient-to-r from-[#F8BBD0] via-[#F48FB1] to-[#CE93D8] hover:shadow-xl hover:scale-102'
              }`}
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-5 h-5 animate-bounce" />
                  <span>¡Pastel Agregado al Carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Agregar Pastel Mágico al Carrito</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                const total = calculateTotal();
                const cakeSpec: CustomCake = {
                  porciones: selectedTamano.label,
                  porcionesPrecio: selectedTamano.basePrice,
                  bizcocho: selectedBizcocho.name,
                  bizcochoPrecio: selectedBizcocho.extra,
                  relleno: selectedRelleno.name,
                  rellenoPrecio: selectedRelleno.extra,
                  cobertura: selectedCobertura.name,
                  coberturaPrecio: selectedCobertura.extra,
                  dedicatoria: dedicatoria || '',
                };
                generateCustomCakePDF(cakeSpec, total, 'Cliente Especial');
              }}
              className="w-full py-2.5 px-4 rounded-full border border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 font-bold text-xs hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Ficha Técnica en PDF</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6D4C41]/60 dark:text-[#D7CCC8]/60 text-center">
              <Heart className="w-3.5 h-3.5 text-[#F48FB1] fill-[#F48FB1]" />
              <span>Garantía de sabor y frescura 100% hecha a mano.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
