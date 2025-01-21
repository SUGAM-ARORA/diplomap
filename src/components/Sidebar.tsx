import { Filter, Info } from 'lucide-react';
import { useConflictStore } from '../store/useConflictStore';

export function Sidebar() {
  const { selectedConflict } = useConflictStore();

  const getStanceColor = (stance: string) => {
    switch (stance) {
      case 'supporter': return 'bg-green-100 text-green-800';
      case 'opposition': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-96 bg-white dark:bg-gray-800 shadow-lg p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Global Conflicts</h2>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {selectedConflict ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold dark:text-white">{selectedConflict.name}</h3>
            <span className={`px-2 py-1 rounded-full text-sm ${
              selectedConflict.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {selectedConflict.status}
            </span>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Started: {new Date(selectedConflict.startDate).toLocaleDateString()}
            {selectedConflict.endDate && ` - Ended: ${new Date(selectedConflict.endDate).toLocaleDateString()}`}
          </div>

          <p className="text-gray-700 dark:text-gray-300">{selectedConflict.description}</p>

          <div className="border-t dark:border-gray-700 pt-4">
            <h4 className="font-semibold mb-2 dark:text-white">Involved Parties</h4>
            <div className="space-y-2">
              {selectedConflict.parties.map((party, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getStanceColor(party.stance)}`}>
                    {party.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-4">
            <h4 className="font-semibold mb-2 dark:text-white">Key Events</h4>
            <div className="space-y-2">
              {selectedConflict.keyEvents.map((event, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString()}:
                  </span>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{event.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-4">
            <h4 className="font-semibold mb-2 dark:text-white">Casualties</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Civilian</p>
                <p className="text-lg font-semibold dark:text-white">
                  {selectedConflict.casualties.civilian.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Military</p>
                <p className="text-lg font-semibold dark:text-white">
                  {selectedConflict.casualties.military.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <Info className="w-12 h-12 mb-2" />
          <p>Select a conflict on the map to view details</p>
        </div>
      )}
    </div>
  );
}