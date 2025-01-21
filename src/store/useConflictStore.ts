import { create } from 'zustand';
import { Conflict } from '../types/conflict';

interface ConflictState {
  conflicts: Conflict[];
  selectedConflict: Conflict | null;
  theme: 'dark' | 'light';
  filters: {
    type: string[];
    status: string[];
    region: string[];
    dateRange: {
      start: string;
      end: string;
    };
  };
  setSelectedConflict: (conflict: Conflict | null) => void;
  setFilters: (filters: ConflictState['filters']) => void;
  toggleTheme: () => void;
}

const historicalConflicts: Conflict[] = [
  {
    id: 'ww2',
    name: 'World War II',
    type: 'world_war',
    location: {
      lat: 52.5200,
      lng: 13.4050,
      country: 'Multiple',
      region: 'Global'
    },
    description: 'Global military conflict from 1939 to 1945.',
    background: 'Caused by German expansion under Nazi regime, Japanese imperialism, and unresolved tensions from WWI.',
    startDate: '1939-09-01',
    endDate: '1945-09-02',
    parties: ['Allied Powers', 'Axis Powers'],
    casualties: {
      civilian: 50000000,
      military: 20000000,
      total: 70000000
    },
    status: 'historical',
    lastUpdated: '2024-03-14',
    news: [],
    keyEvents: [
      {
        date: '1939-09-01',
        description: 'German invasion of Poland'
      },
      {
        date: '1941-12-07',
        description: 'Pearl Harbor attack'
      },
      {
        date: '1945-08-06',
        description: 'Atomic bombing of Hiroshima'
      }
    ],
    alliances: {
      supporters: ['USA', 'UK', 'USSR', 'France'],
      opposition: ['Nazi Germany', 'Imperial Japan', 'Italy']
    },
    economicImpact: {
      gdpLoss: 2000000000000,
      infrastructureDamage: 1500000000000,
      currency: 'USD'
    }
  },
  {
    id: 'ukraine-russia',
    name: 'Ukraine-Russia Conflict',
    type: 'territorial',
    location: {
      lat: 49.0,
      lng: 31.0,
      country: 'Ukraine',
      region: 'Eastern Europe'
    },
    description: 'Ongoing military conflict between Russia and Ukraine.',
    background: 'Tensions over NATO expansion, territorial disputes, and historical ties.',
    startDate: '2022-02-24',
    parties: ['Ukraine', 'Russia'],
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
      opposition: ['Russia', 'Belarus']
    },
    economicImpact: {
      gdpLoss: 500000000000,
      infrastructureDamage: 300000000000,
      currency: 'USD'
    }
  }
];

export const useConflictStore = create<ConflictState>((set) => ({
  conflicts: historicalConflicts,
  selectedConflict: null,
  theme: 'light',
  filters: {
    type: [],
    status: [],
    region: [],
    dateRange: {
      start: '',
      end: ''
    }
  },
  setSelectedConflict: (conflict) => set({ selectedConflict: conflict }),
  setFilters: (filters) => set({ filters }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
}));