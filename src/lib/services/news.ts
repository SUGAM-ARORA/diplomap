import type { NewsItem } from '$lib/types';

// Mock data since we don't have a real API key
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Global Economic Summit Begins',
    description: 'World leaders gather to discuss economic challenges',
    source: 'World News',
    url: 'https://example.com/news/1',
    publishedAt: new Date().toISOString(),
    category: 'world',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Tech Innovation Summit 2024',
    description: 'Leading companies showcase latest technologies',
    source: 'Tech News',
    url: 'https://example.com/news/2',
    publishedAt: new Date().toISOString(),
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
  }
];

export async function fetchNews(category: string = 'all'): Promise<NewsItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockNews.filter(item => 
    category === 'all' || item.category === category
  );
}

export async function fetchBreakingNews(): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    'Breaking: Major diplomatic breakthrough in peace talks',
    'Update: New economic policies announced',
    'Alert: Weather warning issued for coastal regions'
  ];
}