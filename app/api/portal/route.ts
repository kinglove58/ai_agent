import { auth } from "@/app/lib/auth";
import { polarClient } from "@/app/lib/polar";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get customer
    const customer = await polarClient.customers.getStateExternal({
      externalId: session.user.id,
    });

    // Create customer portal session
    const portal = await polarClient.customerSessions.create({
      customerId: customer.id,
    } as any);

    return NextResponse.json({
      url: portal.customerPortalUrl,
      sessionId: portal.id,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to create customer portal",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
