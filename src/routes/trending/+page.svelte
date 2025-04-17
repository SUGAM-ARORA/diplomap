<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Circle } from 'svelte-loading-spinners';
  import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-svelte';
  import NewsCard from '$lib/components/NewsCard.svelte';
  import { fetchNews } from '$lib/services/news';
  import type { NewsItem } from '$lib/types';

  let trendingNews: NewsItem[] = [];
  let loading = true;
  let error: string | null = null;
  let selectedTimeframe = '24h';

  const timeframes = [
    { id: '1h', label: 'Last Hour' },
    { id: '24h', label: 'Last 24 Hours' },
    { id: '7d', label: 'This Week' },
    { id: '30d', label: 'This Month' }
  ];

  async function loadTrendingNews() {
    try {
      loading = true;
      trendingNews = await fetchNews('trending');
    } catch (e) {
      error = 'Failed to load trending news';
      console.error(e);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadTrendingNews();
  });
</script>

<svelte:head>
  <title>Trending Stories | DiplomMap</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <div class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-3">
      <TrendingUp class="w-8 h-8 text-blue-600" />
      <h1 class="text-2xl font-bold">Trending Stories</h1>
    </div>

    <div class="flex gap-2">
      {#each timeframes as frame}
        <button
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors
                 {selectedTimeframe === frame.id
                   ? 'bg-blue-600 text-white'
                   : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
          on:click={() => selectedTimeframe = frame.id}
        >
          {frame.label}
        </button>
      {/each}
    </div>
  </div>

  {#if loading}
    <div class="flex justify-center items-center h-64" in:fade>
      <Circle size="60" color="#3B82F6" unit="px" duration="1s" />
    </div>
  {:else if error}
    <div class="text-center text-red-600 dark:text-red-400 py-8" in:fade>
      {error}
    </div>
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" in:fade>
      {#each trendingNews as news (news.id)}
        <div class="relative">
          <div class="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-white dark:bg-gray-800 shadow-lg">
            <span class="text-sm font-medium">Trending</span>
            <ArrowUp class="w-4 h-4 text-green-500" />
          </div>
          <NewsCard item={news} />
        </div>
      {/each}
    </div>
  {/if}
</div>