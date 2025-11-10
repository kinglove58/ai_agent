import { meetingsRouter } from "@/app/modules/meetings/server/procedures";
import { createTRPCRouter } from "../init";
import { agentRouter } from "@/app/modules/agent/server/procedure";
export const appRouter = createTRPCRouter({
  agents: agentRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
