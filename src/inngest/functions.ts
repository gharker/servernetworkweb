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
      // Find channels that are abandoned (no recent messages) or empty (never used)
      const channels = await streamClient.queryChannels(
        { 
          type: "messaging", 
          $or: [
            { last_message_at: { $lt: twoDaysAgo.toISOString() } },
            { 
              last_message_at: { $exists: false },
              created_at: { $lt: twoDaysAgo.toISOString() }
            }
          ]
        },
        { created_at: 1 }, // Process oldest inactive channels first
        { limit: 100 }
      );

      let deletedCount = 0;

      for (const channel of channels) {
        try {
          // Perform a hard delete to permanently wipe the channel and its data
          await channel.delete({ hard_delete: true });
          deletedCount++;
        } catch (error) {
          console.error(`Failed to hard delete channel ${channel.id}:`, error);
        }
      }

      return deletedCount;
    });

    return { message: `Successfully deleted ${deletedChannelsCount} inactive channels.` };
  }
);
