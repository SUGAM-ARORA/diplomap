```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import type { PopulationDisplacement } from '$lib/types';

  export let displacements: PopulationDisplacement[] = [];

  let map: L.Map;
  let container: HTMLDivElement;

  onMount(() => {
    map = L.map(container).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add displacement flows
    displacements.forEach(displacement => {
      // Create marker for origin
      L.circleMarker([displacement.from.lat, displacement.from.lng], {
        radius: 8,
        fillColor: '#ff0000',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      })
      .bindPopup(`
        <strong>Origin:</strong> ${displacement.from.country}<br>
        <strong>Displaced:</strong> ${displacement.count.toLocaleString()}<br>
        <strong>Status:</strong> ${displacement.status}
      `)
      .addTo(map);

      // Create marker for destination
      L.circleMarker([displacement.to.lat, displacement.to.lng], {
        radius: 8,
        fillColor: '#00ff00',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      })
      .bindPopup(`
        <strong>Destination:</strong> ${displacement.to.country}<br>
        <strong>Expected arrivals:</strong> ${displacement.count.toLocaleString()}<br>
        <strong>Status:</strong> ${displacement.status}
      `)
      .addTo(map);

      // Draw flow line
      const latlngs = [
        [displacement.from.lat, displacement.from.lng],
        [displacement.to.lat, displacement.to.lng]
      ];
      
      L.polyline(latlngs, {
        color: displacement.status === 'ongoing' ? '#ff0000' : '#0000ff',
        weight: Math.log(displacement.count) / 10,
        opacity: 0.6,
        dashArray: '5, 10'
      })
      .bindPopup(`
        <strong>Displacement Flow</strong><br>
        Count: ${displacement.count.toLocaleString()}<br>
        Status: ${displacement.status}<br>
        Reason: ${displacement.reason}
      `)
      .addTo(map);
    });
  });
</script>

<div
  bind:this={container}
  class="w-full h-full rounded-lg overflow-hidden shadow-lg"
  style="min-height: 400px;"
></div>

<style>
  :global(.leaflet-popup-content) {
    font-size: 14px;
    line-height: 1.5;
  }
</style>
```