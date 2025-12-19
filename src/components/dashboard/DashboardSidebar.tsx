import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  History,
  Bookmark,
  Share2,
  FileDown,
  Settings,
  CreditCard,
  Calculator,
  Crown,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard", proOnly: false },
  { icon: History, label: "Calculation History", href: "/dashboard/history", proOnly: true },
  { icon: Bookmark, label: "Saved Calculations", href: "/dashboard/saved", proOnly: true },
  { icon: Share2, label: "Shared Links", href: "/dashboard/shared", proOnly: true },
  { icon: FileDown, label: "Exports", href: "/dashboard/exports", proOnly: true },
  { icon: Settings, label: "Account Settings", href: "/dashboard/settings", proOnly: false },
  { icon: CreditCard, label: "Plan & Billing", href: "/dashboard/billing", proOnly: false },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, isPro, signOut } = useAuth();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Calculator className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">CalcBrew</span>
      </div>

      {/* User Info */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">
              {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
            </p>
            <div className="flex items-center gap-2">
              {isPro ? (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Crown className="mr-1 h-3 w-3" />
                  Pro
                </Badge>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          const isLocked = item.proOnly && !isPro;

          return (
            <Link
              key={item.href}
              to={isLocked ? "/pricing" : item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                isLocked && "opacity-60"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {isLocked && (
                <Crown className="h-3 w-3 text-amber-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA for Free Users */}
      {!isPro && (
        <div className="border-t p-4">
          <Link to="/pricing">
            <div className="rounded-lg bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                <span className="font-semibold">Upgrade to Pro</span>
              </div>
              <p className="mt-1 text-xs opacity-90">
                Unlock all features, no ads, save & export
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
