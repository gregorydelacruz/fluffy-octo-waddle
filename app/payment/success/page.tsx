import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="container flex flex-col items-center justify-center max-w-md py-20 mx-auto text-center">
      <CheckCircle className="w-16 h-16 mb-6 text-green-500" />
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Payment Successful!</h1>
      <p className="mt-4 text-muted-foreground">
        Thank you for your subscription. Your account has been upgraded and you now have access to all the features of
        your new plan.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

