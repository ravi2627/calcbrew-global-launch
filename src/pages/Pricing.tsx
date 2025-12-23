import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, X, Crown, Zap, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    email?: string;
    name?: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Essential calculators for everyday use",
    features: [
      { name: "Access to 30+ calculators", included: true },
      { name: "Unlimited calculations", included: true },
      { name: "Mobile-friendly interface", included: true },
      { name: "No registration required", included: true },
      { name: "Save calculation history", included: false },
      { name: "Export reports (PDF/CSV)", included: false },
      { name: "Advanced pro calculators", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    href: "/calculators",
    popular: false,
    planKey: "free" as const,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    yearlyPrice: "₹1,499",
    yearlyPeriod: "/year",
    yearlySavings: "Save ₹889/year",
    description: "Advanced tools for professionals and businesses",
    features: [
      { name: "Access to 30+ calculators", included: true },
      { name: "Unlimited calculations", included: true },
      { name: "Mobile-friendly interface", included: true },
      { name: "No registration required", included: true },
      { name: "Save calculation history", included: true },
      { name: "Export reports (PDF/CSV)", included: true },
      { name: "Advanced pro calculators", included: true },
      { name: "Priority support", included: true },
    ],
    cta: "Upgrade to Pro",
    href: "#",
    popular: true,
    planKey: "pro" as const,
  },
];

const Pricing = () => {
  const { user, isPro, session, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<"monthly" | "yearly" | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async (planType: "monthly" | "yearly") => {
    if (!user || !session) {
      toast({
        title: "Login Required",
        description: "Please log in to upgrade to Pro.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/pricing" } });
      return;
    }

    if (isPro) {
      toast({
        title: "Already Pro",
        description: "You already have an active Pro subscription.",
      });
      return;
    }

    setIsLoading(planType);

    try {
      const { data, error } = await supabase.functions.invoke("razorpay-checkout", {
        body: { plan: planType },
      });

      if (error) {
        console.error("Checkout error:", error);
        throw new Error(error.message || "Failed to create order");
      }

      if (!data?.orderId) {
        throw new Error("No order ID received");
      }

      // Open Razorpay checkout
      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "CalcBrew",
        description: data.description,
        order_id: data.orderId,
        prefill: {
          email: data.prefill?.email,
          name: data.prefill?.name,
        },
        theme: {
          color: "#6366f1",
        },
        handler: async (response: RazorpayResponse) => {
          console.log("Payment successful:", response);
          toast({
            title: "Payment Successful!",
            description: "Your Pro subscription is now active. Refreshing...",
          });
          
          // Wait a moment for webhook to process, then refresh profile
          setTimeout(async () => {
            await refreshProfile();
            navigate("/dashboard");
          }, 2000);
        },
        modal: {
          ondismiss: () => {
            setIsLoading(null);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Pricing - CalcBrew | Free & Pro Calculator Plans</title>
        <meta
          name="description"
          content="Choose CalcBrew Free for essential calculators or upgrade to Pro for advanced features, saved history, and exportable reports."
        />
        <link rel="canonical" href="https://calcbrew.com/pricing" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              Simple, transparent pricing
            </div>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free with essential calculators or upgrade to Pro for 
              advanced features designed for professionals and businesses.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 p-1 rounded-full bg-muted">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span className="ml-2 text-xs text-green-600 font-semibold">Save 37%</span>
              </button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? "border-primary shadow-elevated"
                    : "border-border shadow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      <Crown className="h-3.5 w-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-foreground">
                      {plan.planKey === "pro" && billingCycle === "yearly" 
                        ? plan.yearlyPrice 
                        : plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.planKey === "pro" && billingCycle === "yearly" 
                        ? plan.yearlyPeriod 
                        : plan.period}
                    </span>
                  </div>
                  {plan.planKey === "pro" && billingCycle === "yearly" && (
                    <p className="text-green-600 text-sm font-medium mt-1">
                      {plan.yearlySavings}
                    </p>
                  )}
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.planKey === "free" ? (
                  <Button
                    className="w-full"
                    size="lg"
                    variant="outline"
                    asChild
                  >
                    <Link to={plan.href}>{plan.cta}</Link>
                  </Button>
                ) : isPro ? (
                  <Button
                    className="w-full"
                    size="lg"
                    variant="default"
                    disabled
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    size="lg"
                    variant="default"
                    onClick={() => handleCheckout(billingCycle)}
                    disabled={isLoading !== null}
                  >
                    {isLoading === billingCycle ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Frequently Asked Questions About Pricing
            </h2>
            <div className="max-w-2xl mx-auto space-y-6 text-left">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Is the free plan really free forever?
                </h3>
                <p className="text-muted-foreground">
                  Yes! Our free plan gives you full access to 30+ calculators with 
                  unlimited calculations, no credit card required, forever.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground">
                  We accept all major payment methods through Razorpay including 
                  UPI, credit/debit cards, net banking, and wallets.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Can I cancel Pro anytime?
                </h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel anytime with no questions asked. Your Pro 
                  access will continue until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Is my payment secure?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely. All payments are processed securely through Razorpay, 
                  a PCI-DSS compliant payment gateway trusted by millions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
