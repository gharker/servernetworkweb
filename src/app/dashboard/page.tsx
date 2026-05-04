"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <nav className="flex justify-between items-center p-6 lg:px-12 glass z-10 sticky top-0">
        <div className="text-2xl font-bold tracking-tight"><span className="text-black dark:text-white">server</span><span className="text-brand-500">Network</span></div>
        <div className="space-x-4 flex items-center">
          <Link href="/feed" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium transition-colors">Feed</Link>
          <Link href="/messages" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium transition-colors">Messages</Link>
          <div className="w-10 h-10 rounded-full bg-brand-200 border-2 border-brand-500 overflow-hidden"></div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Summary */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Welcome back!</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-2xl">👨‍🍳</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">The Rustic Spoon</p>
                <p className="text-sm text-gray-500">Restaurant Account</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              Notifications
              <span className="bg-brand-500 text-white text-xs px-2 py-1 rounded-full">2 Unread</span>
            </h2>
            <ul className="space-y-4">
              <li className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-800/50 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-200 flex-shrink-0 flex items-center justify-center">💬</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">New Message</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Sarah sent you a message about the Friday dinner shift.</p>
                  <Link href="/messages" className="text-xs text-brand-500 hover:underline mt-1 inline-block">View message</Link>
                </div>
              </li>
              <li className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg border border-brand-100 dark:border-brand-800/50 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-200 flex-shrink-0 flex items-center justify-center">💬</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">New Message</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mike responded to your shift offer.</p>
                  <Link href="/messages" className="text-xs text-brand-500 hover:underline mt-1 inline-block">View message</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Current Users Posts */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Active Shift Requests</h2>
              <Link href="/feed" className="text-sm text-brand-500 hover:underline">View Feed</Link>
            </div>
            
            <div className="space-y-4">
              {/* Post Item */}
              <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-brand-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-md mb-2">Need Staff</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Need 1 Server for Friday Dinner Rush</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Shift: 5:00 PM - 11:00 PM. Experience with POS required. Fast-paced environment.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">$25/hr + tips</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between text-sm text-gray-500">
                  <span>Posted 2 hours ago</span>
                  <span>14 views • 2 interested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
