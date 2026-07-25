import { Producto, Promocion, GaleriaItem, Testimonio, FAQ } from '../types';

export const productosData: Producto[] = [
  {
    id: 1,
    nombre: "Pastel de Chocolate Premium",
    categoria: "pasteles",
    descripcion: "Bizcocho suave de chocolate belga con capa cremosa de ganache 70% cacao y decoración de frutos rojos frescos.",
    precio: 850,
    oldPrecio: 950,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    badge: "Más vendido",
    estrellas: 5,
    ventas: "1,240 vendidos"
  },
  {
    id: 2,
    nombre: "Cupcakes de Vainilla y Flores",
    categoria: "postres",
    descripcion: "Esponjosos cupcakes de vainilla pura de Papantla con suave buttercream artesanal en forma de flores pasteles.",
    precio: 320,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80",
    badge: null,
    estrellas: 5,
    ventas: "950 vendidos"
  },
  {
    id: 3,
    nombre: "Cheesecake de Fresa Artesanal",
    categoria: "postres",
    descripcion: "Cremoso cheesecake estilo Nueva York con generoso coulis natural de fresas silvestres y crujiente base de galleta de mantequilla.",
    precio: 480,
    oldPrecio: 550,
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    badge: "Oferta",
    estrellas: 5,
    ventas: "890 vendidos"
  },
  {
    id: 4,
    nombre: "Brownies Triple Chocolate",
    categoria: "chocolates",
    descripcion: "Brownies súper húmedos elaborados con tres variedades de chocolate belga (negro, con leche y blanco) y trozos de nuez.",
    precio: 280,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
    badge: "Favorito",
    estrellas: 5,
    ventas: "1,100 vendidos"
  },
  {
    id: 5,
    nombre: "Donas Artesanales Gourmet",
    categoria: "postres",
    descripcion: "Caja de 6 donas horneadas artesanalmente con glaseado de tocino dulce, frutos rojos, matcha y chocolate avellana.",
    precio: 220,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
    badge: "Nuevo",
    estrellas: 5,
    ventas: "420 vendidos"
  },
  {
    id: 6,
    nombre: "Galletas Decoradas de Mantequilla",
    categoria: "galletas",
    descripcion: "Galletas de fina mantequilla danesa decoradas a mano con glacé real ideal para festejos y detalles especiales.",
    precio: 180,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
    badge: null,
    estrellas: 5,
    ventas: "630 vendidos"
  },
  {
    id: 7,
    nombre: "Tarta de Frutas Frescas de Estación",
    categoria: "pasteles",
    descripcion: "Masa sablée crujiente con suave crema pastelera infusionada en vaina de vainilla y corona de frutas naturales finamente cortadas.",
    precio: 620,
    oldPrecio: 700,
    img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
    badge: "Oferta",
    estrellas: 5,
    ventas: "510 vendidos"
  },
  {
    id: 8,
    nombre: "Vaso Tiramisú Tradicional",
    categoria: "postres",
    descripcion: "Capas de bizcocho soletilla empapadas en café espresso recién extraído y licor de amaretto con auténtico queso mascarpone italiano.",
    precio: 150,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
    badge: null,
    estrellas: 5,
    ventas: "780 vendidos"
  },
  {
    id: 9,
    nombre: "Macarons Franceses Surtidos",
    categoria: "galletas",
    descripcion: "Elegante caja de 12 macarons crujientes por fuera y tiernos por dentro con rellenos artesanales de pistache, frambuesa, maracuyá y café.",
    precio: 380,
    oldPrecio: 450,
    img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=80",
    badge: "Oferta",
    estrellas: 5,
    ventas: "756 vendidos"
  },
  {
    id: 10,
    nombre: "Trufas de Chocolate Fino",
    categoria: "chocolates",
    descripcion: "Caja de 12 trufas hechas a mano con cobertura de cacao en polvo, almendra tostada y un toque suave de licor de avellanas.",
    precio: 260,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80",
    badge: null,
    estrellas: 5,
    ventas: "340 vendidos"
  },
  {
    id: 11,
    nombre: "Pastel Red Velvet Mágico",
    categoria: "pasteles",
    descripcion: "El clásico terciopelo rojo de textura sedosa combinado con un cremoso y equilibrado frosting de queso crema con toque de limón.",
    precio: 780,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1586788680434-30d3246262fd?w=600&q=80",
    badge: "Especial",
    estrellas: 5,
    ventas: "670 vendidos"
  },
  {
    id: 12,
    nombre: "Galletas de Especias y Jengibre",
    categoria: "galletas",
    descripcion: "Galletas aromáticas con toque de canela, jengibre y nuez moscada, suavemente glaseadas para acompañar tu café o té favorito.",
    precio: 200,
    oldPrecio: null,
    img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=80",
    badge: null,
    estrellas: 5,
    ventas: "290 vendidos"
  }
];

