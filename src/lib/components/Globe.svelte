```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import GlobeGL from 'globe.gl';
  import { theme } from '$lib/stores/theme';
  import type { Conflict, TensionZone, PopulationDisplacement } from '$lib/types';

  export let conflicts: Conflict[] = [];
  export let tensionZones: TensionZone[] = [];
  export let displacements: PopulationDisplacement[] = [];

  let container: HTMLDivElement;
  let globe: any;

  const GLOBE_BG_COLOR = '#000011';
  const GLOBE_HIGHLIGHT_COLOR = '#ffffff';

  onMount(() => {
    globe = GlobeGL()(container)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundColor(GLOBE_BG_COLOR)
      .atmosphereColor(GLOBE_HIGHLIGHT_COLOR)
      .atmosphereAltitude(0.25)
      .pointsData(conflicts.map(conflict => ({
        lat: conflict.location.lat,
        lng: conflict.location.lng,
        size: conflict.intensity === 'major' ? 0.5 : 0.2,
        color: conflict.status === 'active' ? '#ff0000' : '#ffa500'
      })))
      .pointAltitude(0.1)
      .pointColor('color')
      .pointRadius('size')
      .arcsData(displacements.map(d => ({
        startLat: d.from.lat,
        startLng: d.from.lng,
        endLat: d.to.lat,
        endLng: d.to.lng,
        color: d.status === 'ongoing' ? '#ff0000' : '#ffffff'
      })))
      .arcColor('color')
      .arcDashLength(0.5)
      .arcDashGap(0.1)
      .arcDashAnimateTime(2000)
      .ringsData(tensionZones.map(zone => ({
        lat: zone.location.lat,
        lng: zone.location.lng,
        radius: zone.radius,
        color: `rgba(255, 0, 0, ${zone.intensity / 100})`
      })))
      .ringColor('color')
      .ringMaxRadius('radius')
      .ringPropagationSpeed(1)
      .ringRepeatPeriod(1000);

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    // Handle window resize
    const handleResize = () => {
      globe.width(container.clientWidth);
      globe.height(container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  $: if (globe && $theme) {
    globe.backgroundColor($theme === 'dark' ? GLOBE_BG_COLOR : '#ffffff');
  }

  onDestroy(() => {
    if (globe) {
      globe.dispose();
    }
  });
</script>

<div
  bind:this={container}
  class="w-full h-full"
  style="min-height: 500px;"
></div>

<style>
  div {
    position: relative;
  }
</style>
```