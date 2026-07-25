import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, Share2, MessageCircle } from 'lucide-react';

interface ContactoProps {
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const Contacto: React.FC<ContactoProps> = ({ onShowToast }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !mensaje) {
      onShowToast('Por favor completa los campos requeridos', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('¡Mensaje enviado con éxito! Te contactaremos muy pronto.', 'success');
      setNombre('');
      setEmail('');
      setTelefono('');
      setMensaje('');
    }, 1000);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('¡Hola Dulces Capricho Mágico! Quisiera más información sobre sus pasteles y postres para un evento.');
    window.open(`https://wa.me/5215512345678?text=${text}`, '_blank');
  };

  return (
    <section id="contacto" className="py-20 bg-white dark:bg-[#2d2420] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F48FB1]">
            Estamos para Atenderte
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
            Ponte en Contacto
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#F8BBD0] to-[#D4AF37] mx-auto rounded-full" />
          <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80">
            ¿Tienes un evento especial o un capricho dulce? ¡Escríbenos o visítanos y hagamos magia juntos!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Contact Form Column */}
          <div className="lg:col-span-6 bg-[#FFF8E7] dark:bg-[#1a1412] p-8 rounded-3xl shadow-xl border border-[#F8BBD0]/30 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Envíanos un Mensaje
              </h3>
              <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70">
                Respondemos todas tus dudas en menos de 2 horas en horario laboral.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre y apellido"
                  className="w-full mt-1 px-4 py-3 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F48FB1]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full mt-1 px-4 py-3 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F48FB1]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className="w-full mt-1 px-4 py-3 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F48FB1]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">
                  Mensaje o Detalles del Evento *
                </label>
                <textarea
                  required
                  rows={4}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Cuéntanos fecha de tu evento, número de invitados, sabore o temática que te gustaría..."
                  className="w-full mt-1 px-4 py-3 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F48FB1]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#F8BBD0] via-[#F48FB1] to-[#CE93D8] text-white font-semibold text-xs shadow-lg hover:shadow-xl hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Enviando mensaje...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Formulario</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <span className="text-xs text-gray-500">¿Prefieres una atención inmediata?</span>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="mt-2 w-full py-3 px-6 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow-md hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chatear Directamente por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#FFF8E7] dark:bg-[#1a1412] rounded-2xl border border-[#F8BBD0]/30 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#6D4C41] dark:text-[#EFEBE9]">Dirección</h4>
                  <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 mt-0.5">
                    Calle Dulce Capricho #123, Col. Magia, Ciudad de México
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#FFF8E7] dark:bg-[#1a1412] rounded-2xl border border-[#F8BBD0]/30 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#6D4C41] dark:text-[#EFEBE9]">Horarios</h4>
                  <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 mt-0.5">
                    Lun - Sáb: 9:00 AM - 8:00 PM
                    <br />
                    Dom: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#FFF8E7] dark:bg-[#1a1412] rounded-2xl border border-[#F8BBD0]/30 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#6D4C41] dark:text-[#EFEBE9]">Teléfono</h4>
                  <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 mt-0.5">
                    +52 (55) 1234-5678
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#FFF8E7] dark:bg-[#1a1412] rounded-2xl border border-[#F8BBD0]/30 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#CE93D8] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#6D4C41] dark:text-[#EFEBE9]">Correo</h4>
                  <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70 mt-0.5">
                    hola@dulcescaprichomagico.com
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Frame */}
            <div className="w-full h-52 rounded-3xl overflow-hidden shadow-md border border-[#F8BBD0]/30">
              <iframe
                title="Ubicación Dulces Capricho Mágico"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.761!2d-99.133!3d19.432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU1LjIiTiA5OcKwMDcnNTguOCJX!5e0!3m2!1ses!2smx!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            {/* Social Media links */}
            <div className="p-5 bg-[#FFF8E7] dark:bg-[#1a1412] rounded-2xl border border-[#F8BBD0]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#F48FB1]" />
                <span className="font-bold text-xs text-[#6D4C41] dark:text-[#EFEBE9]">Síguenos en Redes:</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#contacto"
                  className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform"
                  title="Facebook"
                >
                  f
                </a>
                <a
                  href="#contacto"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform"
                  title="Instagram"
                >
                  ig
                </a>
                <a
                  href="#contacto"
                  className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform"
                  title="TikTok"
                >
                  tt
                </a>
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform cursor-pointer"
                  title="WhatsApp"
                >
                  wa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
