// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async () => {
  return {
    streamed: {
      news: new Promise(resolve => {
        // This would be replaced with actual API calls in production
        setTimeout(() => {
          resolve([
            {
              id: '1',
              title: 'Global Economic Summit Begins',
              description: 'World leaders gather to discuss economic challenges',
              source: 'World News',
              url: '#',
              publishedAt: new Date().toISOString(),
              category: 'world',
              image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1000'
            },
            // Add more mock news items here
          ]);
        }, 100);
      })
    }
  };
};;null as any as PageServerLoad;