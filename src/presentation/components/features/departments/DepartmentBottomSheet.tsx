import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDepartmentById } from '@/presentation/hooks';
import { Loading, ErrorMessage } from '@/presentation/components/common';
import { Building2, Share2, Info, X, Copy, Check, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DepartmentBottomSheetProps {
  departmentId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DepartmentBottomSheet = ({
  departmentId,
  isOpen,
  onClose,
}: DepartmentBottomSheetProps) => {
  const navigate = useNavigate();
  const { data: dept, isLoading, error } = useDepartmentById(departmentId || 0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showShareMenu) {
          setShowShareMenu(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Solo bloquear scroll en móvil
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, showShareMenu]);

  // Cerrar menú compartir cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setShowShareMenu(false);
    }
  }, [isOpen]);

  // Cerrar menú compartir al hacer click fuera (solo desktop)
  useEffect(() => {
    if (!showShareMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Solo en desktop
      if (window.innerWidth >= 768) {
        const target = e.target as HTMLElement;
        const shareMenu = document.getElementById('share-menu');
        const shareButton = document.getElementById('share-button');

        if (
          shareMenu &&
          shareButton &&
          !shareMenu.contains(target) &&
          !shareButton.contains(target)
        ) {
          setShowShareMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareMenu]);

  const handleViewDetails = () => {
    if (dept) {
      navigate(`/departments/${dept.id}`);
      onClose();
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const copyToClipboard = async () => {
    if (!dept) return;

    const shareUrl = window.location.origin + `/departments/${dept.id}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const shareNative = async () => {
    if (!dept) return;

    const shareData = {
      title: `${dept.name} - Colombia Explorer`,
      text: `Descubre ${dept.name}, capital: ${dept.cityCapital.name}`,
      url: window.location.origin + `/departments/${dept.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShowShareMenu(false);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  // Formatear números
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  // Calcular temperatura promedio basada en la región (simplificado)
  const getAverageTemp = (): string => {
    if (!dept) return '--°C';

    // Temperatura aproximada basada en la altitud de la capital
    // Esto es una simplificación, en producción usarías una API de clima real
    const regionTemps: Record<string, string> = {
      'Amazonas': '27°C',
      'Antioquia': '24°C',
      'Arauca': '27°C',
      'Atlántico': '28°C',
      'Bolívar': '28°C',
      'Boyacá': '14°C',
      'Caldas': '17°C',
      'Caquetá': '25°C',
      'Casanare': '26°C',
      'Cauca': '19°C',
      'Cesar': '28°C',
      'Chocó': '26°C',
      'Córdoba': '28°C',
      'Cundinamarca': '14°C',
      'Guainía': '27°C',
      'Guaviare': '26°C',
      'Huila': '24°C',
      'La Guajira': '29°C',
      'Magdalena': '29°C',
      'Meta': '26°C',
      'Nariño': '13°C',
      'Norte de Santander': '23°C',
      'Putumayo': '24°C',
      'Quindío': '21°C',
      'Risaralda': '21°C',
      'San Andrés y Providencia': '27°C',
      'Santander': '22°C',
      'Sucre': '28°C',
      'Tolima': '24°C',
      'Valle del Cauca': '24°C',
      'Vaupés': '26°C',
      'Vichada': '27°C',
    };

    return regionTemps[dept.name] || '24°C';
  };

  if (!departmentId) return null;

  return (
    <>
      {/* Modal - Bottom sheet flotante en móvil, panel lateral en desktop */}
      <div
        className={`
          bg-white dark:bg-dark-700 transition-all duration-300 ease-out overflow-hidden

          ${isOpen
            ? 'fixed bottom-4 left-4 right-4 translate-y-0 z-50 shadow-2xl rounded-3xl'
            : 'fixed bottom-4 left-4 right-4 translate-y-[120%] z-50 shadow-2xl rounded-3xl'
          }

          md:relative md:h-full md:z-auto md:bottom-auto md:left-auto md:right-auto md:translate-y-0 md:rounded-none md:shadow-none
          md:border-l md:border-gray-200 md:dark:border-gray-600 md:flex md:flex-col
          ${isOpen ? 'md:w-96 md:opacity-100' : 'md:w-0 md:opacity-0 md:border-0'}
        `}
      >
        {/* Header con botón cerrar */}
        <div className="relative flex justify-end items-center pt-2 pb-2 px-5 border-b border-gray-200 dark:border-gray-700">
          {/* Barrita centrada */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full md:invisible" />
          {/* Botón cerrar a la derecha */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-4 h-[230px] overflow-y-auto md:h-auto md:flex-1 md:p-6">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loading />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <ErrorMessage message="Error al cargar información del departamento" />
            </div>
          )}

          {dept && (
            <>
              {/* Header simple */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {dept.name}
                  </h2>
                  <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">
                    Capital: {dept.cityCapital.name}
                  </span>
                </div>
              </div>

              {/* Info Cards - Diseño simple */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {/* Población */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Población
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatNumber(dept.population)}
                  </p>
                </div>

                {/* Clima */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Clima
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {getAverageTemp()}
                  </p>
                </div>

                {/* Área */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                    Área
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatNumber(dept.surface)}
                  </p>
                </div>
              </div>

              {/* Action Buttons - Diseño simple */}
              <div className="flex gap-3 relative">
                <Button
                  onClick={handleViewDetails}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl text-base font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Ver detalles
                </Button>

                <div className="relative">
                  <Button
                    id="share-button"
                    onClick={handleShare}
                    variant="outline"
                    className="p-5 rounded-xl border-2 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
                    aria-label="Compartir"
                  >
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </Button>

                  {/* Overlay para menú compartir - SOLO móvil */}
                  {showShareMenu && (
                    <>
                      <div
                        className="md:hidden fixed inset-0 bg-black/40 z-[55]"
                        onClick={() => setShowShareMenu(false)}
                        aria-hidden="true"
                      />
                      <div
                        id="share-menu"
                        className="fixed md:absolute inset-x-4 bottom-20 md:inset-x-auto md:bottom-auto md:top-full md:right-0 md:mt-2 md:w-72 bg-white dark:bg-dark-700 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden z-[60]"
                      >
                      {/* Header */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-dark-800">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Compartir
                          </h3>
                          <button
                            onClick={() => setShowShareMenu(false)}
                            className="md:hidden p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Opciones */}
                      <div className="p-2">
                        {/* Copiar enlace */}
                        <button
                          onClick={copyToClipboard}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                        >
                          {copied ? (
                            <>
                              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-semibold text-green-600 dark:text-green-400">¡Copiado!</p>
                                <p className="text-xs text-green-600/70 dark:text-green-400/70">Listo para compartir</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <Copy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-semibold text-gray-900 dark:text-white">Copiar enlace</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Comparte con amigos</p>
                              </div>
                            </>
                          )}
                        </button>

                        {/* Compartir nativo */}
                        {'share' in navigator && (
                          <button
                            onClick={shareNative}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                          >
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                              <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-semibold text-gray-900 dark:text-white">Compartir</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Más opciones</p>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
