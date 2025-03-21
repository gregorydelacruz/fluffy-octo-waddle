"use server"
import stripe from "@/lib/stripe"
import type { PlanType } from "@/types/stripe"

export async function createCheckoutSession(planId: PlanType) {
  try {
    // Free plan doesn't need checkout
    if (planId === "free") {
      // Handle free plan signup
      // This could redirect to a registration page or dashboard
      return { url: "/dashboard" }
    }

    // Get the price ID based on the plan
    let priceId
    if (planId === "pro") {
      priceId = "price_1234567890" // Replace with your actual Stripe price ID
    } else if (planId === "enterprise") {
      priceId = "price_0987654321" // Replace with your actual Stripe price ID
    } else {
      throw new Error("Invalid plan selected")
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `https://development-api.v0-pricing-page-design-two.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://development-api.v0-pricing-page-design-two.vercel.app/pricing`,
    })

    if (!session.url) {
      throw new Error("Failed to create checkout session")
    }

    return { url: session.url }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}

