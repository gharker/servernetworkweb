import { useState, useEffect } from 'react';
import { getStreamToken } from '@/actions/stream';
import { useAuth } from '@clerk/nextjs';
import { StreamChat } from 'stream-chat';

export function useStream() {
  const { userId } = useAuth();
  const [client, setClient] = useState<StreamChat | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let didUserConnectInterrupt = false;
    let chatClient: StreamChat | null = null;
    let eventHandler: ((event: any) => void) | null = null;

    async function initChat() {
      if (!userId) return;

      chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

      try {
        // Only connect if not already connected to this user
        if (chatClient.userID === userId) {
          setClient(chatClient);
          setUnreadCount(chatClient.user?.total_unread_count || 0);
        } else {
          // If connected to a different user, disconnect first
          if (chatClient.userID) {
            await chatClient.disconnectUser();
          }

          const { token } = await getStreamToken();

          if (didUserConnectInterrupt) return;

          await chatClient.connectUser(
            { id: userId },
            token
          );

          if (didUserConnectInterrupt) {
            chatClient.disconnectUser();
            return;
          }

          setClient(chatClient);
          setUnreadCount(chatClient.user?.total_unread_count || 0);
        }

        eventHandler = (event: any) => {
          if (event.total_unread_count !== undefined) {
            setUnreadCount(event.total_unread_count);
          }
        };

        chatClient.on(eventHandler);
      } catch (error) {
        console.error("Error connecting Stream Chat:", error);
      }
    }

    initChat();

    return () => {
      didUserConnectInterrupt = true;
      if (chatClient) {
        if (eventHandler) {
          chatClient.off(eventHandler);
        }
        // Don't disconnect here in strict mode to prevent dropping the connection too aggressively,
        // unless we really want to. Disconnecting in cleanup can cause issues in React 18 strict mode
        // where components mount/unmount quickly. It's often better to just let getInstance return the
        // connected instance. However, if the user changes, we handle it above by checking chatClient.userID.
        setClient(null);
      }
    };
  }, [userId]);

  return { client, unreadCount };
}
