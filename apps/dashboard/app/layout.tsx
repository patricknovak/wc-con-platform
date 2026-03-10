import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard - West Central Contracting',
  description: 'Admin dashboard for managing business operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Top bar */}
            <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
              <div></div>
              <div className="flex items-center gap-6">
                <button className="text-gray-600 hover:text-gray-900 relative">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Todd</p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
                    T
                  </div>
                </div>
              </div>
            </header>

            {/* Page content */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
