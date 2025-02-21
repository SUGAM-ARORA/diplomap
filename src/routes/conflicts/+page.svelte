<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Circle } from 'svelte-loading-spinners';
  import type { Conflict } from '$lib/types';
  import { Globe, Filter, Info } from 'lucide-svelte';

  let conflicts: Conflict[] = [];
  let selectedConflict: Conflict | null = null;
  let loading = true;
  let error: string | null = null;

  // Mock data - Replace with actual API calls
  const mockConflicts: Conflict[] = [
    {
      id: 'ukraine-russia',
      name: 'Ukraine-Russia Conflict',
      type: 'territorial',
      intensity: 'major',
      location: {
        lat: 49.0,
        lng: 31.0,
        country: 'Ukraine',
        region: 'Eastern Europe'
      },
      description: 'Ongoing military conflict between Russia and Ukraine.',
      background: 'Tensions over NATO expansion, territorial disputes, and historical ties.',
      startDate: '2022-02-24',
      parties: [
        { name: 'Ukraine', stance: 'supporter' },
        { name: 'Russia', stance: 'opposition' }
      ],
      casualties: {
        civilian: 10000,
        military: 40000,
        total: 50000
      },
      status: 'active',
      lastUpdated: '2024-03-14',
      news: [
        {
          title: 'Latest developments in Ukraine conflict',
          source: 'BBC News',
          url: 'https://www.bbc.com/news/world-europe',
          publishedAt: '2024-03-14',
          sentiment: 'neutral'
        }
      ],
      keyEvents: [
        {
          date: '2022-02-24',
          description: 'Russian invasion begins'
        }
      ],
      alliances: {
        supporters: ['NATO countries', 'EU'],
        opposition: ['Russia', 'Belarus'],
        neutral: []
      },
      economicImpact: {
        gdpLoss: 500000000000,
        infrastructureDamage: 300000000000,
        currency: 'USD'
      }
    }
  ];

  onMount(() => {
    // Simulate API call
    setTimeout(() => {
      conflicts = mockConflicts;
      selectedConflict = mockConflicts[0]; // Auto-select first conflict
      loading = false;
    }, 1000);
  });

  function getStanceColor(stance: string): string {
    switch (stance) {
      case 'supporter': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'opposition': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'neutral': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  }
</script>

<svelte:head>
  <title>Global Conflicts | DiplomMap</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar -->
      <div class="w-full lg:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold dark:text-white">Global Conflicts</h2>
          <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Filter class="w-5 h-5" />
          </button>
        </div>

        {#if loading}
          <div class="flex justify-center items-center h-64" in:fade>
            <Circle size="60" color="#3B82F6" unit="px" duration="1s" />
          </div>
        {:else if error}
          <div class="text-center text-red-600 dark:text-red-400 py-8" in:fade>
            {error}
          </div>
        {:else if selectedConflict}
          <div class="space-y-4" in:fade>
            <div class="flex items-center gap-2">
              <h3 class="text-xl font-semibold dark:text-white">{selectedConflict.name}</h3>
              <span class="px-2 py-1 rounded-full text-sm {selectedConflict.status === 'active' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'}">
                {selectedConflict.status}
              </span>
            </div>
            
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Started: {new Date(selectedConflict.startDate).toLocaleDateString()}
              {selectedConflict.endDate && ` - Ended: ${new Date(selectedConflict.endDate).toLocaleDateString()}`}
            </div>

            <p class="text-gray-700 dark:text-gray-300">{selectedConflict.description}</p>

            <div class="border-t dark:border-gray-700 pt-4">
              <h4 class="font-semibold mb-2 dark:text-white">Involved Parties</h4>
              <div class="space-y-2">
                {#each selectedConflict.parties as party}
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 rounded-full text-sm {getStanceColor(party.stance)}">
                      {party.name}
                    </span>
                  </div>
                {/each}
                }
              </div>
            </div>

            <div class="border-t dark:border-gray-700 pt-4">
              <h4 class="font-semibold mb-2 dark:text-white">Key Events</h4>
              <div class="space-y-2">
                {#each selectedConflict.keyEvents as event}
                  <div class="text-sm">
                    <span class="text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()}:
                    </span>
                    <span class="ml-2 text-gray-700 dark:text-gray-300">{event.description}</span>
                  </div>
                {/each}
                }
              </div>
            </div>

            <div class="border-t dark:border-gray-700 pt-4">
              <h4 class="font-semibold mb-2 dark:text-white">Casualties</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Civilian</p>
                  <p class="text-lg font-semibold dark:text-white">
                    {selectedConflict.casualties.civilian.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Military</p>
                  <p class="text-lg font-semibold dark:text-white">
                    {selectedConflict.casualties.military.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <Info class="w-12 h-12 mb-2" />
            <p>Select a conflict on the map to view details</p>
          </div>
        {/if}
        }
      </div>

      <!-- Main Content -->
      <div class="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="h-[600px] relative">
          <!-- Map will be added here using Leaflet -->
          <div class="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <Globe class="w-12 h-12" />
            <p class="ml-4">Interactive map loading...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>