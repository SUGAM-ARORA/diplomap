```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import Globe from '$lib/components/Globe.svelte';
  import HeatMap from '$lib/components/HeatMap.svelte';
  import AllianceGraph from '$lib/components/AllianceGraph.svelte';
  import EconomicDashboard from '$lib/components/EconomicDashboard.svelte';
  import DisplacementMap from '$lib/components/DisplacementMap.svelte';
  import type { Conflict, TensionZone, PopulationDisplacement, Alliance } from '$lib/types';

  let activeView = 'globe';
  let conflicts: Conflict[] = [];
  let tensionZones: TensionZone[] = [];
  let displacements: PopulationDisplacement[] = [];
  let alliances: Alliance[] = [];

  onMount(async () => {
    // Fetch data from your API
    // For now using mock data
    conflicts = [/* Add mock conflict data */];
    tensionZones = [/* Add mock tension zone data */];
    displacements = [/* Add mock displacement data */];
    alliances = [/* Add mock alliance data */];
  });
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <div class="container mx-auto px-4 py-8">
    <!-- View Selector -->
    <div class="flex gap-4 mb-8 overflow-x-auto pb-2">
      <button
        class="px-4 py-2 rounded-full whitespace-nowrap transition-colors
               {activeView === 'globe'
                 ? 'bg-blue-600 text-white'
                 : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
        on:click={() => activeView = 'globe'}
      >
        3D Globe View
      </button>
      <button
        class="px-4 py-2 rounded-full whitespace-nowrap transition-colors
               {activeView === 'heatmap'
                 ? 'bg-blue-600 text-white'
                 : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
        on:click={() => activeView = 'heatmap'}
      >
        Tension Heat Map
      </button>
      <button
        class="px-4 py-2 rounded-full whitespace-nowrap transition-colors
               {activeView === 'alliances'
                 ? 'bg-blue-600 text-white'
                 : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
        on:click={() => activeView = 'alliances'}
      >
        Alliance Network
      </button>
      <button
        class="px-4 py-2 rounded-full whitespace-nowrap transition-colors
               {activeView === 'economic'
                 ? 'bg-blue-600 text-white'
                 : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
        on:click={() => activeView = 'economic'}
      >
        Economic Impact
      </button>
      <button
        class="px-4 py-2 rounded-full whitespace-nowrap transition-colors
               {activeView === 'displacement'
                 ? 'bg-blue-600 text-white'
                 : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
        on:click={() => activeView = 'displacement'}
      >
        Population Displacement
      </button>
    </div>

    <!-- Main Content -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden" style="height: 80vh;">
      {#if activeView === 'globe'}
        <div class="h-full" in:fade>
          <Globe {conflicts} {tensionZones} {displacements} />
        </div>
      {:else if activeView === 'heatmap'}
        <div class="h-full" in:fade>
          <HeatMap {tensionZones} />
        </div>
      {:else if activeView === 'alliances'}
        <div class="h-full" in:fade>
          <AllianceGraph {alliances} />
        </div>
      {:else if activeView === 'economic'}
        <div class="h-full overflow-y-auto" in:fade>
          <EconomicDashboard economicData={conflicts[0]?.economicImpact} />
        </div>
      {:else if activeView === 'displacement'}
        <div class="h-full" in:fade>
          <DisplacementMap {displacements} />
        </div>
      {/if}
    </div>
  </div>
</div>
```