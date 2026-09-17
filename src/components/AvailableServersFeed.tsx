"use client";

import { useState, useEffect, useTransition } from "react";
import { getAvailableServers } from "@/actions/live";
import { getCustomAvatarUrl } from "@/lib/avatar";
import MessageButton from "@/components/MessageButton";

interface LiveServer {
  id: string;
  clerkId: string;
  username: string;
  avatarUrl: string | null;
  serverExperience: string | null;
  latitude: number | null;
  longitude: number | null;
  lastLiveAt: Date | null;
  distance: number | null;
}

export default function AvailableServersFeed({
  initialServers,
  restaurantName,
}: {
  initialServers: LiveServer[];
  restaurantName?: string | null;
}) {
  const [servers, setServers] = useState<LiveServer[]>(initialServers);
  const [isPending, startTransition] = useTransition();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const refreshServers = () => {
    startTransition(async () => {
      try {
        const res = await getAvailableServers();
        setServers(res.servers as LiveServer[]);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to refresh live servers", err);
      }
    });
  };

  // Poll for updates every 10 seconds to keep the live feed real-time
  useEffect(() => {
    const interval = setInterval(() => {
      refreshServers();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Live feed auto-updating</span>
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <span>Last checked {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
        </div>

        <button
          onClick={refreshServers}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-50 self-start sm:self-auto"
        >
          <svg className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isPending ? "Refreshing..." : "Refresh Feed"}
        </button>
      </div>

      {servers.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No servers are currently live</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
            When nearby servers click &ldquo;Go Live&rdquo; on their dashboard, they will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {servers.map((server) => {
            const avatar = server.avatarUrl || getCustomAvatarUrl(server.username);
            return (
              <div
                key={server.id}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-900 p-6 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={avatar}
                      alt={server.username}
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white text-lg block leading-tight">
                          {server.username}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                          Live Now
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 font-medium">
                        {server.distance !== null ? (
                          <>
                            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{server.distance.toFixed(1)} miles away</span>
                          </>
                        ) : (
                          <span className="text-gray-400">Location distance unavailable</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <MessageButton targetUserId={server.clerkId} />
                </div>

                <div className="space-y-1.5 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Server Experience
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">
                    {server.serverExperience || "No experience details provided."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
