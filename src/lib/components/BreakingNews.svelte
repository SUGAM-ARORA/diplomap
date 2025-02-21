<script lang="ts">
  import { onMount } from 'svelte';
  import { Zap } from 'lucide-svelte';
  import { fetchBreakingNews } from '$lib/services/news';

  let breakingNews: string[] = [];

  onMount(async () => {
    breakingNews = await fetchBreakingNews();
    // Update breaking news every 5 minutes
    const interval = setInterval(async () => {
      breakingNews = await fetchBreakingNews();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  });
</script>

{#if breakingNews.length > 0}
  <div class="bg-red-600 text-white py-2 px-4 mb-6 rounded-lg shadow-lg">
    <div class="flex items-center gap-2">
      <Zap class="w-5 h-5 animate-pulse" />
      <div class="overflow-hidden">
        <div class="animate-marquee whitespace-nowrap">
          {#each breakingNews as news}
            <span class="mx-4">{news}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
</style>