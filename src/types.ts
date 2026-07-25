export interface Producto {
  id: number;
  nombre: string;
  categoria: 'pasteles' | 'postres' | 'galletas' | 'chocolates';
  descripcion: string;
  precio: number;
  oldPrecio?: number | null;
  img: string;
  badge?: string | null;
  estrellas?: number;
  ventas?: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. product.id + notes or custom cake)
  productoId?: number;
  nombre: string;
  precio: number;
  cantidad: number;
  img: string;
  descripcion?: string;
  notas?: string;
  isCustomCake?: boolean;
}

export interface Promocion {
  id: number;
  titulo: string;
  desc: string;
  descuento: string;
  icono: string;
  dias: number;
}

export interface GaleriaItem {
  id: number;
  img: string;
  titulo: string;
  subtitulo: string;
  tall?: boolean;
  wide?: boolean;
}

export interface Testimonio {
  id: number;
  nombre: string;
  rol: string;
  img: string;
  texto: string;
  estrellas: number;
  fecha?: string;
}

export interface FAQ {
  id: number;
  pregunta: string;
  respuesta: string;
}

export interface CustomCake {
  porciones: string;
  porcionesPrecio: number;
  bizcocho: string;
  bizcochoPrecio: number;
  relleno: string;
  rellenoPrecio: number;
  cobertura: string;
  coberturaPrecio: number;
  dedicatoria: string;
}
