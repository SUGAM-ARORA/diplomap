export type ConflictIntensity = 'major' | 'war' | 'minor' | 'skirmish';
export type ConflictType = 'territorial' | 'civil' | 'religious' | 'economic' | 'world_war' | 'cold_war' | 'insurgency' | 'drug_war';
export type ConflictStatus = 'active' | 'ceasefire' | 'resolved' | 'historical';
export type CountryStance = 'supporter' | 'opposition' | 'neutral';

export interface Casualty {
  civilian: number;
  military: number;
  total: number;
}

export interface News {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface Country {
  name: string;
  stance: CountryStance;
}

export interface Conflict {
  id: string;
  name: string;
  type: ConflictType;
  intensity: ConflictIntensity;
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
  parties: Country[];
  casualties: Casualty;
  status: ConflictStatus;
  lastUpdated: string;
  news: News[];
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