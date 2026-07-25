import React, { useState, useEffect } from 'react';
import { Cake, Moon, Sun, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  cartCount,
  onOpenCart,
  onOpenCustomizer
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['inicio', 'nosotros', 'catalogo', 'personalizar', 'destacados', 'promociones', 'googledocs', 'galeria', 'testimonios', 'faq', 'contacto'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'personalizar', label: 'Diseña tu Pastel' },
    { id: 'destacados', label: 'Destacados' },
    { id: 'promociones', label: 'Promociones' },
    { id: 'googledocs', label: 'Google Docs' },
    { id: 'galeria', label: 'Galería' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8E7]/95 dark:bg-[#2d2420]/95 backdrop-blur-md shadow-md py-3'
            : 'bg-[#FFF8E7]/80 dark:bg-[#2d2420]/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('inicio');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F8BBD0] via-[#F48FB1] to-[#CE93D8] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Cake className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#6D4C41] dark:text-[#EFEBE9] leading-tight group-hover:text-[#F48FB1] transition-colors">
                Dulces Capricho Mágico
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#F48FB1] font-semibold -mt-0.5">
                Repostería Artesanal
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all cursor-pointer relative ${
                  activeSection === link.id
                    ? 'text-[#F48FB1] font-semibold bg-[#F8BBD0]/20 dark:bg-[#AD1457]/20'
                    : 'text-[#6D4C41] dark:text-[#D7CCC8] hover:text-[#F48FB1] dark:hover:text-[#F48FB1]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#F48FB1] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="w-9 h-9 rounded-full bg-white dark:bg-[#3d302a] text-[#6D4C41] dark:text-[#D7CCC8] flex items-center justify-center shadow-sm hover:bg-[#F8BBD0]/30 hover:text-[#F48FB1] transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              title="Ver mi carrito de compras"
              className="relative w-9 h-9 rounded-full bg-white dark:bg-[#3d302a] text-[#6D4C41] dark:text-[#D7CCC8] flex items-center justify-center shadow-sm hover:bg-[#F8BBD0]/30 hover:text-[#F48FB1] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F48FB1] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Custom Cake / Order CTA Button */}
            <button
              onClick={() => {
                if (onOpenCustomizer) onOpenCustomizer();
                else handleNavClick('personalizar');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hacer Pedido</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white dark:bg-[#3d302a] text-[#6D4C41] dark:text-[#D7CCC8] flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-16 right-0 left-0 bg-[#FFF8E7] dark:bg-[#2d2420] shadow-xl p-5 border-t border-[#F8BBD0]/30 flex flex-col gap-2 max-h-[80vh] overflow-y-auto animate-fadeInDown"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#F8BBD0]/30 text-[#F48FB1] font-bold'
                    : 'text-[#6D4C41] dark:text-[#D7CCC8] hover:bg-[#F8BBD0]/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#6D4C41]/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCustomizer) onOpenCustomizer();
                  else handleNavClick('personalizar');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Diseñar Pastel Personalizado</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
