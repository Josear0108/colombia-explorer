import { useRegions } from '@/presentation/hooks';
import { Loading, ErrorMessage } from '@/presentation/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegionsPage = () => {
  const { data: regions, isLoading, error } = useRegions();

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Error al cargar las regiones" />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Regiones de Colombia
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions?.map((region) => (
          <Card key={region.id}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-colombia-blue">
                {region.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{region.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegionsPage;
