import { db } from "@/app/db";
import { agents } from "@/app/db/schema";
import { baseProcedure, createTRPCRouter } from "@/app/trpc/init";
import { TRPCError } from "@trpc/server";

export const agentRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  }),
});
