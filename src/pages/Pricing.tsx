import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, X, Crown, Zap } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
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
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
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
    cta: "Coming Soon",
    href: "#",
    popular: true,
    comingSoon: true,
  },
];

const Pricing = () => {
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free with essential calculators or upgrade to Pro for 
              advanced features designed for professionals and businesses.
            </p>
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
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
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

                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  disabled={plan.comingSoon}
                  asChild={!plan.comingSoon}
                >
                  {plan.comingSoon ? (
                    <span>{plan.cta}</span>
                  ) : (
                    <Link to={plan.href}>{plan.cta}</Link>
                  )}
                </Button>
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
                  When will Pro be available?
                </h3>
                <p className="text-muted-foreground">
                  CalcBrew Pro is coming soon! Sign up for updates to be notified 
                  when advanced features launch.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Can I cancel Pro anytime?
                </h3>
                <p className="text-muted-foreground">
                  When Pro launches, you'll be able to cancel anytime with no 
                  questions asked. No long-term commitments.
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
