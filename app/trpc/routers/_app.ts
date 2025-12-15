import { meetingsRouter } from "@/app/modules/meetings/server/procedures";
import { createTRPCRouter } from "../init";
import { agentRouter } from "@/app/modules/agent/server/procedure";
import { premiumRouter } from "@/app/modules/premium/server/procedures";
export const appRouter = createTRPCRouter({
  agents: agentRouter,
  meetings: meetingsRouter,
  premium: premiumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
