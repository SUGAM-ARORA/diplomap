import { useConflictStore } from '../store/useConflictStore';
import { Newspaper as News } from 'lucide-react';

export function NewsPanel() {
  const { selectedConflict } = useConflictStore();

  if (!selectedConflict) {
    return (
      <div className="p-6 text-center text-gray-500">
        <News className="w-12 h-12 mx-auto mb-2" />
        <p>Select a conflict to view related news</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <News className="w-5 h-5" />
        Latest News
      </h3>
      {selectedConflict.news.length > 0 ? (
        <div className="space-y-4">
          {selectedConflict.news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <span className={`px-2 py-1 rounded text-xs ${
                  item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  item.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.source}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(item.publishedAt).toLocaleDateString()}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent news available</p>
      )}
    </div>
  );
}