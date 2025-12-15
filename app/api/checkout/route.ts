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

    // Get the request body
    const body = await req.json();
    const { productPriceId } = body;

    if (!productPriceId) {
      return NextResponse.json(
        { error: "Product price ID is required" },
        { status: 400 }
      );
    }

    console.log("Creating checkout for user:", session.user.id);
    console.log("Product price ID:", productPriceId);

    // Get or create customer
    let customer;
    try {
      customer = await polarClient.customers.getStateExternal({
        externalId: session.user.id,
      });
    } catch (error) {
      console.log("Customer not found, creating new customer");
      // Customer doesn't exist, create one
      customer = await polarClient.customers.create({
        email: session.user.email,
        externalId: session.user.id,
        name: session.user.name || undefined,
      });
    }

    console.log("Customer ID:", customer.id);

    // Create checkout session
    const checkout = await polarClient.checkouts.create({
      productPrice: productPriceId,
      customer_id: customer.id,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade?success=true`,
      allow_discount_codes: true,
    });

    console.log("Checkout created:", checkout.id);
    console.log("Checkout URL:", checkout.url);

    return NextResponse.json({
      url: checkout.url,
      checkoutId: checkout.id,
    });
  } catch (error: any) {
    console.error("Checkout creation failed:", error);
    console.error("Error details:", error.message);
    console.error("Error response:", error.response?.data);

    return NextResponse.json(
      {
        error: "Failed to create checkout",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
