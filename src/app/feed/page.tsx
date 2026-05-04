"use client";

import Link from "next/link";
import { useState } from "react";

export default function Feed() {
  const [feedType, setFeedType] = useState<"offered" | "filled">("offered");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <nav className="flex justify-between items-center p-6 lg:px-12 glass z-10 sticky top-0">
        <div className="text-2xl font-bold tracking-tight"><span className="text-black dark:text-white">server</span><span className="text-brand-500">Network</span></div>
        <div className="space-x-4 flex items-center">
          <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium transition-colors">Dashboard</Link>
          <Link href="/messages" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium transition-colors">Messages</Link>
        </div>
      </nav>

      <main className="flex-grow max-w-4xl w-full mx-auto p-4 lg:p-6 mt-4">
        {/* Header and Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Local Shift Feed</h1>
          
          <div className="flex p-1 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <button 
              onClick={() => setFeedType("offered")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${feedType === "offered" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              Shifts Available (Need Help)
            </button>
            <button 
              onClick={() => setFeedType("filled")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${feedType === "filled" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              Servers Available (Want Work)
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input 
            type="text" 
            placeholder="Search for shifts or servers..." 
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {/* Post Card */}
          <div className="glass-card p-6 overflow-hidden relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">👩‍🍳</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">The Downtown Diner</h3>
                  <div className="flex items-center text-xs text-brand-500">
                    <span>★ 4.9 Rating</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500">2 miles away</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900 dark:text-white">$20/hr + tips</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sunday Brunch Shift</h4>
              <p className="text-gray-600 dark:text-gray-400">Need an experienced server to help with our busy Sunday brunch rush. Shift is from 9AM to 3PM.</p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
              <button className="flex items-center gap-2 text-gray-500 hover:text-brand-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                <span>24 Likes</span>
              </button>
              
              <Link href="/messages" className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-full font-medium transition-all hover-scale shadow-md">
                Message Me
              </Link>
            </div>
          </div>

          {/* Post Card 2 */}
          <div className="glass-card p-6 overflow-hidden relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">👤</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Jane Smith</h3>
                  <div className="flex items-center text-xs text-brand-500">
                    <span>★ 5.0 Rating</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500">5 miles away</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Available Now</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Experienced fine-dining server</h4>
              <p className="text-gray-600 dark:text-gray-400">5 years of experience in fine dining. Looking to pick up weekend evening shifts. ServSafe certified and strong wine knowledge.</p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
              <button className="flex items-center gap-2 text-gray-500 hover:text-brand-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                <span>5 Likes</span>
              </button>
              
              <Link href="/messages" className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-full font-medium transition-all hover-scale shadow-md">
                Message Me
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
