<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Circle } from 'svelte-loading-spinners';
  import NewsCard from '$lib/components/NewsCard.svelte';
  import BreakingNews from '$lib/components/BreakingNews.svelte';
  import { fetchNews } from '$lib/services/news';
  import type { NewsItem } from '$lib/types';

  let news: NewsItem[] = [];
  let loading = true;
  let error: string | null = null;
  let activeCategory = 'all';

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'world', name: 'World' },
    { id: 'india', name: 'India' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' },
    { id: 'sports', name: 'Sports' }
  ];

  async function loadNews(category: string = 'all') {
    try {
      loading = true;
      news = await fetchNews(category);
    } catch (e) {
      error = 'Failed to load news';
      console.error(e);
    } finally {
      loading = false;
    }
  }

  function handleCategoryChange(category: string) {
    activeCategory = category;
    loadNews(category);
  }

  onMount(() => {
    loadNews();
    // Refresh news every 30 minutes
    const interval = setInterval(() => loadNews(activeCategory), 30 * 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>DiplomMap - Your Global News Hub</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <BreakingNews />

  <!-- Category Tabs -->
  <div class="flex overflow-x-auto gap-4 mb-6 pb-2">
    {#each categories as category}
      <button
        class="px-4 py-2 rounded-full whitespace-nowrap transition-colors
               {activeCategory === category.id
                 ? 'bg-blue-600 text-white'
                 : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}"
        on:click={() => handleCategoryChange(category.id)}
      >
        {category.name}
      </button>
    {/each}
  </div>

  <!-- News Grid -->
  {#if loading}
    <div class="flex justify-center items-center h-64" in:fade>
      <Circle size="60" color="#3B82F6" unit="px" duration="1s" />
    </div>
  {:else if error}
    <div class="text-center text-red-600 dark:text-red-400 py-8" in:fade>
      {error}
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" in:fade>
      {#each news as item (item.id)}
        <NewsCard {item} />
      {/each}
    </div>
  {/if}
</div>