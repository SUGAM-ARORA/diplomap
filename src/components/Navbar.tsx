import React from 'react';
import { 
  Globe, 
  Sun, 
  Moon, 
  Search, 
  Bell, 
  User,
  TrendingUp,
  Newspaper,
  BarChart2,
  Bookmark
} from 'lucide-react';

interface NavbarProps {
  onToggleConflictMap: () => void;
  showConflictMap: boolean;
  onToggleTheme: () => void;
  theme: string;
}

export function Navbar({ onToggleConflictMap, showConflictMap, onToggleTheme, theme }: NavbarProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Newspaper className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold">DiplomMap</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <NavLink icon={TrendingUp}>Top Stories</NavLink>
              <NavLink icon={BarChart2}>Markets</NavLink>
              <NavLink icon={Bookmark}>Saved</NavLink>
              <button
                onClick={onToggleConflictMap}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {showConflictMap ? 'Back to News' : 'Global Conflicts'}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search news, markets, conflicts..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Side Nav */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button
              onClick={onToggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Account</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ children, icon: Icon }: { children: React.ReactNode; icon: any }) {
  return (
    <a href="#" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </a>
  );
}