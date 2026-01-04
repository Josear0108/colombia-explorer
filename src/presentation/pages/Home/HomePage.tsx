import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTouristicAttractions } from '@/presentation/hooks';
import { useMemo } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const { data: attractions } = useTouristicAttractions();

  // Seleccionar una imagen aleatoria de las atracciones
  const randomBackgroundImage = useMemo(() => {
    if (!attractions || attractions.length === 0) return null;

    // Filtrar atracciones que tienen imágenes
    const attractionsWithImages = attractions.filter(
      (attraction) => attraction.images && attraction.images.length > 0
    );

    if (attractionsWithImages.length === 0) return null;

    // Seleccionar una atracción aleatoria
    const randomAttraction =
      attractionsWithImages[Math.floor(Math.random() * attractionsWithImages.length)];

    // Verificar que existe y tiene imágenes
    if (!randomAttraction || !randomAttraction.images || randomAttraction.images.length === 0) {
      return null;
    }

    // Retornar la primera imagen de esa atracción
    return randomAttraction.images[0];
  }, [attractions]);

  return (
    <>
      <div
        className="relative mb-12 -mt-8 -mx-4 py-24 px-4 rounded-xl"
        style={{
          backgroundImage: randomBackgroundImage
            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(28, 28, 30, 0.9)), url(${randomBackgroundImage})`
            : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(28, 28, 30, 0.9))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Explora Colombia
          </h1>
          <p className="text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Accede a datos abiertos sobre geografía, cultura, departamentos y turismo en un solo lugar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-dark-700 border border-dark-600 p-8 rounded-lg shadow-lg hover:shadow-xl hover:border-secondary-500 transition-all">
          <div className="text-5xl mb-4">🏛️</div>
          <h3 className="text-2xl font-bold text-secondary-500 mb-2">
            32 Departamentos
          </h3>
          <p className="text-dark-200 mb-4">
            Explora cada uno de los departamentos de Colombia con información detallada
          </p>
          <Button variant="default" onClick={() => navigate('/departments')}>
            Ver Departamentos
          </Button>
        </div>

        <div className="bg-dark-700 border border-dark-600 p-8 rounded-lg shadow-lg hover:shadow-xl hover:border-secondary-500 transition-all">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold text-secondary-500 mb-2">
            Regiones
          </h3>
          <p className="text-dark-200 mb-4">
            Conoce las diferentes regiones naturales de Colombia
          </p>
          <Button variant="default" onClick={() => navigate('/regions')}>
            Ver Regiones
          </Button>
        </div>

        <div className="bg-dark-700 border border-dark-600 p-8 rounded-lg shadow-lg hover:shadow-xl hover:border-secondary-500 transition-all">
          <div className="text-5xl mb-4">🏞️</div>
          <h3 className="text-2xl font-bold text-secondary-500 mb-2">
            Turismo
          </h3>
          <p className="text-dark-200 mb-4">
            Descubre las maravillas turísticas que Colombia tiene para ofrecer
          </p>
          <Button variant="default" onClick={() => navigate('/tourism')}>
            Ver Atracciones
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
