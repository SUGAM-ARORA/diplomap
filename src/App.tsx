import React, { useState } from 'react';
import { Map } from './components/Map';
import { Sidebar } from './components/Sidebar';
import { Analytics } from './components/Analytics';
import { NewsPanel } from './components/NewsPanel';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useConflictStore } from './store/useConflictStore';

function App() {
  const { theme, toggleTheme } = useConflictStore();
  const [showConflictMap, setShowConflictMap] = useState(false);

  return (
    <div className={`${theme} ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="min-h-screen flex flex-col">
        <Navbar onToggleConflictMap={() => setShowConflictMap(!showConflictMap)} 
                showConflictMap={showConflictMap}
                onToggleTheme={toggleTheme}
                theme={theme} />

        <main className="flex-1">
          {showConflictMap ? (
            <div className="flex h-[calc(100vh-64px)]">
              <Sidebar />
              <div className="flex-1 grid grid-cols-2">
                <div className="relative">
                  <Map />
                </div>
                <div className="overflow-y-auto">
                  <Analytics />
                  <NewsPanel conflictNewsOnly />
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-6">
              <NewsPanel />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App