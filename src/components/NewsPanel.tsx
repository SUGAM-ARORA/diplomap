import { useEffect, useState } from 'react';
import { useConflictStore } from '../store/useConflictStore';
import { Newspaper as News, Globe, Vote, TrendingUp, Zap } from 'lucide-react';
import { Card, Title, Tab, TabList, TabGroup, TabPanel, TabPanels } from '@tremor/react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: 'world' | 'india' | 'breaking' | 'conflict' | 'business' | 'technology';
  sentiment?: 'positive' | 'negative' | 'neutral';
  image?: string;
}

interface ElectionCandidate {
  name: string;
  party: string;
  symbol: string;
  constituency: string;
  state: string;
  currentPosition?: string;
  opponents: string[];
}

interface NewsPanelProps {
  conflictNewsOnly?: boolean;
}

export function NewsPanel({ conflictNewsOnly = false }: NewsPanelProps) {
  const { selectedConflict } = useConflictStore();
  const [activeTab, setActiveTab] = useState(0);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [breakingNews, setBreakingNews] = useState<string[]>([]);
  const [electionData, setElectionData] = useState<ElectionCandidate[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

  // Simulated news data - Replace with actual API calls
  useEffect(() => {
    const fetchNews = () => {
      const mockNews: NewsItem[] = [
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
        {
          id: '2',
          title: 'New Technology Initiative in India',
          description: 'Government launches digital transformation program',
          source: 'India Today',
          url: '#',
          publishedAt: new Date().toISOString(),
          category: 'india',
          image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=1000'
        },
        {
          id: '3',
          title: 'Tech Giants Announce AI Breakthrough',
          description: 'Revolutionary advancement in artificial intelligence research',
          source: 'Tech News',
          url: '#',
          publishedAt: new Date().toISOString(),
          category: 'technology',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
        },
        {
          id: '4',
          title: 'Stock Markets Hit New Record',
          description: 'Global markets surge amid positive economic data',
          source: 'Business News',
          url: '#',
          publishedAt: new Date().toISOString(),
          category: 'business',
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000'
        }
      ];
      setNews(mockNews);
    };

    fetchNews();
    const interval = setInterval(fetchNews, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(interval);
  }, []);

  // Breaking news ticker
  useEffect(() => {
    const mockBreakingNews = [
      'Breaking: Major diplomatic breakthrough in peace talks',
      'Update: New economic policies announced',
      'Alert: Weather warning issued for coastal regions'
    ];
    setBreakingNews(mockBreakingNews);
  }, []);

  // Election data
  useEffect(() => {
    const mockElectionData: ElectionCandidate[] = [
      {
        name: 'Candidate A',
        party: 'Party X',
        symbol: '🌟',
        constituency: 'Constituency 1',
        state: 'Maharashtra',
        currentPosition: 'Incumbent',
        opponents: ['Candidate B', 'Candidate C']
      },
      {
        name: 'Candidate D',
        party: 'Party Y',
        symbol: '🌺',
        constituency: 'Constituency 2',
        state: 'Haryana',
        opponents: ['Candidate E', 'Candidate F']
      }
    ];
    setElectionData(mockElectionData);
  }, []);

  if (conflictNewsOnly) {
    return (
      <div className="p-6">
        {selectedConflict ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{selectedConflict.name} Updates</h3>
            {selectedConflict.news.map((item, index) => (
              <NewsCard
                key={index}
                news={{
                  id: index.toString(),
                  title: item.title,
                  description: '',
                  source: item.source,
                  url: item.url,
                  publishedAt: item.publishedAt,
                  category: 'conflict',
                  sentiment: item.sentiment
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <Globe className="w-12 h-12 mx-auto mb-2" />
            <p>Select a conflict on the map to view related news</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="animate-marquee whitespace-nowrap">
          {breakingNews.map((news, index) => (
            <span key={index} className="mx-4">
              {news}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex-1 overflow-y-auto">
        <TabGroup>
          <TabList className="flex space-x-2 mb-6">
            <Tab className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              World
            </Tab>
            <Tab className="flex items-center gap-2">
              <News className="w-4 h-4" />
              India
            </Tab>
            <Tab className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Business
            </Tab>
            <Tab className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Technology
            </Tab>
            <Tab className="flex items-center gap-2">
              <Vote className="w-4 h-4" />
              Elections
            </Tab>
          </TabList>

          <TabPanels>
            {/* World News Panel */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news
                  .filter(item => item.category === 'world')
                  .map(item => (
                    <NewsCard key={item.id} news={item} />
                  ))}
              </div>
            </TabPanel>

            {/* India News Panel */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news
                  .filter(item => item.category === 'india')
                  .map(item => (
                    <NewsCard key={item.id} news={item} />
                  ))}
              </div>
            </TabPanel>

            {/* Business News Panel */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news
                  .filter(item => item.category === 'business')
                  .map(item => (
                    <NewsCard key={item.id} news={item} />
                  ))}
              </div>
            </TabPanel>

            {/* Technology News Panel */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news
                  .filter(item => item.category === 'technology')
                  .map(item => (
                    <NewsCard key={item.id} news={item} />
                  ))}
              </div>
            </TabPanel>

            {/* Elections Panel */}
            <TabPanel>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <select
                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Haryana">Haryana</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {electionData
                    .filter(candidate => !selectedState || candidate.state === selectedState)
                    .map((candidate, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{candidate.symbol}</div>
                          <div>
                            <h4 className="font-semibold">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.party}</p>
                            <p className="text-sm text-gray-500">
                              {candidate.constituency}, {candidate.state}
                            </p>
                            {candidate.currentPosition && (
                              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mt-1">
                                {candidate.currentPosition}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <strong>Opponents:</strong>{' '}
                            {candidate.opponents.join(', ')}
                          </p>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      {news.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Title>{news.title}</Title>
            {news.description && (
              <p className="text-gray-600 mt-2">{news.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500">
                {new Date(news.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-sm font-medium">{news.source}</span>
            </div>
          </div>
          {news.sentiment && (
            <span
              className={`px-2 py-1 rounded text-xs ${
                news.sentiment === 'positive'
                  ? 'bg-green-100 text-green-800'
                  : news.sentiment === 'negative'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {news.sentiment}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}