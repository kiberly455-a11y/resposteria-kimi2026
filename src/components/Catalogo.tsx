import React, { useState } from 'react';
import { Producto } from '../types';
import { Search, Heart, Plus, Eye, Sparkles, FileDown } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { generateCatalogPDF } from '../lib/pdfExport';

interface CatalogoProps {
  productos: Producto[];
  onAddToCart: (producto: Producto, cantidad: number, notas: string) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

export const Catalogo: React.FC<CatalogoProps> = ({
  productos,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'pasteles', label: 'Pasteles' },
    { id: 'postres', label: 'Postres' },
    { id: 'galletas', label: 'Galletas' },
    { id: 'chocolates', label: 'Chocolates' },
  ];

  const filteredProducts = productos.filter((product) => {
    const matchesCategory = activeCategory === 'todos' || product.categoria === activeCategory;
    const matchesSearch =
      product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-20 bg-gradient-to-b from-[#FFF8E7] to-white dark:from-[#1a1412] dark:to-[#2d2420] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F48FB1]">
            Delicias Recién Horneadas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
            Catálogo de Productos
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#F8BBD0] to-[#D4AF37] mx-auto rounded-full" />
          <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80">
            Explora nuestra deliciosa variedad de postres artesanales elaborados con los mejores ingredientes y la máxima pasión.
          </p>
          <div className="pt-2">
            <button
              onClick={() => generateCatalogPDF(productos)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Menú Completo en PDF</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#F48FB1]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, chocolate, fresa, etc..."
              className="w-full pl-11 pr-4 py-3 text-sm rounded-full bg-white dark:bg-[#3d302a] text-[#6D4C41] dark:text-[#EFEBE9] border-2 border-[#F8BBD0]/50 focus:border-[#F48FB1] focus:outline-none shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-[#6D4C41]/50 dark:text-[#D7CCC8]/50 hover:text-[#F48FB1] px-2 py-1"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white shadow-md scale-105'
                  : 'bg-white dark:bg-[#3d302a] text-[#6D4C41] dark:text-[#D7CCC8] hover:bg-[#F8BBD0]/20 border border-[#F8BBD0]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/50 dark:bg-black/20 rounded-3xl border border-dashed border-[#F8BBD0]/50 max-w-lg mx-auto">
            <Sparkles className="w-10 h-10 text-[#F48FB1] mx-auto mb-3 animate-pulse" />
            <p className="font-serif text-lg text-[#6D4C41] dark:text-[#EFEBE9] font-bold">
              No encontramos postres con esa búsqueda
            </p>
            <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 mt-1">
              Intenta buscar con otra palabra o explora nuestras categorías.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-full bg-[#F8BBD0] text-white shadow-sm hover:scale-105 transition-all"
            >
              Mostrar todo el catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((p) => {
              const isFav = favorites.includes(p.id);
              return (
                <div
                  key={p.id}
                  className="group bg-white dark:bg-[#2d2420] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-[#F8BBD0]/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={p.img}
                        alt={p.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(p)}
                          className="px-3.5 py-2 rounded-full bg-white/95 text-[#6D4C41] font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver detalle</span>
                        </button>
                      </div>

                      {/* Badge */}
                      {p.badge && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white shadow-sm">
                          {p.badge}
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(p.id);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all cursor-pointer ${
                          isFav
                            ? 'bg-[#F48FB1] text-white'
                            : 'bg-white/90 text-[#F48FB1] hover:bg-[#F48FB1] hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Product Body */}
                    <div className="p-5 space-y-2 text-left">
                      <span className="text-[10px] font-bold text-[#F48FB1] uppercase tracking-wider">
                        {p.categoria}
                      </span>
                      <h3
                        onClick={() => setSelectedProduct(p)}
                        className="font-serif text-base font-bold text-[#6D4C41] dark:text-[#EFEBE9] line-clamp-1 group-hover:text-[#F48FB1] transition-colors cursor-pointer"
                      >
                        {p.nombre}
                      </h3>
                      <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 line-clamp-2 leading-relaxed">
                        {p.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Product Footer & Add Button */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-[#6D4C41]/5 dark:border-[#D7CCC8]/5 mt-2">
                    <div className="flex flex-col">
                      <span className="font-serif text-lg font-bold text-[#F48FB1]">
                        ${p.precio.toLocaleString('es-MX')}.00
                      </span>
                      {p.oldPrecio && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ${p.oldPrecio.toLocaleString('es-MX')}.00
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(p, 1, '')}
                      title="Agregar rápido al carrito"
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white flex items-center justify-center shadow-md hover:scale-110 hover:rotate-12 transition-all cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Quick View Modal */}
      <ProductModal
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  );
};
