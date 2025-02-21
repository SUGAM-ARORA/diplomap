export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  image?: string;
  source: string;
  publishedAt: string;
  category?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface ElectionCandidate {
  name: string;
  party: string;
  symbol: string;
  constituency: string;
  state: string;
  currentPosition?: string;
  opponents: string[];
}

export type Theme = 'light' | 'dark';

export type ConflictIntensity = 'major' | 'war' | 'minor' | 'skirmish';
export type ConflictType = 'territorial' | 'civil' | 'religious' | 'economic' | 'world_war' | 'cold_war' | 'insurgency' | 'drug_war';
export type ConflictStatus = 'active' | 'ceasefire' | 'resolved' | 'historical';
export type CountryStance = 'supporter' | 'opposition' | 'neutral';

export interface Conflict {
  id: string;
  name: string;
  type: ConflictType;
  intensity?: ConflictIntensity;
  location: {
    lat: number;
    lng: number;
    country: string;
    region: string;
  };
  description: string;
  background: string;
  startDate: string;
  endDate?: string;
  parties: {
    name: string;
    stance: CountryStance;
  }[];
  casualties: {
    civilian: number;
    military: number;
    total: number;
  };
  status: ConflictStatus;
  lastUpdated: string;
  news: {
    title: string;
    source: string;
    url: string;
    publishedAt: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  keyEvents: {
    date: string;
    description: string;
  }[];
  alliances: {
    supporters: string[];
    opposition: string[];
    neutral: string[];
  };
  economicImpact: {
    gdpLoss: number;
    infrastructureDamage: number;
    currency: string;
  };
}