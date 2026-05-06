"use client";

import { useStream } from "@/hooks/useStream";
import { Chat, Channel, ChannelHeader, ChannelList, MessageComposer, MessageList, Window } from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";

export default function MessagesPage() {
  const { userId } = useAuth();
  const { client } = useStream();

  if (!client || !userId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 font-bold">Loading messages...</p>
      </div>
    );
  }

  const filters = { type: 'messaging', members: { $in: [userId] } };
  const sort = { last_message_at: -1 } as const;

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-950 flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <nav className="w-full flex justify-between items-center p-4 lg:px-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40 shadow-sm shrink-0">
        <Link href="/" className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-black dark:text-white">server</span>
          <span className="text-brand-500">Network</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-brand-500 font-medium mr-4 transition-colors">
            Dashboard
          </Link>
          <UserButton />
        </div>
      </nav>

      <main className="flex-grow flex overflow-hidden">
        <Chat client={client} theme="str-chat__theme-light">
          <div className="w-80 border-r border-gray-200 shrink-0 overflow-y-auto">
            <ChannelList 
              filters={filters} 
              sort={sort}
            />
          </div>
          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageComposer />
              </Window>
            </Channel>
          </div>
        </Chat>
      </main>
    </div>
  );
}
