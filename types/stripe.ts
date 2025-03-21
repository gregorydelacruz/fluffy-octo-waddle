export type PlanType = "free" | "pro" | "enterprise"

export interface PlanDetails {
  id: PlanType
  name: string
  description: string
  price: number
  priceId: string // Stripe price ID
  features: {
    text: string
    included: boolean
  }[]
  popular?: boolean
}

export const plans: PlanDetails[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out Vision's features.",
    price: 0,
    priceId: "", // Free plan doesn't need a Stripe price ID
    features: [
      { text: "Process up to 25 images per month", included: true },
      { text: "Basic image categorization", included: true },
      { text: "Download processed images", included: true },
      { text: "Email support", included: true },
      { text: "Batch processing", included: false },
      { text: "Custom categories", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals who need more power.",
    price: 29,
    priceId: "price_1234567890", // Replace with your actual Stripe price ID
    features: [
      { text: "Process up to 10,000 images per month", included: true },
      { text: "Advanced image categorization", included: true },
      { text: "Download processed images", included: true },
      { text: "Email support", included: true },
      { text: "Batch processing", included: true },
      { text: "Custom categories", included: true },
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams that need it all.",
    price: 99,
    priceId: "price_0987654321", // Replace with your actual Stripe price ID
    features: [
      { text: "Process up to 100,000 images per month", included: true },
      { text: "Advanced image categorization", included: true },
      { text: "Download processed images", included: true },
      { text: "Priority support", included: true },
      { text: "Batch processing", included: true },
      { text: "Custom categories", included: true },
    ],
  },
]

