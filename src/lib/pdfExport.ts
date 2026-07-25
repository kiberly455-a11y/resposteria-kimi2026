import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartItem, Producto, CustomCake, Promocion } from '../types';

/**
 * Common PDF header decorator function.
 */
const addPDFHeader = (doc: jsPDF, documentTitle: string, subtitle: string, folio: string) => {
  // Top Brown Band
  doc.setFillColor(109, 76, 65); // #6D4C41
  doc.rect(0, 0, 210, 28, 'F');

  // Pink Accent Divider
  doc.setFillColor(248, 187, 208); // #F8BBD0
  doc.rect(0, 28, 210, 2, 'F');

  // Bakery Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('DULCES CAPRICHO MÁGICO', 14, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('REPOSTERÍA ARTESANAL & POSTRES GOURMET', 14, 22);

  // Document Title & Folio
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(documentTitle.toUpperCase(), 196, 15, { align: 'right' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle ? `${subtitle} | ${folio}` : folio, 196, 21, { align: 'right' });
};

/**
 * Common PDF footer decorator function.
 */
const addPDFFooter = (doc: jsPDF) => {
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(109, 76, 65);
  doc.rect(0, pageHeight - 15, 210, 15, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '¡Gracias por preferir Dulces Capricho Mágico! Tel/WhatsApp: +52 55 1234 5678 | Av. Dulzura #124, CDMX',
    105,
    pageHeight - 7,
    { align: 'center' }
  );
};

/**
 * 1. Export Active Cart / Cotización as PDF.
 */
export const generateCartPDF = (cartItems: CartItem[], clientName: string = 'Cliente Especial'): void => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  const folio = `COT-${Math.floor(100000 + Math.random() * 900000)}`;

  addPDFHeader(doc, 'Cotización de Pedido', `Fecha: ${today}`, `Folio: ${folio}`);

  // Client & Bakery info
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMACIÓN DE LA COTIZACIÓN', 14, 38);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Cliente: ${clientName || 'Cliente Especial'}`, 14, 44);
  doc.text(`Fecha de emisión: ${today}`, 14, 49);
  doc.text('Estado: Pendiente de confirmación', 14, 54);

  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DE LA PASTELERÍA', 120, 38);
  doc.setFont('helvetica', 'normal');
  doc.text('Av. Dulzura #124, Col. Las Flores, CDMX', 120, 44);
  doc.text('Tel / WhatsApp: +52 55 1234 5678', 120, 49);
  doc.text('Email: contacto@caprichomagico.com', 120, 54);

  doc.setDrawColor(230, 230, 230);
  doc.line(14, 59, 196, 59);

  const tableHead = [['#', 'Producto / Detalle', 'Notas de Preparación', 'Cant.', 'P. Unitario', 'Subtotal']];
  const tableRows = cartItems.map((item, index) => [
    (index + 1).toString(),
    item.nombre,
    item.notas ? item.notas : 'Sin especificaciones',
    item.cantidad.toString(),
    `$${item.precio.toLocaleString('es-MX')}.00 MXN`,
    `$${(item.precio * item.cantidad).toLocaleString('es-MX')}.00 MXN`,
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  autoTable(doc, {
    startY: 64,
    head: tableHead,
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [109, 76, 65], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: [50, 50, 50], fontSize: 8.5 },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 55 },
      2: { cellWidth: 55 },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 24, halign: 'right' },
      5: { cellWidth: 23, halign: 'right' },
    },
    margin: { left: 14, right: 14 },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFillColor(255, 248, 231);
  doc.setDrawColor(248, 187, 208);
  doc.roundedRect(110, finalY, 86, 28, 3, 3, 'FD');

  doc.setTextColor(109, 76, 65);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal de Productos:', 115, finalY + 8);
  doc.text(`$${total.toLocaleString('es-MX')}.00 MXN`, 190, finalY + 8, { align: 'right' });

  doc.text('Envío / Entrega:', 115, finalY + 14);
  doc.text('A cotizar por zona', 190, finalY + 14, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('TOTAL ESTIMADO:', 115, finalY + 22);
  doc.text(`$${total.toLocaleString('es-MX')}.00 MXN`, 190, finalY + 22, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(109, 76, 65);
  doc.text('TÉRMINOS Y CONDICIONES:', 14, finalY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('• Cotización válida por 15 días naturales.', 14, finalY + 13);
  doc.text('• Se requiere el 50% de anticipo para programar el pedido.', 14, finalY + 18);
  doc.text('• Pedidos especiales o personalizados requieren 48h de anticipación.', 14, finalY + 23);

  addPDFFooter(doc);
  doc.save(`Cotizacion_Capricho_${clientName.replace(/\s+/g, '_')}_${folio}.pdf`);
};

/**
 * 2. Export Entire Product Catalog as PDF Menu.
 */
export const generateCatalogPDF = (productos: Producto[]): void => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  addPDFHeader(doc, 'Menú Oficial de Productos', `Edición ${today}`, 'Dulces Capricho Mágico');

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('A continuación presentamos nuestra selección exclusiva de repostería artesanal gourmet.', 14, 38);

  const tableHead = [['Categoría', 'Producto', 'Descripción', 'Precio']];
  const tableRows = productos.map((p) => [
    p.categoria.toUpperCase(),
    p.nombre,
    p.descripcion,
    `$${p.precio.toLocaleString('es-MX')}.00 MXN`,
  ]);

  autoTable(doc, {
    startY: 44,
    head: tableHead,
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [109, 76, 65], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: [50, 50, 50], fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 25, fontStyle: 'bold' },
      1: { cellWidth: 45, fontStyle: 'bold' },
      2: { cellWidth: 82 },
      3: { cellWidth: 30, halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: 14, right: 14 },
  });

  addPDFFooter(doc);
  doc.save(`Menu_Oficial_Capricho_Magico.pdf`);
};

/**
 * 3. Export Custom Cake Design Worksheet as PDF.
 */
export const generateCustomCakePDF = (
  cake: CustomCake,
  totalPrice: number,
  clientName: string = 'Cliente Especial'
): void => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  const folio = `CAKE-${Math.floor(100000 + Math.random() * 900000)}`;

  addPDFHeader(doc, 'Diseño de Pastel Personalizado', `Fecha: ${today}`, `Folio: ${folio}`);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('ESPECIFICACIONES TÉCNICAS DEL PASTEL', 14, 38);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Cliente: ${clientName}`, 14, 44);
  doc.text(`Fecha de diseño: ${today}`, 14, 49);

  const tableHead = [['Componente del Pastel', 'Elección Seleccionada', 'Precio Componente']];
  const tableRows = [
    ['Porciones y Tamaño', cake.porciones, `$${cake.porcionesPrecio}.00 MXN`],
    ['Sabor de Bizcocho', cake.bizcocho, `$${cake.bizcochoPrecio}.00 MXN`],
    ['Relleno Gourmet', cake.relleno, `$${cake.rellenoPrecio}.00 MXN`],
    ['Cobertura y Decorado', cake.cobertura, `$${cake.coberturaPrecio}.00 MXN`],
    ['Dedicatoria Personalizada', cake.dedicatoria ? `"${cake.dedicatoria}"` : 'Sin dedicatoria', 'Incluido'],
  ];

  autoTable(doc, {
    startY: 55,
    head: tableHead,
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [248, 187, 208], textColor: [109, 76, 65], fontStyle: 'bold', fontSize: 10 },
    bodyStyles: { textColor: [50, 50, 50], fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold' },
      1: { cellWidth: 90 },
      2: { cellWidth: 42, halign: 'right', fontStyle: 'bold' },
    },
    margin: { left: 14, right: 14 },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 12;

  doc.setFillColor(255, 248, 231);
  doc.setDrawColor(248, 187, 208);
  doc.roundedRect(14, finalY, 182, 24, 3, 3, 'FD');

  doc.setTextColor(109, 76, 65);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PRECIO TOTAL ESTIMADO DEL PASTEL:', 20, finalY + 15);
  doc.text(`$${totalPrice.toLocaleString('es-MX')}.00 MXN`, 188, finalY + 15, { align: 'right' });

  addPDFFooter(doc);
  doc.save(`Pastel_Personalizado_${clientName.replace(/\s+/g, '_')}_${folio}.pdf`);
};

/**
 * 4. Export Active Promotions / Coupons Flyer as PDF.
 */
export const generatePromoPDF = (promociones: Promocion[]): void => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  addPDFHeader(doc, 'Cupones & Promociones Especiales', `Válido: ${today}`, 'Capricho Mágico');

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Presenta estas promociones al realizar tu pedido en tienda o por WhatsApp.', 14, 38);

  const tableHead = [['Promoción / Oferta', 'Descuento / Beneficio', 'Descripción de la Oferta']];
  const tableRows = promociones.map((p) => [
    p.titulo,
    p.descuento,
    p.desc,
  ]);

  autoTable(doc, {
    startY: 44,
    head: tableHead,
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [244, 143, 177], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { textColor: [50, 50, 50], fontSize: 8.5 },
    columnStyles: {
      0: { cellWidth: 55, fontStyle: 'bold' },
      1: { cellWidth: 42, fontStyle: 'bold', textColor: [216, 27, 96] },
      2: { cellWidth: 85 },
    },
    margin: { left: 14, right: 14 },
  });

  addPDFFooter(doc);
  doc.save(`Promociones_Capricho_Magico.pdf`);
};
