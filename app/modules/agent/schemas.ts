import { z } from "zod";

export const AgentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instruction: z.string().max(500),
});

export const agentsUpdateSchema = AgentsInsertSchema.extend({
  id: z.string().min(1, { message: "ID is required" }),
});
