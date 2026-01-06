import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/presentation/components/common';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary-500 dark:bg-primary-500 shadow-lg border-b-4 border-secondary-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 transition-opacity">
            <span className="text-3xl">🇨🇴</span>
            <h1 className="flex text-white text-2xl font-bold">Colombia Explorer</h1>
          </Link>

          {/* Desktop: Menú + Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex gap-6">
              <Link
                to="/"
                className="text-white hover:text-colombia-yellow font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/departments"
                className="text-white hover:text-colombia-yellow font-medium transition-colors"
              >
                Departamentos
              </Link>
              <Link
                to="/regions"
                className="text-white hover:text-colombia-yellow font-medium transition-colors"
              >
                Regiones
              </Link>
              <Link
                to="/tourism"
                className="text-white hover:text-colombia-yellow font-medium transition-colors"
              >
                Turismo
              </Link>
            </nav>

            <ThemeToggle />
          </div>

          {/* Mobile: Solo menú hamburguesa */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
