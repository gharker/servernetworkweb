import { inngest } from "./client";
import { StreamChat } from "stream-chat";

export const deleteInactiveChats = inngest.createFunction(
  { id: "delete-inactive-chats" },
  { cron: "0 * * * *" }, // Run at the top of every hour
  async ({ step }) => {
    const streamClient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      process.env.STREAM_API_SECRET!
    );

    // Calculate 48 hours ago
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const deletedChannelsCount = await step.run("query-and-delete-channels", async () => {
      // Find channels where the last message was older than 48 hours
      const channels = await streamClient.queryChannels(
        { 
          type: "messaging", 
          last_message_at: { $lt: twoDaysAgo.toISOString() } 
        },
        { last_message_at: -1 },
        { limit: 100 }
      );

      let deletedCount = 0;

      for (const channel of channels) {
        try {
          await channel.delete();
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete channel ${channel.id}`, error);
        }
      }

      return deletedCount;
    });

    return { message: `Successfully deleted ${deletedChannelsCount} inactive channels.` };
  }
);
