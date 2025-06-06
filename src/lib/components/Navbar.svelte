<script lang="ts">
  import { 
    Globe, 
    Sun, 
    Moon, 
    Search, 
    Bell, 
    User,
    TrendingUp,
    Newspaper,
    BarChart2,
    Bookmark,
    Menu,
    X
  } from 'lucide-svelte';
  import { theme } from '$lib/stores/theme';
  import { page } from '$app/stores';
  import { fade, slide } from 'svelte/transition';

  let showConflictMap = $page.url.pathname === '/conflicts';
  let showMobileMenu = false;
  let searchQuery = '';
  
  function toggleTheme() {
    theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  function handleSearch(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  }

  $: isActive = (path: string) => $page.url.pathname === path;
</script>

<nav class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo and Main Nav -->
      <div class="flex items-center gap-8">
        <a 
          href="/" 
          class="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="DiplomMap Home"
        >
          <Newspaper class="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span class="text-xl font-bold">DiplomMap</span>
        </a>
        
        <div class="hidden lg:flex items-center gap-6">
          <a 
            href="/trending" 
            class="nav-link {isActive('/trending') ? 'text-blue-600 dark:text-blue-400' : ''}"
          >
            <TrendingUp class="w-4 h-4" />
            <span>Top Stories</span>
          </a>
          <a 
            href="/markets" 
            class="nav-link {isActive('/markets') ? 'text-blue-600 dark:text-blue-400' : ''}"
          >
            <BarChart2 class="w-4 h-4" />
            <span>Markets</span>
          </a>
          <a 
            href="/saved" 
            class="nav-link {isActive('/saved') ? 'text-blue-600 dark:text-blue-400' : ''}"
          >
            <Bookmark class="w-4 h-4" />
            <span>Saved</span>
          </a>
          <a
            href="/conflicts"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full 
                   {isActive('/conflicts') 
                     ? 'bg-blue-600 text-white' 
                     : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800'} 
                   transition-colors"
          >
            <Globe class="w-4 h-4" />
            {showConflictMap ? 'Back to News' : 'Global Conflicts'}
          </a>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="hidden lg:flex flex-1 max-w-xl mx-8">
        <div class="relative w-full">
          <input
            type="text"
            bind:value={searchQuery}
            on:keydown={handleSearch}
            placeholder="Search news, markets, conflicts..."
            class="w-full px-4 py-2 pl-10 pr-4 rounded-lg border dark:border-gray-700 
                   bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 transition-colors"
          />
          <Search class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <!-- Right Side Nav -->
      <div class="flex items-center gap-4">
        <button 
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative"
          aria-label="Notifications"
        >
          <Bell class="w-5 h-5" />
          <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button
          on:click={toggleTheme}
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          aria-label="Toggle theme"
        >
          {#if $theme === 'light'}
            <Moon class="w-5 h-5" />
          {:else}
            <Sun class="w-5 h-5" />
          {/if}
        </button>

        <button 
          class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full 
                 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                 dark:hover:bg-gray-600 transition-colors"
          aria-label="Account"
        >
          <User class="w-5 h-5" />
          <span>Account</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          class="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          on:click={() => showMobileMenu = !showMobileMenu}
          aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
        >
          {#if showMobileMenu}
            <X class="w-6 h-6" />
          {:else}
            <Menu class="w-6 h-6" />
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if showMobileMenu}
    <div
      class="lg:hidden"
      transition:slide={{ duration: 200 }}
    >
      <div class="px-4 py-3 space-y-1">
        <div class="mb-4">
          <div class="relative">
            <input
              type="text"
              bind:value={searchQuery}
              on:keydown={handleSearch}
              placeholder="Search..."
              class="w-full px-4 py-2 pl-10 pr-4 rounded-lg border 
                     dark:border-gray-700 bg-gray-50 dark:bg-gray-900 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <a 
          href="/trending"
          class="flex items-center gap-2 px-3 py-2 rounded-lg 
                 {isActive('/trending') 
                   ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' 
                   : 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
        >
          <TrendingUp class="w-5 h-5" />
          <span>Top Stories</span>
        </a>

        <a 
          href="/markets"
          class="flex items-center gap-2 px-3 py-2 rounded-lg 
                 {isActive('/markets') 
                   ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' 
                   : 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
        >
          <BarChart2 class="w-5 h-5" />
          <span>Markets</span>
        </a>

        <a 
          href="/saved"
          class="flex items-center gap-2 px-3 py-2 rounded-lg 
                 {isActive('/saved') 
                   ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100' 
                   : 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
        >
          <Bookmark class="w-5 h-5" />
          <span>Saved</span>
        </a>

        <a 
          href="/conflicts"
          class="flex items-center gap-2 px-3 py-2 rounded-lg 
                 {isActive('/conflicts') 
                   ? 'bg-blue-600 text-white' 
                   : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100'}"
        >
          <Globe class="w-5 h-5" />
          <span>{showConflictMap ? 'Back to News' : 'Global Conflicts'}</span>
        </a>

        <button 
          class="flex items-center gap-2 px-3 py-2 rounded-lg w-full 
                 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <User class="w-5 h-5" />
          <span>Account</span>
        </button>
      </div>
    </div>
  {/if}
</nav>

<style lang="postcss">
  .nav-link {
    @apply flex items-center gap-2 text-gray-600 dark:text-gray-300 
           hover:text-blue-600 dark:hover:text-blue-400 transition-colors;
  }
</style>