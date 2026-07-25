import React, { useState } from 'react';
import { Testimonio } from '../types';
import { Star, MessageSquareHeart, PlusCircle, CheckCircle2 } from 'lucide-react';

interface TestimoniosProps {
  testimonios: Testimonio[];
  onAddTestimonio: (nuevo: Testimonio) => void;
}

export const Testimonios: React.FC<TestimoniosProps> = ({ testimonios, onAddTestimonio }) => {
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [texto, setTexto] = useState('');
  const [estrellas, setEstrellas] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !texto) return;

    const nuevo: Testimonio = {
      id: Date.now(),
      nombre,
      rol: rol || 'Cliente Capricho Mágico',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      texto,
      estrellas,
      fecha: 'Ahora mismo',
    };

    onAddTestimonio(nuevo);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setNombre('');
      setRol('');
      setTexto('');
    }, 1500);
  };

  return (
    <section id="testimonios" className="py-20 bg-white dark:bg-[#2d2420] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8BBD0]/30 text-[#F48FB1] font-bold text-xs uppercase tracking-wider">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Experiencias Reales</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
            Lo que dicen nuestros clientes
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#F8BBD0] to-[#D4AF37] mx-auto rounded-full" />
          <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80">
            Reseñas y comentarios sinceros de quienes han probado el toque mágico en sus celebraciones.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 px-5 py-2.5 rounded-full bg-[#FFF8E7] dark:bg-[#1a1412] text-[#F48FB1] font-semibold text-xs border border-[#F8BBD0] shadow-sm hover:bg-[#F8BBD0] hover:text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showForm ? 'Cerrar Formulario' : 'Escribir mi Opinión'}</span>
          </button>
        </div>

        {/* Add Testimonial Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mb-12 p-6 bg-[#FFF8E7] dark:bg-[#1a1412] rounded-3xl border border-[#F8BBD0]/40 shadow-xl space-y-4 text-left animate-fadeIn"
          >
            <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
              ¡Déjanos tu reseña dulce!
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">Tu Nombre</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Sofía Mendoza"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">Ocasión / Rol</label>
                <input
                  type="text"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  placeholder="Ej. Cumpleaños, Boda, Cliente Frecuente"
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">Calificación</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEstrellas(star)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform"
                  >
                    <Star className={`w-5 h-5 ${star <= estrellas ? 'fill-amber-400' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6D4C41] dark:text-[#D7CCC8]">Tu Experiencia</label>
              <textarea
                required
                rows={3}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Cuéntanos qué te pareció el sabor, la decoración y el trato..."
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl border border-[#F8BBD0] bg-white dark:bg-[#2d2420] text-[#6D4C41] dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-2.5 rounded-full text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                submitted ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#F8BBD0] to-[#F48FB1]'
              }`}
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-bounce" />
                  <span>¡Gracias por publicar tu reseña!</span>
                </>
              ) : (
                <span>Publicar Opinión</span>
              )}
            </button>
          </form>
        )}

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonios.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFF8E7] dark:bg-[#1a1412] p-8 rounded-3xl shadow-sm hover:shadow-xl border border-[#F8BBD0]/30 transition-all duration-300 flex flex-col justify-between text-left relative group hover:-translate-y-1"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 font-serif text-6xl text-[#F8BBD0]/30 select-none pointer-events-none leading-none">
                “
              </div>

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex text-amber-400">
                  {[...Array(t.estrellas)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed italic">
                  "{t.texto}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#6D4C41]/10 dark:border-[#D7CCC8]/10 mt-6">
                <img
                  src={t.img}
                  alt={t.nombre}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F8BBD0]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#6D4C41] dark:text-[#EFEBE9]">
                    {t.nombre}
                  </h4>
                  <span className="text-[11px] text-[#F48FB1] font-medium block">
                    {t.rol}
                  </span>
                  {t.fecha && (
                    <span className="text-[10px] text-gray-400">{t.fecha}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
