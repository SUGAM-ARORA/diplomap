<script lang="ts">
  import { formatDistanceToNow } from 'date-fns';
  import { Bookmark, Share2, ThumbsUp } from 'lucide-svelte';
  import type { NewsItem } from '$lib/types';

  export let item: NewsItem;

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: item.url
      });
    }
  }

  function handleBookmark() {
    // Implement bookmark functionality
  }

  function handleLike() {
    // Implement like functionality
  }
</script>

<article
  class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
>
  {#if item.image}
    <img
      src={item.image}
      alt={item.title}
      class="w-full h-48 object-cover"
      loading="lazy"
    />
  {/if}
  
  <div class="p-4">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-xl font-semibold mb-2 line-clamp-2">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>
      </div>
      {#if item.sentiment}
        <span
          class="px-2 py-1 text-xs rounded-full
                 {item.sentiment === 'positive'
                   ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                   : item.sentiment === 'negative'
                   ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                   : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}"
        >
          {item.sentiment}
        </span>
      {/if}
    </div>

    <div class="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <img
          src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}`}
          alt={item.source}
          class="w-4 h-4"
        />
        <span>{item.source}</span>
        <span>•</span>
        <time datetime={item.publishedAt}>
          {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
        </time>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          on:click={handleLike}
          title="Like"
        >
          <ThumbsUp class="w-5 h-5" />
        </button>
        <button
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          on:click={handleBookmark}
          title="Bookmark"
        >
          <Bookmark class="w-5 h-5" />
        </button>
        <button
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          on:click={handleShare}
          title="Share"
        >
          <Share2 class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</article>