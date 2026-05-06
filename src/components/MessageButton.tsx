"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { createMessagingChannel } from "@/actions/stream";

export default function MessageButton({ targetUserId }: { targetUserId: string }) {
  const router = useRouter();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleMessage = async () => {
    if (!userId) return;

    // Prevent messaging yourself
    if (userId === targetUserId) {
      alert("You cannot message yourself.");
      return;
    }

    setLoading(true);

    try {
      // Create the 1-on-1 channel securely on the backend
      await createMessagingChannel(targetUserId);

      // Navigate to the messages page
      router.push(`/messages`);
    } catch (error) {
      console.error("Error creating chat channel", error);
      alert("Failed to start conversation.");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleMessage}
      disabled={loading || !userId || userId === targetUserId}
      className="bg-brand-50 hover:bg-brand-100 disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      )}
      {loading ? "Opening..." : "Message"}
    </button>
  );
}
