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
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format, formatDistanceToNow, isPast, differenceInDays } from "date-fns";

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

  // Calculate subscription status
  const getSubscriptionStatus = () => {
    if (!subscription) return null;
    
    const endDate = subscription.end_date ? new Date(subscription.end_date) : null;
    const startDate = new Date(subscription.start_date);
    const isExpired = endDate ? isPast(endDate) : false;
    const daysRemaining = endDate ? differenceInDays(endDate, new Date()) : null;
    
    return {
      status: subscription.status,
      plan: subscription.plan,
      startDate,
      endDate,
      isExpired,
      daysRemaining,
      isExpiringSoon: daysRemaining !== null && daysRemaining <= 7 && daysRemaining > 0,
    };
  };

  const subStatus = getSubscriptionStatus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Plan & Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Subscription Status Card */}
      {isPro && subStatus && (
        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Subscription Status
            </CardTitle>
            <CardDescription>
              Your current subscription details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Status */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  {subStatus.status === 'active' && !subStatus.isExpired ? (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Expired
                    </Badge>
                  )}
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Started On</p>
                <p className="font-medium">
                  {format(subStatus.startDate, "MMM dd, yyyy")}
                </p>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {subStatus.isExpired ? "Expired On" : "Expires On"}
                </p>
                {subStatus.endDate ? (
                  <div>
                    <p className="font-medium">
                      {format(subStatus.endDate, "MMM dd, yyyy")}
                    </p>
                    {!subStatus.isExpired && (
                      <p className={`text-sm ${subStatus.isExpiringSoon ? 'text-amber-600' : 'text-muted-foreground'}`}>
                        <Clock className="h-3 w-3 inline mr-1" />
                        {formatDistanceToNow(subStatus.endDate, { addSuffix: true })}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="font-medium text-muted-foreground">No expiry set</p>
                )}
              </div>
            </div>

            {/* Expiring Soon Warning */}
            {subStatus.isExpiringSoon && (
              <div className="mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-600">
                    Your subscription expires in {subStatus.daysRemaining} day{subStatus.daysRemaining !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Renew now to continue enjoying Pro features without interruption.
                  </p>
                  <Link to="/pricing">
                    <Button size="sm" className="mt-3">
                      Renew Subscription
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Expired Warning */}
            {subStatus.isExpired && (
              <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">
                    Your subscription has expired
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Renew your subscription to regain access to Pro features.
                  </p>
                  <Link to="/pricing">
                    <Button size="sm" className="mt-3">
                      Renew Now
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
              ₹0<span className="text-lg font-normal text-muted-foreground">/month</span>
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
              ₹199<span className="text-lg font-normal text-muted-foreground">/month</span>
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
                Payments are processed securely through Razorpay. To update your payment method, 
                renew your subscription from the pricing page.
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
              All transactions are processed securely through Razorpay, a PCI-DSS compliant payment gateway.
              Your payment information is never stored on our servers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardBilling;
