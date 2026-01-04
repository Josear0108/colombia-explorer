import { useTouristicAttractions } from '@/presentation/hooks';
import { Loading, ErrorMessage } from '@/presentation/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TourismPage = () => {
  const { data: attractions, isLoading, error } = useTouristicAttractions();

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Error al cargar las atracciones turísticas" />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Atracciones Turísticas de Colombia
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions?.map((attraction) => (
          <Card key={attraction.id}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-colombia-blue">
                {attraction.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3 line-clamp-3">{attraction.description}</p>
              <div className="space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-semibold">Ciudad:</span> {attraction.city.name}
                </p>
                {attraction.city.department && (
                  <p>
                    <span className="font-semibold">Departamento:</span>{' '}
                    {attraction.city.department.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TourismPage;
