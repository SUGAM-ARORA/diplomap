import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useConflictStore } from '../store/useConflictStore';
import 'leaflet/dist/leaflet.css';

const intensityColors = {
  major: '#FF0000',
  war: '#FF4500',
  minor: '#FFA500',
  skirmish: '#FFD700'
};

const getMarkerIcon = (intensity: string, status: string) => {
  return L.divIcon({
    className: 'w-6 h-6 rounded-full border-2 border-white',
    html: `<div class="w-full h-full rounded-full ${
      status === 'active' ? 'animate-pulse' : ''
    }" style="background-color: ${intensityColors[intensity]}"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const { conflicts, setSelectedConflict } = useConflictStore();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    conflicts.forEach((conflict) => {
      const marker = L.marker([conflict.location.lat, conflict.location.lng], {
        icon: getMarkerIcon(conflict.intensity, conflict.status)
      })
        .bindPopup(`
          <div class="p-4">
            <h3 class="font-bold text-lg">${conflict.name}</h3>
            <p class="text-sm mt-2">${conflict.description}</p>
            <div class="mt-2">
              <span class="inline-block px-2 py-1 text-xs rounded-full ${
                conflict.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }">${conflict.status}</span>
            </div>
          </div>
        `)
        .addTo(map.current);

      marker.on('click', () => {
        setSelectedConflict(conflict);
      });

      markers.current.push(marker);
    });
  }, [conflicts, setSelectedConflict]);

  return <div ref={mapContainer} className="w-full h-full" />;
}