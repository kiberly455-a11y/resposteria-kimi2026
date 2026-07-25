import { CartItem, Producto, CustomCake } from '../types';

export interface GoogleDocFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export interface GoogleDocContent {
  title: string;
  bodyText: string;
}

/**
 * Creates a new blank Google Document in the user's Google Drive with a given title.
 */
export const createGoogleDoc = async (title: string, accessToken: string): Promise<string> => {
  const response = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Error al crear el Documento en Google Docs');
  }

  const data = await response.json();
  return data.documentId;
};

/**
 * Appends text content to a Google Document using batchUpdate.
 */
export const appendTextToGoogleDoc = async (
  documentId: string,
  text: string,
  accessToken: string
) => {
  const response = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: text,
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Error al actualizar el contenido del Google Doc');
  }

  return await response.json();
};

/**
 * Fetches Google Docs files from the user's Google Drive.
 */
export const listGoogleDocs = async (accessToken: string): Promise<GoogleDocFile[]> => {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.document'");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,createdTime,modifiedTime,webViewLink)&orderBy=modifiedTime desc&pageSize=15`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Error al obtener la lista de Google Docs');
  }

  const data = await response.json();
  return data.files || [];
};

/**
 * Reads a Google Document content by ID.
 */
export const readGoogleDoc = async (
  documentId: string,
  accessToken: string
): Promise<GoogleDocContent> => {
  const response = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Error al leer el Google Doc');
  }

  const data = await response.json();
  let fullText = '';

  if (data.body?.content) {
    data.body.content.forEach((element: any) => {
      if (element.paragraph?.elements) {
        element.paragraph.elements.forEach((elem: any) => {
          if (elem.textRun?.content) {
            fullText += elem.textRun.content;
          }
        });
      }
    });
  }

  return {
    title: data.title || 'Documento sin título',
    bodyText: fullText,
  };
};

/**
 * Permanently deletes a Google Doc from Drive.
 */
export const deleteGoogleDoc = async (fileId: string, accessToken: string): Promise<boolean> => {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Error al eliminar el archivo de Google Drive');
  }

  return true;
};

/**
 * Export active shopping cart as a styled order quote in a Google Doc.
 */
export const exportCartToGoogleDoc = async (
  cartItems: CartItem[],
  clientName: string,
  accessToken: string
): Promise<{ documentId: string; docUrl: string }> => {
  const today = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const docTitle = `Cotización Pedido Capricho - ${clientName || 'Cliente'} (${today})`;
  const documentId = await createGoogleDoc(docTitle, accessToken);

  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  let docText = `=========================================================\n`;
  docText += `          DULCES CAPRICHO MÁGICO - FICHA DE PEDIDO       \n`;
  docText += `=========================================================\n\n`;
  docText += `Fecha de Emisión: ${today}\n`;
  docText += `Cliente: ${clientName || 'Público General'}\n`;
  docText += `Estado: Pendiente de Confirmación\n\n`;
  docText += `---------------------------------------------------------\n`;
  docText += `DETALLE DE PRODUCTOS SELECCIONADOS:\n`;
  docText += `---------------------------------------------------------\n\n`;

  cartItems.forEach((item, index) => {
    docText += `${index + 1}. ${item.nombre.toUpperCase()}\n`;
    docText += `   Cantidad: ${item.cantidad} unidad(es)\n`;
    docText += `   Precio Unitario: $${item.precio.toLocaleString('es-MX')}.00 MXN\n`;
    docText += `   Subtotal Item: $${(item.precio * item.cantidad).toLocaleString('es-MX')}.00 MXN\n`;
    if (item.notas) {
      docText += `   Notas/Instrucciones: ${item.notas}\n`;
    }
    docText += `\n`;
  });

  docText += `---------------------------------------------------------\n`;
  docText += `RESUMEN FINANCIERO:\n`;
  docText += `---------------------------------------------------------\n`;
  docText += `Subtotal General: $${subtotal.toLocaleString('es-MX')}.00 MXN\n`;
  docText += `Envío Estimado: A cotizar según zona\n`;
  docText += `TOTAL COTIZADO: $${subtotal.toLocaleString('es-MX')}.00 MXN\n\n`;

  docText += `---------------------------------------------------------\n`;
  docText += `INFORMACIÓN DE LA REPOSTERÍA:\n`;
  docText += `Dulces Capricho Mágico - Repostería Artesanal Gourmet\n`;
  docText += `Dirección: Av. Dulzura #124, Colonia Las Flores, CDMX\n`;
  docText += `Teléfono / WhatsApp: +52 55 1234 5678\n`;
  docText += `Horario de atención: Lunes a Sábado de 8:00 AM a 8:00 PM\n`;
  docText += `=========================================================\n`;

  await appendTextToGoogleDoc(documentId, docText, accessToken);

  return {
    documentId,
    docUrl: `https://docs.google.com/document/d/${documentId}/edit`,
  };
};

