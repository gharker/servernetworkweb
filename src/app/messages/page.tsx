"use client";

import Link from "next/link";
import { useState } from "react";

export default function Messages() {
  const [activeChat, setActiveChat] = useState("jane");

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <nav className="flex justify-between items-center p-4 lg:px-8 glass z-10 sticky top-0 flex-shrink-0">
        <div className="text-xl font-bold tracking-tight"><span className="text-black dark:text-white">server</span><span className="text-brand-500">Network</span></div>
        <div className="space-x-4 flex items-center">
          <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium transition-colors text-sm">Dashboard</Link>
          <Link href="/feed" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium transition-colors text-sm">Feed</Link>
        </div>
      </nav>

      <main className="flex-grow flex overflow-hidden max-w-7xl w-full mx-auto p-4 gap-4">
        {/* Sidebar */}
        <div className="w-1/3 md:w-1/4 lg:w-1/4 flex flex-col gap-2 overflow-y-auto glass-card rounded-xl border-r border-gray-200 dark:border-gray-800">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
            <h2 className="font-bold text-gray-900 dark:text-white">Active Chats</h2>
            <p className="text-xs text-brand-500 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Auto-delete in 48h
            </p>
          </div>
          
          <div className="p-2 space-y-1 overflow-y-auto">
            <button 
              onClick={() => setActiveChat("jane")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeChat === "jane" ? "bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800/50" : "hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-transparent"}`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-lg relative">
                👤
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Jane Smith</p>
                <p className="text-xs text-gray-500 truncate">Yes, I can cover the dinner shift.</p>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveChat("diner")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeChat === "diner" ? "bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800/50" : "hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-transparent"}`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-lg relative">
                🏪
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white dark:border-gray-900 rounded-full"></span>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Downtown Diner</p>
                <p className="text-xs text-gray-500 truncate">Are you available for brunch tomorrow?</p>
              </div>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 md:w-3/4 lg:w-3/4 flex flex-col glass-card rounded-xl overflow-hidden relative">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                {activeChat === "jane" ? "👤" : "🏪"}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {activeChat === "jane" ? "Jane Smith" : "Downtown Diner"}
                </h3>
                <p className="text-xs text-brand-500">Regarding: {activeChat === "jane" ? "Friday Dinner Shift" : "Sunday Brunch Shift"}</p>
              </div>
            </div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4 flex flex-col">
            {activeChat === "jane" ? (
              <>
                <div className="flex justify-center my-2">
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    Messages will self-destruct in 48 hours
                  </span>
                </div>
                
                <div className="self-end max-w-[70%]">
                  <div className="bg-brand-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-sm">
                    <p className="text-sm">Hi Jane! I saw your profile. Are you available to pick up our Friday dinner rush shift from 5-11PM?</p>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right mt-1">10:42 AM</p>
                </div>
                
                <div className="self-start max-w-[70%]">
                  <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                    <p className="text-sm">Hello! Yes, I'm available. Do you require a specific uniform?</p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">10:45 AM</p>
                </div>
                
                <div className="self-end max-w-[70%]">
                  <div className="bg-brand-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-sm">
                    <p className="text-sm">Just a black button-down and black slacks. We'll provide the apron!</p>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right mt-1">10:46 AM</p>
                </div>
                
                <div className="self-start max-w-[70%]">
                  <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                    <p className="text-sm">Perfect. Yes, I can cover the dinner shift. See you Friday!</p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">10:48 AM</p>
                </div>
              </>
            ) : (
              <>
                <div className="self-end max-w-[70%]">
                  <div className="bg-brand-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-sm">
                    <p className="text-sm">I'm interested in the Sunday Brunch shift!</p>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right mt-1">Yesterday</p>
                </div>
                
                <div className="self-start max-w-[70%]">
                  <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                    <p className="text-sm">Great! Are you available for a quick phone call tomorrow to go over the menu?</p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Yesterday</p>
                </div>
              </>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-grow px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all pr-12 shadow-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-500 hover:bg-brand-600 text-white rounded-full flex items-center justify-center transition-colors shadow-md">
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
