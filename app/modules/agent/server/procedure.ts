import { db } from "@/app/db";
import { agents } from "@/app/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/app/trpc/init";
import { AgentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentRouter = createTRPCRouter({
  // TODO: change to protectedProcedure if needed
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          // TODO: meetingCount is hardcoded for now, replace with real count later
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(eq(agents.id, input.id));
      // .limit(1);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      return existingAgent;
    }),
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({
        ...getTableColumns(agents),
        meetingCount: sql<number>`5`,
      })
      .from(agents);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  }),
  create: protectedProcedure
    .input(AgentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createAgent] = await db
        .insert(agents)
        .values({
          ...(input as any),
          userId: ctx.auth.user.id,
        })
        .returning();
      return createAgent;
    }),
});
