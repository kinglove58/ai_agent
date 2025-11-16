import { z } from "zod";
import { AgentsInsertSchema } from "../agent/schemas";

export const MeetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "Agent is required" }),
});

export const meetingsUpdateSchema = MeetingsInsertSchema.extend({
  id: z.string().min(1, { message: "ID is required" }),
});
