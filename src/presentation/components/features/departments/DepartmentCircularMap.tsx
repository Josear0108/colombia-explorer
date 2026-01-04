import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { GeoJsonObject, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import L from 'leaflet';

interface DepartmentCircularMapProps {
  departmentName: string;
}

export const DepartmentCircularMap = ({ departmentName }: DepartmentCircularMapProps) => {
  const [colombiaGeoJSON, setColombiaGeoJSON] = useState<GeoJsonObject | null>(null);
  const [departmentFeature, setDepartmentFeature] = useState<Feature | null>(null);

  useEffect(() => {
    // Cargar GeoJSON de Colombia
    fetch(
      'https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json'
    )
      .then((res) => res.json())
      .then((data) => {
        setColombiaGeoJSON(data);

        // Normalizar nombre para comparación
        const normalize = (text: string) => {
          return text
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        };

        // Buscar el feature del departamento
        const feature = data.features.find(
          (f: any) => normalize(f.properties.NOMBRE_DPT) === normalize(departmentName)
        );

        setDepartmentFeature(feature);
      });
  }, [departmentName]);

  const onEachDepartment = (feature: any, layer: any) => {
    layer.setStyle({
      fillColor: '#3B82F6', // blue-500 - más brillante y visible
      weight: 3,
      opacity: 1,
      color: '#1E40AF', // blue-800 - borde más oscuro para contraste
      fillOpacity: 0.6,
    });
  };

  if (!colombiaGeoJSON || !departmentFeature) {
    return (
      <div className="w-48 h-48 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-lg">
        <div className="text-sm text-gray-500 dark:text-gray-400">Cargando mapa...</div>
      </div>
    );
  }

  // Calcular el centro del departamento
  const bounds = L.geoJSON(departmentFeature as any).getBounds();
  const center = bounds.getCenter();

  return (
    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl ring-8 ring-white dark:ring-gray-800">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={7}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        style={{ height: '100%', width: '100%' }}
        className="rounded-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={departmentFeature as GeoJsonObject}
          onEachFeature={onEachDepartment}
        />
      </MapContainer>
    </div>
  );
};
