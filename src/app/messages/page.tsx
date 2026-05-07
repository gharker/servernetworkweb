"use client";

import { useStream } from "@/hooks/useStream";
import { Chat, Channel, ChannelHeader, ChannelList, MessageComposer, MessageList, Window, useChatContext } from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";

import { useState, useEffect, useCallback } from "react";

const CustomMobileChannelList = ({ filters, sort, onClose, client }: any) => {
  const [channels, setChannels] = useState<any[]>([]);
  const { setActiveChannel, channel: activeChannel } = useChatContext();

  const fetchChannels = useCallback(async () => {
    if (!client) return;
    try {
      const result = await client.queryChannels(filters, sort, { limit: 30 });
      setChannels(result);
    } catch (e) {
      console.error(e);
    }
  }, [client, filters, sort]);

  useEffect(() => {
    fetchChannels();
    const handleEvent = () => setTimeout(fetchChannels, 200);
    client.on('message.new', handleEvent);
    client.on('notification.message_new', handleEvent);
    client.on('notification.added_to_channel', handleEvent);
    client.on('channel.updated', handleEvent);
    return () => {
      client.off('message.new', handleEvent);
      client.off('notification.message_new', handleEvent);
      client.off('notification.added_to_channel', handleEvent);
      client.off('channel.updated', handleEvent);
    };
  }, [client, fetchChannels]);

  return (
    <div className="flex flex-col w-full h-full p-2 space-y-1 overflow-y-auto custom-scrollbar">
      {channels.map(c => {
        const members = Object.values(c.state.members || {}) as any[];
        const otherMember = members.find((m: any) => m.user?.id !== client.userID)?.user;
        const name = c.data?.name || otherMember?.name || "Conversation";
        const image = c.data?.image || otherMember?.image;
        const unread = c.state.unreadCount || 0;
        const isActive = activeChannel?.cid === c.cid;
        const lastMessage = c.state.messages[c.state.messages.length - 1]?.text || "No messages yet";

        return (
          <button
            key={c.cid}
            onClick={() => {
              setActiveChannel(c);
              onClose();
            }}
            className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${
              isActive ? 'bg-brand-50 border border-brand-200' : 'bg-white hover:bg-gray-50 border border-transparent hover:border-gray-100'
            }`}
          >
            <div className="relative shrink-0 w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center overflow-hidden border border-brand-200">
              {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-brand-600 font-bold text-lg">{name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-0.5">
                <p className={`text-sm truncate pr-2 ${isActive ? 'font-bold text-brand-700' : 'font-semibold text-gray-900'}`}>
                  {name}
                </p>
                {unread > 0 && (
                  <span className="shrink-0 bg-brand-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">
                {lastMessage}
              </p>
            </div>
          </button>
        );
      })}
      {channels.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 font-medium">No conversations yet.</p>
        </div>
      )}
    </div>
  );
};

const ChatLayout = ({ filters, sort }: { filters: any, sort: any }) => {
  const { channel, setActiveChannel, client } = useChatContext();
  const [isMobileListOpen, setIsMobileListOpen] = useState(!channel);

  useEffect(() => {
    if (channel) {
      setIsMobileListOpen(false);
    }
  }, [channel]);

  return (
    <div className="flex w-full h-full relative">
      {/* Desktop Sidebar (Uses standard Stream component) */}
      <div className="hidden md:block w-80 h-full border-r border-gray-200 shrink-0 bg-white">
        <div className="flex-1 overflow-y-auto h-full">
          <ChannelList 
            filters={filters} 
            sort={sort}
            options={{ limit: 30 }}
            setActiveChannelOnMount={false}
            Paginator={(props: any) => <>{props.children}</>}
          />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileListOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileListOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div 
        className={`
          md:hidden
          fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white flex flex-col shrink-0 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-gray-200
          ${isMobileListOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <span className="font-bold text-gray-900 text-lg">Chats</span>
          <button onClick={() => setIsMobileListOpen(false)} className="text-gray-500 hover:text-gray-700 bg-gray-200 p-1.5 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="flex-1 min-h-0 relative bg-white">
           <CustomMobileChannelList filters={filters} sort={sort} onClose={() => setIsMobileListOpen(false)} client={client} />
        </div>
      </div>

      {/* Main Channel Area */}
      <div className="flex-1 h-full flex flex-col min-w-0 bg-white relative w-full">
        <Channel>
          <Window>
            {/* Mobile Top Bar to Open Drawer */}
            <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-100 p-3 shadow-sm shrink-0 z-10">
              <span className="font-bold text-gray-800">{channel ? "Active Chat" : "Select a Conversation"}</span>
              <button 
                onClick={() => setIsMobileListOpen(true)}
                className="px-3 py-1.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm transition-colors flex items-center text-sm font-semibold border border-gray-200"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                Chats
              </button>
            </div>
            <ChannelHeader />
            <MessageList />
            <MessageComposer />
          </Window>
        </Channel>
      </div>
    </div>
  );
};

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
          <ChatLayout filters={filters} sort={sort} />
        </Chat>
      </main>
    </div>
  );
}
