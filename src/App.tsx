import React from 'react';
import { Map } from './components/Map';
import { Sidebar } from './components/Sidebar';
import { Analytics } from './components/Analytics';
import { NewsPanel } from './components/NewsPanel';
import { Sun, Moon } from 'lucide-react';
import { useConflictStore } from './store/useConflictStore';

function App() {
  const { theme, toggleTheme } = useConflictStore();

  return (
    <div className={`${theme} ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="h-12 bg-white dark:bg-gray-800 shadow flex items-center justify-end px-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2">
            <div className="relative">
              <Map />
            </div>
            <div className="overflow-y-auto">
              <Analytics />
              <NewsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;