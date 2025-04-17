<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Circle } from 'svelte-loading-spinners';
  import { BarChart2, TrendingUp, TrendingDown, Globe, DollarSign } from 'lucide-svelte';
  import { Line } from 'svelte-chartjs';

  let loading = true;
  let marketData = {
    indices: [
      { name: 'S&P 500', value: '4,783.45', change: '+1.2%', trending: 'up' },
      { name: 'NASDAQ', value: '15,123.45', change: '+0.8%', trending: 'up' },
      { name: 'DOW', value: '37,654.32', change: '-0.3%', trending: 'down' }
    ],
    currencies: [
      { name: 'EUR/USD', value: '1.0945', change: '-0.15%', trending: 'down' },
      { name: 'GBP/USD', value: '1.2745', change: '+0.25%', trending: 'up' },
      { name: 'USD/JPY', value: '142.35', change: '+0.45%', trending: 'up' }
    ]
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'S&P 500',
        data: [4500, 4550, 4600, 4650, 4700, 4783],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }
    ]
  };

  onMount(() => {
    setTimeout(() => {
      loading = false;
    }, 1000);
  });
</script>

<svelte:head>
  <title>Markets | DiplomMap</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <div class="flex items-center gap-3 mb-8">
    <BarChart2 class="w-8 h-8 text-blue-600" />
    <h1 class="text-2xl font-bold">Markets</h1>
  </div>

  {#if loading}
    <div class="flex justify-center items-center h-64" in:fade>
      <Circle size="60" color="#3B82F6" unit="px" duration="1s" />
    </div>
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" in:fade>
      <!-- Market Indices -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Market Indices</h2>
        <div class="space-y-4">
          {#each marketData.indices as index}
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 class="font-medium">{index.name}</h3>
                <p class="text-2xl font-bold">{index.value}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="{index.trending === 'up' ? 'text-green-500' : 'text-red-500'}">
                  {index.change}
                </span>
                {#if index.trending === 'up'}
                  <TrendingUp class="w-5 h-5 text-green-500" />
                {:else}
                  <TrendingDown class="w-5 h-5 text-red-500" />
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">S&P 500 Performance</h2>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      <!-- Forex -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="flex items-center gap-2 mb-4">
          <DollarSign class="w-6 h-6 text-blue-600" />
          <h2 class="text-xl font-semibold">Forex</h2>
        </div>
        <div class="space-y-4">
          {#each marketData.currencies as currency}
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 class="font-medium">{currency.name}</h3>
                <p class="text-2xl font-bold">{currency.value}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="{currency.trending === 'up' ? 'text-green-500' : 'text-red-500'}">
                  {currency.change}
                </span>
                {#if currency.trending === 'up'}
                  <TrendingUp class="w-5 h-5 text-green-500" />
                {:else}
                  <TrendingDown class="w-5 h-5 text-red-500" />
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Global Markets -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="flex items-center gap-2 mb-4">
          <Globe class="w-6 h-6 text-blue-600" />
          <h2 class="text-xl font-semibold">Global Markets</h2>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 class="font-medium">FTSE 100</h3>
            <p class="text-2xl font-bold">7,654.32</p>
            <span class="text-green-500 flex items-center gap-1">
              +0.8% <TrendingUp class="w-4 h-4" />
            </span>
          </div>
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 class="font-medium">Nikkei 225</h3>
            <p class="text-2xl font-bold">33,432.21</p>
            <span class="text-red-500 flex items-center gap-1">
              -0.3% <TrendingDown class="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>