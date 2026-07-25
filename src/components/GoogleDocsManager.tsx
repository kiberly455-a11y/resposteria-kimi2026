import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  googleSignOut,
  getAccessToken,
} from '../lib/googleAuth';
import {
  listGoogleDocs,
  readGoogleDoc,
  deleteGoogleDoc,
  exportCatalogToGoogleDoc,
  exportCartToGoogleDoc,
  GoogleDocFile,
  GoogleDocContent,
} from '../lib/googleDocsService';
import { CartItem, Producto } from '../types';
import {
  FileText,
  FilePlus,
  Trash2,
  ExternalLink,
  RefreshCw,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileSpreadsheet,
  ShoppingBag,
  Sparkles,
  BookOpen,
  X,
  FileDown,
} from 'lucide-react';
import { generateCartPDF } from '../lib/pdfExport';

interface GoogleDocsManagerProps {
  cartItems: CartItem[];
  productos: Producto[];
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const GoogleDocsManager: React.FC<GoogleDocsManagerProps> = ({
  cartItems,
  productos,
  onShowToast,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [docsList, setDocsList] = useState<GoogleDocFile[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [selectedDocContent, setSelectedDocContent] = useState<GoogleDocContent | null>(null);
  const [viewingDocId, setViewingDocId] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

  // Destructive action confirmation state
  const [fileToDelete, setFileToDelete] = useState<GoogleDocFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Export action loading states
  const [isExportingCatalog, setIsExportingCatalog] = useState(false);
  const [isExportingCart, setIsExportingCart] = useState(false);

  // Initialize auth listener on load
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch docs list whenever accessToken changes
  useEffect(() => {
    if (accessToken) {
      handleFetchDocs();
    }
  }, [accessToken]);

  const checkAuthError = (err: any) => {
    const msg = (err?.message || '').toLowerCase();
    if (
      msg.includes('scope') ||
      msg.includes('authentication') ||
      msg.includes('permission') ||
      msg.includes('401') ||
      msg.includes('403')
    ) {
      onShowToast('Permisos insuficientes o sesión expirada. Por favor vuelve a iniciar sesión con Google.', 'error');
      setNeedsAuth(true);
      setAccessToken(null);
    }
  };

  const handleFetchDocs = async () => {
    if (!accessToken) return;
    setLoadingDocs(true);
    try {
      const files = await listGoogleDocs(accessToken);
      setDocsList(files);
    } catch (err: any) {
      console.error('Error al cargar documentos:', err);
      onShowToast('Error al obtener lista de Google Docs: ' + (err.message || ''), 'error');
      checkAuthError(err);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
        onShowToast(`¡Sesión iniciada con Google as ${result.user.email}!`, 'success');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      onShowToast('No se pudo completar el inicio de sesión con Google.', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await googleSignOut();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
    setDocsList([]);
    setSelectedDocContent(null);
    onShowToast('Sesión de Google cerrada', 'info');
  };

  const handleExportCatalog = async () => {
    if (!accessToken) {
      onShowToast('Debes iniciar sesión con Google para exportar', 'error');
      return;
    }
    setIsExportingCatalog(true);
    try {
      const result = await exportCatalogToGoogleDoc(productos, accessToken);
      onShowToast('¡Menú de productos exportado con éxito a Google Docs!', 'success');
      handleFetchDocs();
      window.open(result.docUrl, '_blank');
    } catch (err: any) {
      console.error('Export error:', err);
      onShowToast('Error al exportar catálogo: ' + err.message, 'error');
      checkAuthError(err);
    } finally {
      setIsExportingCatalog(false);
    }
  };

  const handleExportCart = async () => {
    if (!accessToken) {
      onShowToast('Debes iniciar sesión con Google para exportar', 'error');
      return;
    }
    if (cartItems.length === 0) {
      onShowToast('El carrito está vacío. Agrega productos para exportar.', 'info');
      return;
    }
    setIsExportingCart(true);
    try {
      const result = await exportCartToGoogleDoc(cartItems, user?.displayName || 'Cliente', accessToken);
      onShowToast('¡Cotización de carrito creada en Google Docs!', 'success');
      handleFetchDocs();
      window.open(result.docUrl, '_blank');
    } catch (err: any) {
      console.error('Export error:', err);
      onShowToast('Error al exportar cotización: ' + err.message, 'error');
      checkAuthError(err);
    } finally {
      setIsExportingCart(false);
    }
  };

  const handleViewDoc = async (file: GoogleDocFile) => {
    if (!accessToken) return;
    setViewingDocId(file.id);
    setLoadingContent(true);
    try {
      const content = await readGoogleDoc(file.id, accessToken);
      setSelectedDocContent(content);
    } catch (err: any) {
      console.error('Read doc error:', err);
      onShowToast('Error al leer el documento: ' + err.message, 'error');
      checkAuthError(err);
    } finally {
      setLoadingContent(false);
    }
  };

  const confirmDeleteDoc = async () => {
    if (!fileToDelete || !accessToken) return;
    setIsDeleting(true);
    try {
      await deleteGoogleDoc(fileToDelete.id, accessToken);
      onShowToast(`El documento "${fileToDelete.name}" ha sido eliminado`, 'info');
      setFileToDelete(null);
      if (viewingDocId === fileToDelete.id) {
        setSelectedDocContent(null);
        setViewingDocId(null);
      }
      handleFetchDocs();
    } catch (err: any) {
      console.error('Delete error:', err);
      onShowToast('No se pudo eliminar el archivo: ' + err.message, 'error');
      checkAuthError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section id="googledocs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4285F4]/10 text-[#4285F4] text-xs font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Integración Oficial Google Workspace</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
          Gestor de Documentos Google Docs
        </h2>
        <p className="text-sm text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 max-w-2xl mx-auto">
          Exporta cotizaciones de pedidos, catálogos de productos y fichas técnicas de tus pasteles directamente a tu cuenta de Google Docs en tiempo real.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-[#2d2420] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#F8BBD0]/40 space-y-8">
        {/* Auth Topbar / Sign In Banner */}
        {needsAuth || !user ? (
          <div className="bg-[#FFF8E7] dark:bg-[#1a1412] p-6 rounded-2xl border border-[#F8BBD0] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Conecta tu cuenta de Google
              </h3>
              <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70">
                Inicia sesión para sincronizar tus pedidos con Google Docs y administrar tus archivos en Google Drive con total seguridad.
              </p>
            </div>

            {/* Official Material Google Sign-In Button */}
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-100 font-semibold text-sm rounded-full border border-gray-300 dark:border-neutral-600 shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{isLoggingIn ? 'Conectando con Google...' : 'Iniciar sesión con Google'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-[#FFF8E7] dark:bg-[#1a1412] p-4 rounded-2xl border border-[#F8BBD0]/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'Usuario'} className="w-10 h-10 rounded-full border-2 border-[#4285F4]" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold">
                  {user.email?.[0].toUpperCase() || 'G'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#6D4C41] dark:text-[#EFEBE9]">
                    {user.displayName || user.email}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Conectado a Google Docs
                  </span>
                </div>
                <span className="text-xs text-gray-500 block">{user.email}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 hover:bg-rose-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}

        {/* Action Export Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Export Catalog Card */}
          <div className="p-5 rounded-2xl border border-[#F8BBD0]/40 bg-[#FFF8E7]/40 dark:bg-[#1a1412]/50 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Exportar Menú y Catálogo
              </h4>
              <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70">
                Genera un documento oficial de Google Docs formateado con todos los productos y precios.
              </p>
            </div>

            <button
              onClick={handleExportCatalog}
              disabled={needsAuth || isExportingCatalog}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FilePlus className="w-4 h-4" />
              <span>{isExportingCatalog ? 'Creando...' : 'Crear Google Doc'}</span>
            </button>
          </div>

          {/* Export Cart Quote to Google Docs Card */}
          <div className="p-5 rounded-2xl border border-[#F8BBD0]/40 bg-[#FFF8E7]/40 dark:bg-[#1a1412]/50 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#FBBC05]/10 text-[#D97706] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Cotización a Google Docs
              </h4>
              <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70">
                Guarda la cotización de tu carrito ({cartItems.reduce((a, b) => a + b.cantidad, 0)} items) directamente en tu Google Drive.
              </p>
            </div>

            <button
              onClick={handleExportCart}
              disabled={needsAuth || isExportingCart || cartItems.length === 0}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F8BBD0] via-[#F48FB1] to-[#CE93D8] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isExportingCart ? 'Exportando...' : 'Exportar a Google Docs'}</span>
            </button>
          </div>

          {/* Export Cart to PDF Card */}
          <div className="p-5 rounded-2xl border border-[#F8BBD0]/40 bg-[#FFF8E7]/40 dark:bg-[#1a1412]/50 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <FileDown className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Descargar Cotización PDF
              </h4>
              <p className="text-xs text-[#6D4C41]/70 dark:text-[#D7CCC8]/70">
                Descarga de inmediato un archivo PDF imprimible con el membrete, logo y desglose oficial de la pastelería.
              </p>
            </div>

            <button
              onClick={() => {
                if (cartItems.length === 0) {
                  onShowToast('El carrito está vacío. Agrega productos para descargar el PDF.', 'info');
                  return;
                }
                generateCartPDF(cartItems, user?.displayName || 'Cliente Especial');
                onShowToast('¡Cotización descargada en PDF exitosamente!', 'success');
              }}
              disabled={cartItems.length === 0}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar PDF Oficial</span>
            </button>
          </div>
        </div>

        {/* Drive Google Docs File Explorer */}
        <div className="space-y-4 pt-4 border-t border-[#6D4C41]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#4285F4]" />
              <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                Mis Documentos en Google Drive
              </h3>
            </div>

            <button
              onClick={handleFetchDocs}
              disabled={needsAuth || loadingDocs}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 transition-colors cursor-pointer disabled:opacity-50"
              title="Actualizar lista de documentos"
            >
              <RefreshCw className={`w-4 h-4 ${loadingDocs ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {needsAuth ? (
            <div className="text-center py-10 space-y-2 opacity-60">
              <FileText className="w-12 h-12 text-[#4285F4] mx-auto" />
              <p className="text-xs font-semibold text-[#6D4C41] dark:text-[#EFEBE9]">
                Inicia sesión con Google para ver y gestionar tus documentos
              </p>
            </div>
          ) : loadingDocs ? (
            <div className="text-center py-10 space-y-2">
              <RefreshCw className="w-8 h-8 text-[#4285F4] animate-spin mx-auto" />
              <p className="text-xs text-gray-500">Cargando tus Google Docs desde Google Drive...</p>
            </div>
          ) : docsList.length === 0 ? (
            <div className="text-center py-10 space-y-2 border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-2xl">
              <FileText className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-xs font-bold text-gray-500">No se encontraron Google Docs recientes</p>
              <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                Haz clic en "Crear Google Doc del Menú" para generar tu primer documento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {docsList.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl border border-[#F8BBD0]/30 bg-[#FFF8E7]/30 dark:bg-[#1a1412]/40 hover:border-[#4285F4] transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-[#6D4C41] dark:text-[#EFEBE9] truncate">
                          {doc.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 block">
                          Modificado: {doc.modifiedTime ? new Date(doc.modifiedTime).toLocaleDateString('es-MX') : 'Reciente'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-neutral-800">
                    <button
                      onClick={() => handleViewDoc(doc)}
                      className="px-2.5 py-1 rounded-lg bg-[#4285F4]/10 text-[#4285F4] hover:bg-[#4285F4]/20 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Vista Previa</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {doc.webViewLink && (
                        <a
                          href={doc.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-600 dark:text-gray-300 transition-colors"
                          title="Abrir en Google Docs web"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => setFileToDelete(doc)}
                        className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-500 transition-colors cursor-pointer"
                        title="Eliminar de Google Drive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Document Content Viewer Modal */}
        {selectedDocContent && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-2xl bg-white dark:bg-[#2d2420] rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col text-left border border-[#F8BBD0]">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9] truncate max-w-md">
                    {selectedDocContent.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDocContent(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-[#FFF8E7]/50 dark:bg-[#1a1412] p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 font-mono text-xs whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                {loadingContent ? 'Cargando contenido...' : selectedDocContent.bodyText || 'Documento vacío'}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedDocContent(null)}
                  className="px-5 py-2 rounded-full bg-[#6D4C41] text-white text-xs font-bold hover:bg-[#5D3C31]"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MANDATORY USER CONFIRMATION DIALOG FOR DESTRUCTIVE ACTION */}
        {fileToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-[#2d2420] rounded-3xl p-6 shadow-2xl space-y-4 text-left border-2 border-rose-500 animate-scaleUp">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#6D4C41] dark:text-[#EFEBE9]">
                    Confirmar eliminación
                  </h3>
                  <span className="text-xs text-rose-500 font-semibold block">Acción destructiva irreversible</span>
                </div>
              </div>

              <p className="text-xs text-[#6D4C41]/80 dark:text-[#D7CCC8]/80 leading-relaxed">
                ¿Estás seguro de que deseas eliminar permanentemente el documento{' '}
                <strong className="text-rose-600 dark:text-rose-400 font-bold">"{fileToDelete.name}"</strong> de tu cuenta de Google Drive?
              </p>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900 text-[11px] text-rose-700 dark:text-rose-300">
                Esta acción borrará el archivo de Google Cloud y no podrá deshacerse desde esta aplicación.
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setFileToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-full border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 font-bold text-xs hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  onClick={confirmDeleteDoc}
                  disabled={isDeleting}
                  className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeleting ? 'Eliminando...' : 'Eliminar Documento'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
