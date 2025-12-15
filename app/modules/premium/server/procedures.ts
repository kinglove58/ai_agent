import { db } from "@/app/db";
import { agents, meetings } from "@/app/db/schema";
import { polarClient } from "@/app/lib/polar";
import { createTRPCRouter, protectedProcedure } from "@/app/trpc/init";
import { count, eq } from "drizzle-orm";

export const premiumRouter = createTRPCRouter({
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });
    const subscription = customer.activeSubscriptions[0];
    if (!subscription) {
      return null;
    }
    const product = await polarClient.products.get({
      id: subscription.productId,
    });
    return product;
  }),
  getProduct: protectedProcedure.query(async ({ ctx }) => {
    const product = await polarClient.products.list({
      isArchived: false,
      isRecurring: true,
      sorting: ["price_amount"],
    });
    return product.result.items;
  }),
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });
    const subscription = customer.activeSubscriptions[0];
    if (subscription) {
      return null;
    }
    const [userMeetings] = await db
      .select({ count: count(meetings.id) })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id));
    const [userAgents] = await db
      .select({ count: count(agents.id) })
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));
    return {
      meetingsCount: userMeetings.count,
      agentsCount: userAgents.count,
    };
  }),
});
