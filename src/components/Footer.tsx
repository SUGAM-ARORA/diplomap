import React from 'react';
import { 
  Newspaper,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Newspaper className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold">DiplomMap</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your comprehensive source for global news, conflicts, and geopolitical insights.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Facebook} href="#" />
              <SocialLink icon={Instagram} href="#" />
              <SocialLink icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink>Top Stories</FooterLink>
              <FooterLink>Global Conflicts</FooterLink>
              <FooterLink>Elections</FooterLink>
              <FooterLink>Markets</FooterLink>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <FooterLink>World News</FooterLink>
              <FooterLink>India</FooterLink>
              <FooterLink>Business</FooterLink>
              <FooterLink>Technology</FooterLink>
              <FooterLink>Sports</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for daily updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 DiplomMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon: Icon, href }: { icon: any; href: string }) {
  return (
    <a
      href={href}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        {children}
      </a>
    </li>
  );
}