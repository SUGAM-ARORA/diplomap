<script lang="ts">
  import { 
    Newspaper,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Mail
  } from 'lucide-svelte';
</script>

<footer class="bg-white dark:bg-gray-800 shadow-lg mt-auto">
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Brand -->
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Newspaper class="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <span class="text-xl font-bold">DiplomMap</span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Your comprehensive source for global news, conflicts, and geopolitical insights.
        </p>
        <div class="flex gap-4">
          <a href="#" class="social-link">
            <Twitter class="w-5 h-5" />
          </a>
          <a href="#" class="social-link">
            <Facebook class="w-5 h-5" />
          </a>
          <a href="#" class="social-link">
            <Instagram class="w-5 h-5" />
          </a>
          <a href="#" class="social-link">
            <Linkedin class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><a href="#" class="footer-link">Top Stories</a></li>
          <li><a href="#" class="footer-link">Global Conflicts</a></li>
          <li><a href="#" class="footer-link">Elections</a></li>
          <li><a href="#" class="footer-link">Markets</a></li>
        </ul>
      </div>

      <!-- Categories -->
      <div>
        <h3 class="font-semibold mb-4">Categories</h3>
        <ul class="space-y-2">
          <li><a href="#" class="footer-link">World News</a></li>
          <li><a href="#" class="footer-link">India</a></li>
          <li><a href="#" class="footer-link">Business</a></li>
          <li><a href="#" class="footer-link">Technology</a></li>
          <li><a href="#" class="footer-link">Sports</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div>
        <h3 class="font-semibold mb-4">Stay Updated</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Subscribe to our newsletter for daily updates.
        </p>
        <div class="flex">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-2 rounded-l-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button class="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
            <Mail class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="border-t dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
      <p>© {new Date().getFullYear()} DiplomMap. All rights reserved.</p>
    </div>
  </div>
</footer>

<style lang="postcss">
  .social-link {
    @apply p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors;
  }

  .footer-link {
    @apply text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors;
  }
</style>