export const promocionesData: Promocion[] = [
  {
    id: 1,
    titulo: "Combo Cumpleaños Mágico",
    desc: "1 Pastel Mediano (a elegir) + 12 Cupcakes Temáticos + Set de Velas decorativas de regalo.",
    descuento: "20% OFF",
    icono: "Gift",
    dias: 3
  },
  {
    id: 2,
    titulo: "Martes Dulce de Donas",
    desc: "En la compra de tu caja de 6 donas artesanales te regala 2 donas extras a tu elección.",
    descuento: "2x1",
    icono: "Tag",
    dias: 2
  },
  {
    id: 3,
    titulo: "Pack Familiar Capricho",
    desc: "Combo de Brownies Triple Chocolate + 12 Macarons surtidos + 6 Trufas de regalo.",
    descuento: "15% OFF",
    icono: "Users",
    dias: 5
  }
];

export const galeriaData: GaleriaItem[] = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
    titulo: "Pastel de Bodas Mágico",
    subtitulo: "Decoración con flores naturales y detalles dorados en pan de oro",
    tall: true
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1556217477-d325251ece38?w=800&q=80",
    titulo: "Elaboración Artesanal",
    subtitulo: "Cuidado minucioso en cada técnica y horneado",
    tall: false
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1515037028865-0a2a82603f7c?w=800&q=80",
    titulo: "Cupcakes de Fiesta",
    subtitulo: "Diseños personalizados para mesas temáticas",
    tall: false
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    titulo: "Mesa de Postres Dulce",
    subtitulo: "Servicio completo para eventos empresariales y XV años",
    tall: true
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1543508168-780df5c6c7ff?w=800&q=80",
    titulo: "Tartas de Fruta Silvestre",
    subtitulo: "Ingredientes 100% frescos y orgánicos",
    wide: true
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80",
    titulo: "Vasitos Gourmet",
    subtitulo: "Presentación en frascos individuales para mesa dulce",
    tall: false
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80",
    titulo: "Bombones de Cacao Fino",
    subtitulo: "Rellenos de licor, café espresso y maracuyá",
    tall: false
  }
];

export const testimoniosData: Testimonio[] = [
  {
    id: 1,
    nombre: "María Fernanda López",
    rol: "Cliente habitual",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    texto: "¡El pastel de chocolate fue verdaderamente espectacular! Todos en la fiesta de mi hijo quedaron encantados. La atención por WhatsApp fue súper rápida y la entrega impecable. Definitivamente mi repostería favorita.",
    estrellas: 5,
    fecha: "Hace 2 días"
  },
  {
    id: 2,
    nombre: "Carlos Ramírez",
    rol: "Organizador de Eventos",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    texto: "Contratamos la mesa de postres para nuestro evento corporativo de fin de año y superó todas las expectativas. La presentación elegante, la frescura y la variedad hicieron que todos los ejecutivos quedaran encantados.",
    estrellas: 5,
    fecha: "Hace 1 semana"
  },
  {
    id: 3,
    nombre: "Ana Patricia Gómez",
    rol: "Novia en Boda Capricho",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    texto: "Mi pastel de bodas fue un sueño hecho realidad. Cada capa tenía un sabor exquisito y los detalles de flores en azúcar parecían de verdad. Dulces Capricho Mágico hizo que nuestro gran día fuera aún más dulce.",
    estrellas: 5,
    fecha: "Hace 3 semanas"
  }
];

export const faqsData: FAQ[] = [
  {
    id: 1,
    pregunta: "¿Realizan pedidos de pasteles totalmente personalizados?",
    respuesta: "¡Por supuesto! Nos encanta crear diseños únicos. Puedes personalizar el tamaño de las porciones, el sabor del bizcocho, el relleno, la cobertura y agregar textos o impresiones comestibles. También puedes usar nuestro Diseñador de Pasteles interactivo en la página."
  },
  {
    id: 2,
    pregunta: "¿Con cuánto tiempo de anticipación debo solicitar mi pedido?",
    respuesta: "Recomendamos hacer tus pedidos estándar con 24 a 48 horas de anticipación. Para pasteles temáticos, personalizados o eventos grandes (bodas, XV años), sugerimos apartar tu fecha con 5 a 7 días hábiles de anticipación."
  },
  {
    id: 3,
    pregunta: "¿Qué métodos de pago tienen disponibles?",
    respuesta: "Aceptamos pagos con tarjeta de crédito/débito (Visa, Mastercard, AMEX), transferencia bancaria en línea, efectivo al recibir o mediante mercado de pagos/PayPal. También puedes pagar directamente por WhatsApp al coordinar tu entrega."
  },
  {
    id: 4,
    pregunta: "¿Cuentan con servicio de entrega a domicilio?",
    respuesta: "Sí, realizamos envíos seguros con empaques especiales en toda la Ciudad de México y área metropolitana. El costo se calcula según la distancia o es gratis en pedidos mayores a $1,200 MXN."
  },
  {
    id: 5,
    pregunta: "¿Tienen opciones sin gluten, veganas o reducidas en azúcar?",
    respuesta: "Sí, disponemos de una línea de repostería especial 'Bienestar' que incluye brownies veganos, bizcochos de almendra sin gluten y opciones endulzadas con monk fruit o estevia."
  },
  {
    id: 6,
    pregunta: "¿Cómo debo conservar mis postres para mantener la máxima frescura?",
    respuesta: "Nuestros pasteles y cheesecakes deben mantenerse en refrigeración entre 4°C y 7°C. Recomendamos retirarlos del refrigerador 15-20 minutos antes de consumir para que la crema adquiera su textura perfecta."
  }
];
