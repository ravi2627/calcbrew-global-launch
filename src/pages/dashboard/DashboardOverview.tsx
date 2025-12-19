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
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileDown,
} from "lucide-react";

const DashboardOverview = () => {
  const { user, profile, isPro } = useAuth();
  const { history } = useCalculationHistory();
  const { saved } = useSavedCalculations();
  const { shared } = useSharedCalculations();

  const userName = profile?.full_name || user?.email?.split("@")[0] || "there";

  // Quick access calculators
  const quickCalculators = [
    { name: "Mortgage", href: "/calculators/finance/mortgage-calculator", icon: "🏠" },
    { name: "EMI", href: "/calculators/finance/emi-calculator", icon: "💳" },
    { name: "Profit Margin", href: "/calculators/business/profit-margin-calculator", icon: "📊" },
    { name: "Square Footage", href: "/calculators/home-construction/square-footage-calculator", icon: "📐" },
    { name: "BMI", href: "/calculators/health-fitness/bmi-calculator", icon: "💪" },
    { name: "Loan", href: "/calculators/finance/loan-calculator", icon: "💰" },
  ];

  // Activity stats for Pro users
  const activityStats = isPro ? [
    { label: "Total Calculations", value: history.length, icon: Calculator },
    { label: "Saved", value: saved.length, icon: Bookmark },
    { label: "Shared", value: shared.length, icon: Share2 },
  ] : null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Welcome Section - Clean and friendly */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back, {userName}
        </h1>
        <p className="text-muted-foreground">
          Quickly access your calculators and recent activity
        </p>
      </div>

      {/* Quick Access Calculators - Primary value */}
      <section>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickCalculators.map((calc) => (
            <Link key={calc.href} to={calc.href}>
              <Card className="card-hover h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-2xl">{calc.icon}</span>
                  <span className="font-medium text-sm">{calc.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <Link to="/calculators" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-4">
          View all calculators
          <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      {/* Activity Stats - For Pro users */}
      {isPro && activityStats && (
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Your Activity
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {activityStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recent Calculations - Show for Pro */}
      {isPro && history.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Recent Calculations
            </h2>
            <Link to="/dashboard/history" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {history.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm capitalize">
                        {item.calculator_name || item.calculator_type.replace(/-/g, " ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Pro Features Preview - For free users, subtle and contextual */}
      {!isPro && (
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Pro Features
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <Bookmark className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Save Calculations</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  Pro
                </Badge>
              </CardContent>
            </Card>
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <Share2 className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Share Results</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  Pro
                </Badge>
              </CardContent>
            </Card>
            <Card className="border-dashed">
              <CardContent className="p-4 text-center">
                <FileDown className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Export to PDF</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  Pro
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Empty state for Pro users with no history */}
      {isPro && history.length === 0 && (
        <section>
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <TrendingUp className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-1">No calculations yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start using calculators to build your history
              </p>
              <Button asChild>
                <Link to="/calculators">Browse Calculators</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Upgrade CTA - Soft, at the bottom, optional feeling */}
      {!isPro && (
        <section className="pt-4">
          <Card className="bg-muted/30 border-muted">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Enjoying CalcBrew?</p>
                    <p className="text-sm text-muted-foreground">
                      Pro unlocks saving, sharing & exports.
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild className="shrink-0">
                  <Link to="/pricing">Learn more</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};

export default DashboardOverview;
