"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { plans, type PlanType } from "@/types/stripe"
import { createCheckoutSession } from "@/app/actions/stripe"

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<PlanType | null>(null)

  const handleSubscribe = async (planId: PlanType) => {
    try {
      setIsLoading(planId)
      const { url } = await createCheckoutSession(planId)
      window.location.href = url
    } catch (error) {
      console.error("Error subscribing to plan:", error)
      setIsLoading(null)
    }
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that's right for you and start processing your images today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.popular ? "border-primary relative" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 left-0 px-3 py-1 text-xs font-medium text-center text-primary-foreground bg-primary rounded-t-lg">
                Most Popular
              </div>
            )}
            <CardHeader className={plan.popular ? "pt-8" : ""}>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="flex items-baseline mt-2">
                <span className="text-3xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="ml-1 text-sm text-muted-foreground">/month</span>}
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className={`flex items-center ${!feature.included ? "text-muted-foreground" : ""}`}>
                    <Check
                      className={`h-4 w-4 mr-2 flex-shrink-0 ${!feature.included ? "text-muted-foreground" : "text-primary"}`}
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading === plan.id}
              >
                {isLoading === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : plan.id === "free" ? (
                  "Get started"
                ) : plan.id === "enterprise" ? (
                  "Contact sales"
                ) : (
                  "Subscribe now"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Need a custom plan?{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Contact us
          </a>{" "}
          for more information.
        </p>
      </div>
    </div>
  )
}

