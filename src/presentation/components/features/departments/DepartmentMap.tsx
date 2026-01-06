// src/presentation/components/features/departments/DepartmentMap.tsx
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import { GeoJsonObject } from 'geojson';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useRef } from 'react';

// Fix para los iconos de Leaflet en Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface DepartmentMapProps {
  onDepartmentClick?: (departmentId: number, departmentName: string) => void;
  userLocation?: {
    latitude: number | null;
    longitude: number | null;
  };
}

export const DepartmentMap = ({ onDepartmentClick, userLocation }: DepartmentMapProps) => {
  const [colombiaGeoJSON, setColombiaGeoJSON] = useState<GeoJsonObject | null>(null);
  const selectedLayerRef = useRef<any>(null);

  useEffect(() => {
    // Cargar GeoJSON de Colombia
    fetch('https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json')
      .then(res => res.json())
      .then(data => setColombiaGeoJSON(data));
  }, []);

  const onEachDepartment = (feature: any, layer: any) => {
    const departmentName = feature.properties.NOMBRE_DPT;

    // Estilo del departamento
    layer.setStyle({
      fillColor: '#003893', // colombia-blue
      weight: 2,
      opacity: 1,
      color: '#FCD116', // colombia-yellow
      fillOpacity: 0.5
    });

    // Hover effect
    layer.on({
      mouseover: (e: any) => {
        // No aplicar hover si es el departamento seleccionado
        if (selectedLayerRef.current !== e.target) {
          e.target.setStyle({
            fillOpacity: 0.8,
            weight: 3
          });
        }
      },
      mouseout: (e: any) => {
        // No resetear hover si es el departamento seleccionado
        if (selectedLayerRef.current !== e.target) {
          e.target.setStyle({
            fillOpacity: 0.5,
            weight: 2
          });
        }
      },
      click: (e: any) => {
        // Resetear el estilo del departamento previamente seleccionado
        if (selectedLayerRef.current && selectedLayerRef.current !== e.target) {
          selectedLayerRef.current.setStyle({
            fillOpacity: 0.5,
            weight: 2
          });
        }

        // Aplicar estilo destacado al nuevo departamento seleccionado
        e.target.setStyle({
          fillOpacity: 0.8,
          weight: 3
        });

        // Guardar referencia al nuevo layer seleccionado
        selectedLayerRef.current = e.target;

        if (onDepartmentClick) {
          onDepartmentClick(feature.properties.DPTO, departmentName);
        }
      }
    });

    // Tooltip solo en hover (desktop) - NO en click
    if (window.innerWidth >= 768) {
      layer.bindTooltip(departmentName, {
        permanent: false,
        direction: 'center',
        className: 'department-tooltip',
        sticky: true
      });
    }
  };

  return (
    <div className="w-full h-screen md:h-full rounded-lg md:rounded-none overflow-hidden shadow-lg md:shadow-none">
      <MapContainer
        center={[4.5709, -74.2973]} // Centro de Colombia
        zoom={window.innerWidth < 768 ? 6 : 5} // Zoom menor en móviles
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        touchZoom={true}
        dragging={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {colombiaGeoJSON && (
          <GeoJSON
            data={colombiaGeoJSON}
            onEachFeature={onEachDepartment}
          />
        )}

        {/* Marcador de ubicación del usuario */}
        {userLocation?.latitude && userLocation?.longitude && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">Tu ubicación</h3>
                <p className="text-sm">Lat: {userLocation.latitude.toFixed(4)}</p>
                <p className="text-sm">Lng: {userLocation.longitude.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};