import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="shadow-lg border-b-4 border-secondary-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 transition-opacity">
            <span className="text-3xl text-white">🇨🇴</span>
            <h1 className="flex text-white text-2xl font-bold">
              <span className='text-colombia-yellow-dark'>Colom</span>
              <span className='text-colombia-blue-light'>bia Expl</span>
              <span className='text-colombia-red-light'>orer</span>
            </h1>
          </Link>

          <nav className="hidden md:flex gap-6">
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
        </div>
      </div>
    </header>
  );
};
