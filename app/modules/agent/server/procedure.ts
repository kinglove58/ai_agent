import { db } from "@/app/db";
import { agents } from "@/app/db/schema";
import { baseProcedure, createTRPCRouter } from "@/app/trpc/init";

export const agentRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),
});
