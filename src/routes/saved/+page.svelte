<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Circle } from 'svelte-loading-spinners';
  import { Bookmark, Trash2 } from 'lucide-svelte';
  import NewsCard from '$lib/components/NewsCard.svelte';
  import type { NewsItem } from '$lib/types';

  let savedItems: NewsItem[] = [];
  let loading = true;
  let error: string | null = null;

  // Mock saved items - replace with actual storage implementation
  onMount(() => {
    setTimeout(() => {
      savedItems = [
        {
          id: '1',
          title: 'Global Economic Summit Begins',
          description: 'World leaders gather to discuss economic challenges',
          source: 'World News',
          url: '#',
          publishedAt: new Date().toISOString(),
          category: 'world',
          image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1000'
        }
      ];
      loading = false;
    }, 1000);
  });

  function removeItem(id: string) {
    savedItems = savedItems.filter(item => item.id !== id);
    // Implement actual storage removal
  }
</script>

<svelte:head>
  <title>Saved Items | DiplomMap</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <div class="flex items-center gap-3 mb-8">
    <Bookmark class="w-8 h-8 text-blue-600" />
    <h1 class="text-2xl font-bold">Saved Items</h1>
  </div>

  {#if loading}
    <div class="flex justify-center items-center h-64" in:fade>
      <Circle size="60" color="#3B82F6" unit="px" duration="1s" />
    </div>
  {:else if error}
    <div class="text-center text-red-600 dark:text-red-400 py-8" in:fade>
      {error}
    </div>
  {:else if savedItems.length === 0}
    <div class="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg" in:fade>
      <Bookmark class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 class="text-xl font-semibold mb-2">No saved items yet</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Start saving interesting articles to read them later
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" in:fade>
      {#each savedItems as item (item.id)}
        <div class="relative group">
          <button
            class="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg
                   opacity-0 group-hover:opacity-100 transition-opacity"
            on:click={() => removeItem(item.id)}
          >
            <Trash2 class="w-5 h-5 text-red-500" />
          </button>
          <NewsCard {item} />
        </div>
      {/each}
    </div>
  {/if}
</div>