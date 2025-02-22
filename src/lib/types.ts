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
  impact?: {
    economic: number;
    social: number;
    political: number;
  };
  relatedConflicts?: string[];
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

export interface ResourceDistribution {
  type: string;
  amount: number;
  location: {
    lat: number;
    lng: number;
  };
  status: 'abundant' | 'scarce' | 'critical';
  controlledBy: string;
}

export interface PopulationDisplacement {
  from: {
    lat: number;
    lng: number;
    country: string;
  };
  to: {
    lat: number;
    lng: number;
    country: string;
  };
  count: number;
  date: string;
  reason: string;
  status: 'ongoing' | 'completed' | 'planned';
}

export interface EconomicImpact {
  gdpLoss: number;
  infrastructureDamage: number;
  currency: string;
  tradeDisruption: {
    imports: number;
    exports: number;
    affectedSectors: string[];
  };
  sanctions: {
    imposedBy: string[];
    targetedSectors: string[];
    estimatedImpact: number;
  }[];
  resourceScarcity: {
    resource: string;
    severity: 'low' | 'medium' | 'high';
    affectedRegions: string[];
  }[];
}

export interface TensionZone {
  location: {
    lat: number;
    lng: number;
  };
  intensity: number;
  radius: number;
  causes: string[];
  relatedConflicts: string[];
  lastUpdated: string;
}

export interface Alliance {
  name: string;
  members: string[];
  type: 'military' | 'economic' | 'political';
  strength: number;
  formed: string;
  dissolved?: string;
  objectives: string[];
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
  parties: {
    name: string;
    stance: CountryStance;
    strength: number;
    resources: ResourceDistribution[];
  }[];
  casualties: {
    civilian: number;
    military: number;
    total: number;
    displaced: number;
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
    impact: {
      political: number;
      economic: number;
      social: number;
    };
  }[];
  alliances: {
    supporters: Alliance[];
    opposition: Alliance[];
    neutral: Alliance[];
  };
  economicImpact: EconomicImpact;
  populationDisplacement: PopulationDisplacement[];
  tensionZones: TensionZone[];
  resourceControl: ResourceDistribution[];
  timeline: {
    date: string;
    event: string;
    type: 'escalation' | 'de-escalation' | 'neutral';
    intensity: number;
  }[];
}