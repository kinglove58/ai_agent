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
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Creating customer portal for user:", session.user.id);

    // Get customer
    const customer = await polarClient.customers.getStateExternal({
      externalId: session.user.id,
    });

    console.log("Customer ID:", customer.id);

    // Create customer portal session
    const portal = await polarClient.customerSessions.create({
      customer_id: customer.id,
    });

    console.log("Portal session created:", portal.id);
    console.log("Portal URL:", portal.customer_portal_url);

    return NextResponse.json({
      url: portal.customer_portal_url,
      sessionId: portal.id,
    });
  } catch (error: any) {
    console.error("Portal creation failed:", error);
    console.error("Error details:", error.message);
    console.error("Error response:", error.response?.data);
    
    return NextResponse.json(
      { 
        error: "Failed to create customer portal",
        details: error.message 
      },
      { status: 500 }
    );
  }
}
