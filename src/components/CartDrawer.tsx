import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, Check, Tag, Sparkles, Truck, Store, FileText, FileDown } from 'lucide-react';
import { generateCartPDF } from '../lib/pdfExport';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [deliveryType, setDeliveryType] = useState<'domicilio' | 'sucursal'>('domicilio');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const shippingFee = deliveryType === 'domicilio' && subtotal < 1200 && subtotal > 0 ? 80 : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'CAPRICHO10' || couponCode.trim().toUpperCase() === 'MAGIA10') {
      setDiscountPercent(10);
      onShowToast('¡Cupón aplicado con éxito! 10% de descuento', 'success');
    } else if (couponCode.trim().toUpperCase() === 'CUMPLE20') {
      setDiscountPercent(20);
      onShowToast('¡Cupón de cumpleaños aplicado! 20% de descuento', 'success');
    } else {
      onShowToast('Cupón no válido. Prueba con CAPRICHO10', 'error');
    }
  };

  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let itemsText = cartItems
      .map(
        (i, index) =>
          `*${index + 1}. ${i.nombre}* x${i.cantidad}\n   Precio: $${(i.precio * i.cantidad).toLocaleString('es-MX')}.00${
            i.notas ? `\n   Nota: ${i.notas}` : ''
          }`
      )
      .join('\n\n');

    let msg = `✨ *NUEVO PEDIDO DULCES CAPRICHO MÁGICO* ✨\n\n`;
    msg += `👤 *Cliente:* ${clientName || 'Cliente Web'}\n`;
    msg += `📞 *Teléfono:* ${clientPhone || 'Por especificar'}\n`;
    msg += `🚚 *Método:* ${deliveryType === 'domicilio' ? `Envío a domicilio (${clientAddress || 'Dirección a detallar'})` : 'Recoger en Sucursal'}\n\n`;
    msg += `🛍️ *PRODUCTOS:* \n${itemsText}\n\n`;
    msg += `----------------------------\n`;
    msg += `Subtotal: $${subtotal.toLocaleString('es-MX')}.00\n`;
    if (discountAmount > 0) msg += `Descuento: -$${discountAmount.toLocaleString('es-MX')}.00\n`;
    if (shippingFee > 0) msg += `Costo Envío: $${shippingFee.toLocaleString('es-MX')}.00\n`;
    msg += `*TOTAL A PAGAR:* $${grandTotal.toLocaleString('es-MX')}.00\n\n`;
    msg += `¡Quedo a la espera de su confirmación para proceder con la preparación! 🎂✨`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/5215512345678?text=${encoded}`, '_blank');
    onShowToast('¡Redirigiendo a WhatsApp para finalizar tu pedido!', 'success');
    setShowCheckoutModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Overlay Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#2d2420] h-full shadow-2xl flex flex-col justify-between z-10 text-left border-l border-[#F8BBD0]/30 animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-[#6D4C41]/10 flex items-center justify-between bg-[#FFF8E7] dark:bg-[#1a1412]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#F8BBD0]/30 text-[#F48FB1] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Tu Carrito Dulce
              </h3>
              <span className="text-[10px] text-gray-500 font-medium block">
                {cartItems.reduce((a, b) => a + b.cantidad, 0)} productos agregados
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white dark:bg-neutral-800 text-[#6D4C41] dark:text-white flex items-center justify-center hover:bg-[#F8BBD0] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-3 opacity-70">
              <ShoppingBag className="w-16 h-16 text-[#F8BBD0] mx-auto animate-bounce" />
              <p className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Tu carrito está vacío
              </p>
              <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 max-w-xs mx-auto">
                Explora nuestro catálogo o diseña un pastel personalizado para llenar tu día de dulzura.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#FFF8E7]/60 dark:bg-[#1a1412] rounded-2xl border border-[#F8BBD0]/30 flex gap-3 items-center"
              >
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#F8BBD0]/20"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[#6D4C41] dark:text-[#EFEBE9] truncate">
                    {item.nombre}
                  </h4>
                  {item.descripcion && (
                    <p className="text-[10px] text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 line-clamp-1">
                      {item.descripcion}
                    </p>
                  )}
                  {item.notas && (
                    <p className="text-[10px] text-[#F48FB1] italic line-clamp-1 mt-0.5">
                      Nota: {item.notas}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-xs text-[#F48FB1]">
                      ${(item.precio * item.cantidad).toLocaleString('es-MX')}.00
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-2 py-1 rounded-full border border-gray-200 dark:border-neutral-700">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-gray-500 hover:text-[#F48FB1] p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#6D4C41] dark:text-white w-4 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-gray-500 hover:text-[#F48FB1] p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  title="Eliminar producto"
                  className="text-red-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#6D4C41]/10 bg-[#FFF8E7] dark:bg-[#1a1412] space-y-4">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#F48FB1]" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Cupón (ej. CAPRICHO10)"
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none"
                />
              </div>
              <button
                onClick={handleApplyCoupon}
                className="px-3 py-1.5 rounded-xl bg-[#F8BBD0] text-white text-xs font-bold hover:bg-[#F48FB1] transition-colors cursor-pointer"
              >
                Aplicar
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#6D4C41] dark:text-[#D7CCC8]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString('es-MX')}.00</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Descuento ({discountPercent}%):</span>
                  <span>-${discountAmount.toLocaleString('es-MX')}.00</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Envío estimado:</span>
                <span>{shippingFee === 0 ? '¡GRATIS!' : `$${shippingFee}.00`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#6D4C41]/10 font-bold text-base text-[#6D4C41] dark:text-[#EFEBE9]">
                <span>Total a Pagar:</span>
                <span className="font-serif text-[#F48FB1] text-xl">
                  ${grandTotal.toLocaleString('es-MX')}.00
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#F8BBD0] via-[#F48FB1] to-[#CE93D8] text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Proceder al Pago / Coordinar Pedido</span>
              </button>

              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-sm hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 fill-white" />
                <span>Pedir Rápido por WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    generateCartPDF(cartItems, clientName || 'Cliente Especial');
                    onShowToast('¡Cotización descargada en PDF exitosamente!', 'success');
                  }}
                  className="py-2 px-3 rounded-full border border-rose-400 bg-rose-500/10 text-rose-600 dark:text-rose-300 font-bold text-xs hover:bg-rose-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Descargar PDF</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('googledocs');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2 px-3 rounded-full border border-[#4285F4]/40 bg-[#4285F4]/10 text-[#4285F4] dark:text-[#64B5F6] font-bold text-xs hover:bg-[#4285F4]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Google Docs</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="w-full max-w-lg bg-white dark:bg-[#2d2420] rounded-3xl p-6 shadow-2xl space-y-5 text-left border border-[#F8BBD0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-[#6D4C41]/10 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Datos de Entrega del Pedido
              </h3>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Option Toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeliveryType('domicilio')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  deliveryType === 'domicilio'
                    ? 'border-[#F48FB1] bg-[#F8BBD0]/20 text-[#F48FB1]'
                    : 'border-gray-200 dark:border-neutral-700 text-gray-500'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Envío a Domicilio</span>
              </button>

              <button
                onClick={() => setDeliveryType('sucursal')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  deliveryType === 'sucursal'
                    ? 'border-[#F48FB1] bg-[#F8BBD0]/20 text-[#F48FB1]'
                    : 'border-gray-200 dark:border-neutral-700 text-gray-500'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Recoger en Sucursal</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                  Nombre de quien recibe
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Nombre y Apellido"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-[#F8BBD0] bg-[#FFF8E7]/50 dark:bg-[#1a1412] dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-[#F8BBD0] bg-[#FFF8E7]/50 dark:bg-[#1a1412] dark:text-white"
                />
              </div>

              {deliveryType === 'domicilio' && (
                <div>
                  <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                    Dirección Completa de Entrega
                  </label>
                  <textarea
                    rows={2}
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="Calle, Número, Colonia, Alcaldía, Código Postal y referencias..."
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-[#F8BBD0] bg-[#FFF8E7]/50 dark:bg-[#1a1412] dark:text-white"
                  />
                </div>
              )}
            </div>

            <div className="p-3 bg-[#FFF8E7] dark:bg-[#1a1412] rounded-xl text-xs space-y-1">
              <div className="flex justify-between font-bold">
                <span>Total a confirmar:</span>
                <span className="text-[#F48FB1] font-serif text-base">${grandTotal.toLocaleString('es-MX')}.00</span>
              </div>
              <p className="text-[10px] text-gray-500">
                Al hacer clic se generará tu ficha de pedido oficial con atención directa en WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#F8BBD0] via-[#F48FB1] to-[#CE93D8] text-white font-bold text-xs shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirmar y Enviar Ficha por WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  generateCartPDF(cartItems, clientName || 'Cliente Especial');
                  onShowToast('¡Ficha de cotización descargada en PDF!', 'success');
                }}
                className="w-full py-2.5 rounded-full border border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 font-bold text-xs hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Descargar Cotización en PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
