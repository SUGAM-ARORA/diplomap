```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.heat';
  import type { TensionZone } from '$lib/types';

  export let tensionZones: TensionZone[] = [];

  let map: L.Map;
  let heatLayer: any;
  let container: HTMLDivElement;

  onMount(() => {
    map = L.map(container).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const points = tensionZones.map(zone => [
      zone.location.lat,
      zone.location.lng,
      zone.intensity
    ]);

    heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      gradient: {
        0.4: 'blue',
        0.6: 'yellow',
        0.8: 'orange',
        1.0: 'red'
      }
    }).addTo(map);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
    };
  });

  $: if (heatLayer && tensionZones) {
    const points = tensionZones.map(zone => [
      zone.location.lat,
      zone.location.lng,
      zone.intensity
    ]);
    heatLayer.setLatLngs(points);
  }
</script>

<div
  bind:this={container}
  class="w-full h-full rounded-lg overflow-hidden shadow-lg"
  style="min-height: 400px;"
></div>
```