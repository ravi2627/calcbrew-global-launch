import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCalculationHistory, useSavedCalculations, useSharedCalculations } from "@/hooks/useCalculationHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  History,
  Bookmark,
  Share2,
  Crown,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

const DashboardOverview = () => {
  const { user, isPro } = useAuth();
  const { history } = useCalculationHistory();
  const { saved } = useSavedCalculations();
  const { shared } = useSharedCalculations();

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  const stats = [
    {
      label: "Total Calculations",
      value: isPro ? history.length : "—",
      icon: Calculator,
      locked: !isPro,
    },
    {
      label: "Saved Calculations",
      value: isPro ? saved.length : "—",
      icon: Bookmark,
      locked: !isPro,
    },
    {
      label: "Shared Links",
      value: isPro ? shared.length : "—",
      icon: Share2,
      locked: !isPro,
    },
  ];

  const proFeatures = [
    "Unlimited calculation history",
    "Save and organize calculations",
    "Share results with unique links",
    "Export to PDF & Excel",
    "No advertisements",
    "Priority support",
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your CalcBrew activity
          </p>
        </div>
        {isPro ? (
          <Badge className="w-fit bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-white">
            <Crown className="mr-2 h-4 w-4" />
            Pro Member
          </Badge>
        ) : (
          <Link to="/pricing">
            <Button>
              <Crown className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              {stat.locked ? (
                <Lock className="h-4 w-4 text-muted-foreground" />
              ) : (
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.locked ? (
                  <span className="text-muted-foreground">Locked</span>
                ) : (
                  stat.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Activity or Upgrade CTA */}
        {isPro ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Calculations
              </CardTitle>
              <CardDescription>Your latest calculation activity</CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium capitalize">
                          {item.calculator_type.replace(/-/g, " ")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                  <Link to="/dashboard/history">
                    <Button variant="outline" className="w-full">
                      View All History
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Calculator className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    No calculations yet. Start using calculators to see your history!
                  </p>
                  <Link to="/calculators">
                    <Button className="mt-4">
                      Browse Calculators
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Upgrade to Pro
              </CardTitle>
              <CardDescription>
                Unlock all premium features and take your calculations to the next level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Crown className="h-4 w-4 text-amber-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/pricing">
                <Button className="mt-6 w-full">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Quick Access
            </CardTitle>
            <CardDescription>Jump to your favorite calculators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link to="/calculators/finance/mortgage-calculator">
                <Button variant="outline" className="w-full justify-start">
                  Mortgage Calculator
                </Button>
              </Link>
              <Link to="/calculators/finance/emi-calculator">
                <Button variant="outline" className="w-full justify-start">
                  EMI Calculator
                </Button>
              </Link>
              <Link to="/calculators/business/profit-margin-calculator">
                <Button variant="outline" className="w-full justify-start">
                  Profit Margin
                </Button>
              </Link>
              <Link to="/calculators/home-construction/square-footage-calculator">
                <Button variant="outline" className="w-full justify-start">
                  Square Footage
                </Button>
              </Link>
            </div>
            <Link to="/calculators">
              <Button variant="link" className="mt-4 w-full">
                View All Calculators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
