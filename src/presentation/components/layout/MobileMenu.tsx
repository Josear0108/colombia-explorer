import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/presentation/components/common';
import { useState, useEffect } from 'react';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar menú al presionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Menú"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menú lateral */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-dark-800 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del menú */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menú</h2>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col p-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
          >
            <span className="text-xl">🏠</span>
            Inicio
          </Link>
          <Link
            to="/departments"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
          >
            <span className="text-xl">🏛️</span>
            Departamentos
          </Link>
          <Link
            to="/regions"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
          >
            <span className="text-xl">🗺️</span>
            Regiones
          </Link>
          <Link
            to="/tourism"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
          >
            <span className="text-xl">🏞️</span>
            Turismo
          </Link>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />

          {/* Tema */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Tema</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
};
