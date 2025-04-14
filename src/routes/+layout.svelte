<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Toaster } from 'svelte-french-toast';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { theme } from '$lib/stores/theme';
  import '../app.css';

  onMount(() => {
    // Check system theme preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.set('dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      theme.set(e.matches ? 'dark' : 'light');
    });
  });
</script>

<svelte:head>
  <title>DiplomMap - Global News & Conflict Tracker</title>
  <meta name="description" content="Track global conflicts, news, and geopolitical developments in real-time" />
</svelte:head>

<div class="min-h-screen flex flex-col {$theme}">
  <Navbar />
  
  <main class="flex-1 bg-gray-50 dark:bg-gray-900">
    <slot />
  </main>

  <Footer />
  <Toaster />
</div>

<style>
  :global(.dark) {
    color-scheme: dark;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    @apply antialiased;
  }
</style>