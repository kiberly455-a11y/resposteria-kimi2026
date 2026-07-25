/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Producto, CartItem, Testimonio, Promocion } from './types';
import {
  productosData,
  promocionesData,
  galeriaData,
  testimoniosData,
  faqsData,
} from './data/bakeryData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Historia } from './components/Historia';
import { Catalogo } from './components/Catalogo';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { Destacados } from './components/Destacados';
import { Promociones } from './components/Promociones';
import { Galeria } from './components/Galeria';
import { Testimonios } from './components/Testimonios';
import { FAQSection } from './components/FAQSection';
import { Contacto } from './components/Contacto';
import { GoogleDocsManager } from './components/GoogleDocsManager';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('capricho_theme') === 'dark';
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [testimonios, setTestimonios] = useState<Testimonio[]>(testimoniosData);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('capricho_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('capricho_theme', 'light');
    }
  }, [isDarkMode]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleAddToCart = (producto: Producto, cantidad: number = 1, notas: string = '') => {
    const cartItemId = `${producto.id}-${notas.trim()}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productoId: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad,
          img: producto.img,
          descripcion: producto.descripcion,
          notas,
        },
      ];
    });

    showToast(`¡${producto.nombre} agregado al carrito!`, 'success');
  };

  const handleAddCustomCakeToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setCartOpen(true);
    showToast('¡Pastel personalizado agregado al carrito!', 'success');
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.cantidad + delta;
            return newQty > 0 ? { ...item, cantidad: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Producto eliminado del carrito', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        showToast('Eliminado de tus favoritos', 'info');
        return prev.filter((favId) => favId !== id);
      } else {
        showToast('¡Agregado a tus favoritos!', 'success');
        return [...prev, id];
      }
    });
  };

  const handleAddTestimonio = (nuevo: Testimonio) => {
    setTestimonios((prev) => [nuevo, ...prev]);
    showToast('¡Muchas gracias por publicar tu opinión!', 'success');
  };

  const handleSelectPromo = (promo: Promocion) => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast(`Promoción "${promo.titulo}" seleccionada. ¡Elige tus favoritos!`, 'info');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="min-h-screen bg-[#FFF8E7] dark:bg-[#1a1412] text-[#6D4C41] dark:text-[#D7CCC8] font-sans transition-colors duration-300 relative">
      {/* Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenCustomizer={() => {
          const el = document.getElementById('personalizar');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Sections */}
      <main>
        <Hero
          onExploreCatalog={() => {
            const el = document.getElementById('catalogo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onMakeOrder={() => {
            const el = document.getElementById('personalizar');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <Historia />

        <Catalogo
          productos={productosData}
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        <CustomCakeBuilder onAddCustomCakeToCart={handleAddCustomCakeToCart} />

        <Destacados productos={productosData} onAddToCart={handleAddToCart} />

        <Promociones promociones={promocionesData} onSelectPromo={handleSelectPromo} />

        <GoogleDocsManager
          cartItems={cartItems}
          productos={productosData}
          onShowToast={showToast}
        />

        <Galeria items={galeriaData} />

        <Testimonios testimonios={testimonios} onAddTestimonio={handleAddTestimonio} />

        <FAQSection faqs={faqsData} />

        <Contacto onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Controls */}
      <FloatingControls />

      {/* Cart Slide Panel Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* Global Toast Notification Toast Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-5 py-3 rounded-full text-white font-semibold text-xs shadow-2xl flex items-center gap-2.5 backdrop-blur-md animate-fadeInUp pointer-events-auto border ${
              t.type === 'success'
                ? 'bg-emerald-600/95 border-emerald-400'
                : t.type === 'error'
                ? 'bg-rose-600/95 border-rose-400'
                : 'bg-[#6D4C41]/95 border-[#F8BBD0]'
            }`}
          >
            {t.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            ) : t.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-200" />
            ) : (
              <Info className="w-4 h-4 text-amber-200" />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
