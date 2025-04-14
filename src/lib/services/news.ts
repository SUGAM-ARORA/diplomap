import type { NewsItem } from '$lib/types';

// Mock data since we don't have a real API key
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Global Economic Summit Begins',
    description: 'World leaders gather to discuss economic challenges and recovery strategies post-pandemic. The summit will focus on sustainable development and climate finance.',
    source: 'World News',
    url: 'https://example.com/news/1',
    publishedAt: new Date().toISOString(),
    category: 'world',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Tech Innovation Summit 2024',
    description: 'Leading companies showcase latest technologies including AI advancements, quantum computing breakthroughs, and sustainable tech solutions.',
    source: 'Tech News',
    url: 'https://example.com/news/2',
    publishedAt: new Date().toISOString(),
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Ukraine Peace Talks Show Progress',
    description: 'Diplomatic efforts intensify as mediators report cautious optimism in the latest round of negotiations between Ukraine and Russia.',
    source: 'International Affairs',
    url: 'https://example.com/news/3',
    publishedAt: new Date().toISOString(),
    category: 'world',
    sentiment: 'positive',
    image: 'https://images.unsplash.com/photo-1602526429747-ac387a91d43b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'Stock Markets Hit New Record',
    description: 'Global markets surge amid positive economic data and strong corporate earnings reports. Tech and renewable energy sectors lead the gains.',
    source: 'Business News',
    url: 'https://example.com/news/4',
    publishedAt: new Date().toISOString(),
    category: 'business',
    sentiment: 'positive',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '5',
    title: 'New Digital Currency Regulations Proposed',
    description: 'Major economies coordinate on regulatory framework for cryptocurrencies and central bank digital currencies to ensure financial stability.',
    source: 'Financial Times',
    url: 'https://example.com/news/5',
    publishedAt: new Date().toISOString(),
    category: 'business',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '6',
    title: 'Humanitarian Crisis Deepens in Gaza',
    description: 'Aid organizations warn of deteriorating conditions as conflict continues. Critical shortages of medical supplies, food, and clean water reported.',
    source: 'Middle East Monitor',
    url: 'https://example.com/news/6',
    publishedAt: new Date().toISOString(),
    category: 'world',
    sentiment: 'negative',
    image: 'https://images.unsplash.com/photo-1469571486292-b53601010b89?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '7',
    title: 'India Launches Ambitious Green Energy Initiative',
    description: 'Government unveils $50 billion plan to accelerate renewable energy adoption and achieve carbon neutrality targets ahead of schedule.',
    source: 'India Today',
    url: 'https://example.com/news/7',
    publishedAt: new Date().toISOString(),
    category: 'india',
    sentiment: 'positive',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '8',
    title: 'AI Breakthrough in Medical Diagnostics',
    description: 'New artificial intelligence system demonstrates unprecedented accuracy in early cancer detection, potentially revolutionizing preventive healthcare.',
    source: 'Science Daily',
    url: 'https://example.com/news/8',
    publishedAt: new Date().toISOString(),
    category: 'technology',
    sentiment: 'positive',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '9',
    title: 'Elections Announced in Key Swing States',
    description: 'Electoral commission sets dates for crucial votes that could determine the balance of power in the upcoming national elections.',
    source: 'Political Monitor',
    url: 'https://example.com/news/9',
    publishedAt: new Date().toISOString(),
    category: 'world',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '10',
    title: 'Global Supply Chain Disruptions Ease',
    description: 'Logistics experts report significant improvements in global shipping and manufacturing bottlenecks that have plagued industries since the pandemic.',
    source: 'Economic Review',
    url: 'https://example.com/news/10',
    publishedAt: new Date().toISOString(),
    category: 'business',
    sentiment: 'positive',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1000'
  }
];

export async function fetchNews(category: string = 'all'): Promise<NewsItem[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockNews.filter(item => 
      category === 'all' || item.category === category
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

export async function fetchBreakingNews(): Promise<string[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      'Breaking: Major diplomatic breakthrough in Ukraine-Russia peace talks',
      'Update: New economic sanctions announced against military regime',
      'Alert: Humanitarian aid convoy reaches besieged city after weeks of blockade',
      'Breaking: UN Security Council calls emergency meeting on escalating conflict',
      'Update: International mediators propose new framework for ceasefire agreement'
    ];
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    throw error;
  }
}