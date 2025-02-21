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
  });
</script>

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
</style>