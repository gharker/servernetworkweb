import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { deleteInactiveChats } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    deleteInactiveChats,
  ],
});
