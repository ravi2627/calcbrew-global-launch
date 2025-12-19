import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Crown,
  Check,
  Sparkles,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const DashboardBilling = () => {
  const { user, isPro, subscription, refreshProfile } = useAuth();

  const freeFeatures = [
    "Basic calculators",
    "Standard accuracy",
    "Ads supported",
  ];

  const proFeatures = [
    "All calculators unlocked",
    "Unlimited calculation history",
    "Save & organize calculations",
    "Share with unique links",
    "Export to PDF & Excel",
    "No advertisements",
    "Priority support",
  ];

  // For demo purposes - toggle plan
  const togglePlan = async () => {
    if (!user) return;
    
    const newPlan = isPro ? 'free' : 'pro';
    const { error } = await supabase
      .from('subscriptions')
      .update({ plan: newPlan })
      .eq('user_id', user.id);
    
    if (error) {
      toast.error("Failed to update plan");
      return;
    }
    
    await refreshProfile();
    toast.success(`Switched to ${newPlan === 'pro' ? 'Pro' : 'Free'} plan`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Plan & Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isPro ? (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-lg text-white">
                  <Crown className="mr-2 h-5 w-5" />
                  Pro
                </Badge>
              ) : (
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  Free
                </Badge>
              )}
              <div>
                <p className="font-medium">
                  {isPro ? "CalcBrew Pro" : "CalcBrew Free"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPro
                    ? "Full access to all features"
                    : "Basic calculator access"}
                </p>
              </div>
            </div>
            {!isPro && (
              <Link to="/pricing">
                <Button>
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              </Link>
            )}
          </div>

          {/* Demo toggle for testing */}
          <div className="mt-4 rounded-lg border border-dashed p-4">
            <p className="mb-2 text-sm text-muted-foreground">
              Demo Mode: Toggle plan status for testing
            </p>
            <Button variant="outline" size="sm" onClick={togglePlan}>
              {isPro ? "Switch to Free" : "Switch to Pro"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Free Plan */}
        <Card className={!isPro ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>For casual users</CardDescription>
            <div className="text-3xl font-bold">
              $0<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {!isPro && (
              <Badge variant="outline" className="mt-4">
                Current Plan
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className={isPro ? "border-primary" : "border-amber-500/50"}>
          <CardHeader className="relative">
            {!isPro && (
              <Badge className="absolute right-4 top-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <Sparkles className="mr-1 h-3 w-3" />
                Recommended
              </Badge>
            )}
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Pro
            </CardTitle>
            <CardDescription>For power users</CardDescription>
            <div className="text-3xl font-bold">
              $9<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {isPro ? (
              <Badge variant="outline" className="mt-4">
                Current Plan
              </Badge>
            ) : (
              <Link to="/pricing">
                <Button className="mt-4 w-full">Upgrade Now</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Method */}
      {isPro && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
            <CardDescription>
              Manage your payment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground">
                Payment integration coming soon. Your Pro status is currently for demonstration purposes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card>
        <CardContent className="flex items-start gap-4 pt-6">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">
              When payment integration is enabled, all transactions will be processed securely through Stripe.
              Your payment information is never stored on our servers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBilling;