/**
 * Export custom cake configuration to a Google Doc.
 */
export const exportCustomCakeToGoogleDoc = async (
  cake: CustomCake,
  totalPrice: number,
  clientName: string,
  accessToken: string
): Promise<{ documentId: string; docUrl: string }> => {
  const today = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const docTitle = `Diseño Pastel Personalizado - ${clientName || 'Cliente'} (${today})`;
  const documentId = await createGoogleDoc(docTitle, accessToken);

  let docText = `=========================================================\n`;
  docText += `       DULCES CAPRICHO MÁGICO - DISEÑO DE PASTEL         \n`;
  docText += `=========================================================\n\n`;
  docText += `Fecha: ${today}\n`;
  docText += `Cliente: ${clientName || 'Cliente Especial'}\n\n`;
  docText += `---------------------------------------------------------\n`;
  docText += `ESPECIFICACIONES DEL PASTEL:\n`;
  docText += `---------------------------------------------------------\n`;
  docText += `• Tamaños & Porciones: ${cake.porciones} ($${cake.porcionesPrecio} MXN)\n`;
  docText += `• Tipo de Bizcocho: ${cake.bizcocho} ($${cake.bizcochoPrecio} MXN)\n`;
  docText += `• Relleno Gourmet: ${cake.relleno} ($${cake.rellenoPrecio} MXN)\n`;
  docText += `• Cobertura / Decorado: ${cake.cobertura} ($${cake.coberturaPrecio} MXN)\n`;
  if (cake.dedicatoria) {
    docText += `• Dedicatoria Escrita: "${cake.dedicatoria}"\n`;
  }
  docText += `\n---------------------------------------------------------\n`;
  docText += `PRECIO TOTAL ESTIMADO: $${totalPrice.toLocaleString('es-MX')}.00 MXN\n`;
  docText += `---------------------------------------------------------\n\n`;
  docText += `Documento generado automáticamente desde la plataforma de Dulces Capricho Mágico.\n`;

  await appendTextToGoogleDoc(documentId, docText, accessToken);

  return {
    documentId,
    docUrl: `https://docs.google.com/document/d/${documentId}/edit`,
  };
};

/**
 * Export entire product catalog to a Google Doc menu.
 */
export const exportCatalogToGoogleDoc = async (
  productos: Producto[],
  accessToken: string
): Promise<{ documentId: string; docUrl: string }> => {
  const today = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const docTitle = `Menú Oficial Dulces Capricho Mágico - ${today}`;
  const documentId = await createGoogleDoc(docTitle, accessToken);

  let docText = `=========================================================\n`;
  docText += `        MENÚ OFICIAL DULCES CAPRICHO MÁGICO 🧁🎂         \n`;
  docText += `=========================================================\n\n`;
  docText += `Catálogo de Repostería Artesanal y Postres Gourmet\n`;
  docText += `Actualizado: ${today}\n\n`;

  const categorias = ['pasteles', 'postres', 'galletas', 'chocolates'] as const;

  categorias.forEach((cat) => {
    const items = productos.filter((p) => p.categoria === cat);
    if (items.length > 0) {
      docText += `---------------------------------------------------------\n`;
      docText += `CATEGORÍA: ${cat.toUpperCase()}\n`;
      docText += `---------------------------------------------------------\n\n`;

      items.forEach((item) => {
        docText += `• ${item.nombre} - $${item.precio.toLocaleString('es-MX')}.00 MXN\n`;
        docText += `  ${item.descripcion}\n\n`;
      });
    }
  });

  docText += `=========================================================\n`;
  docText += `Pedidos & Cotizaciones Especiales:\n`;
  docText += `Sitio Web / WhatsApp: +52 55 1234 5678\n`;
  docText += `=========================================================\n`;

  await appendTextToGoogleDoc(documentId, docText, accessToken);

  return {
    documentId,
    docUrl: `https://docs.google.com/document/d/${documentId}/edit`,
  };
};
