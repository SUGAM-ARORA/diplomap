<script lang="ts">
  import { Globe, Sun, Moon, Search, Bell, User, TrendingUp, Newspaper, BarChart2, Bookmark } from 'lucide-svelte';
  import { theme } from '$lib/stores/theme';

  let showConflictMap = false;

  function toggleTheme() {
    theme.update(t => t === 'light' ? 'dark' : 'light');
  }
</script>

<nav class="bg-white dark:bg-gray-800 shadow-lg">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo and Main Nav -->
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-2">
          <Newspaper class="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span class="text-xl font-bold">DiplomMap</span>
        </div>
        
        <div class="hidden md:flex items-center gap-6">
          <a href="/" class="nav-link">
            <TrendingUp class="w-4 h-4" />
            <span>Top Stories</span>
          </a>
          <a href="/markets" class="nav-link">
            <BarChart2 class="w-4 h-4" />
            <span>Markets</span>
          </a>
          <a href="/saved" class="nav-link">
            <Bookmark class="w-4 h-4" />
            <span>Saved</span>
          </a>
          <a
            href="/conflicts"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            <Globe class="w-4 h-4" />
            Global Conflicts
          </a>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:flex flex-1 max-w-xl mx-8">
        <div class="relative w-full">
          <input
            type="text"
            placeholder="Search news, markets, conflicts..."
            class="w-full px-4 py-2 pl-10 pr-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <!-- Right Side Nav -->
      <div class="flex items-center gap-4">
        <button class="nav-button relative">
          <Bell class="w-5 h-5" />
          <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button
          class="nav-button"
          on:click={toggleTheme}
        >
          {#if $theme === 'light'}
            <Moon class="w-5 h-5" />
          {:else}
            <Sun class="w-5 h-5" />
          {/if}
        </button>

        <button class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
          <User class="w-5 h-5" />
          <span class="hidden md:inline">Account</span>
        </button>
      </div>
    </div>
  </div>
</nav>

<style lang="postcss">
  .nav-link {
    @apply flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400;
  }

  .nav-button {
    @apply p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors;
  }
</style>