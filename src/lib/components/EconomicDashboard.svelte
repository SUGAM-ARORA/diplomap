```svelte
<script lang="ts">
  import { Line, Bar, Pie } from 'svelte-chartjs';
  import type { EconomicImpact } from '$lib/types';

  export let economicData: EconomicImpact;

  $: gdpData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'GDP Loss',
      data: [economicData.gdpLoss / 4, economicData.gdpLoss / 3, 
             economicData.gdpLoss / 2, economicData.gdpLoss],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  $: tradeData = {
    labels: ['Imports', 'Exports'],
    datasets: [{
      data: [economicData.tradeDisruption.imports, 
             economicData.tradeDisruption.exports],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

  $: sanctionsData = {
    labels: economicData.sanctions.map(s => s.imposedBy.join(', ')),
    datasets: [{
      label: 'Sanctions Impact',
      data: economicData.sanctions.map(s => s.estimatedImpact),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }]
  };
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
    <h3 class="text-lg font-semibold mb-4">GDP Impact</h3>
    <Line data={gdpData} />
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
    <h3 class="text-lg font-semibold mb-4">Trade Disruption</h3>
    <Pie data={tradeData} />
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
    <h3 class="text-lg font-semibold mb-4">Sanctions Impact</h3>
    <Bar data={sanctionsData} />
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
    <h3 class="text-lg font-semibold mb-4">Resource Scarcity</h3>
    <div class="space-y-4">
      {#each economicData.resourceScarcity as scarcity}
        <div class="flex items-center justify-between">
          <span>{scarcity.resource}</span>
          <div class="flex items-center gap-2">
            <div class="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full"
                class:bg-red-500={scarcity.severity === 'high'}
                class:bg-yellow-500={scarcity.severity === 'medium'}
                class:bg-green-500={scarcity.severity === 'low'}
                style="width: {scarcity.severity === 'high' ? '100%' : 
                               scarcity.severity === 'medium' ? '66%' : '33%'}"
              ></div>
            </div>
            <span class="text-sm">{scarcity.severity}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
```