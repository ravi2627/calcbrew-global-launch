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
  LogOut,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard", proOnly: false },
  { icon: History, label: "History", href: "/dashboard/history", proOnly: true },
  { icon: Bookmark, label: "Saved", href: "/dashboard/saved", proOnly: true },
  { icon: Share2, label: "Shared", href: "/dashboard/shared", proOnly: true },
  { icon: FileDown, label: "Exports", href: "/dashboard/exports", proOnly: true },
];

const settingsItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings", proOnly: false },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing", proOnly: false },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const { user, isPro, signOut } = useAuth();

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <aside className="flex h-full w-60 flex-col border-r bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <span className="font-semibold">CalcBrew</span>
        </Link>
      </div>

      {/* User Info - Minimal */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground">
              {isPro ? "Pro Plan" : "Free Plan"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            const showProBadge = item.proOnly && !isPro;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {showProBadge && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                    Pro
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        {/* Settings Section */}
        <div className="mt-6 pt-4 border-t border-sidebar-border">
          <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Account
          </p>
          <div className="space-y-1">
            {settingsItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Upgrade CTA for Free Users - Soft, at bottom */}
      {!isPro && (
        <div className="border-t p-3">
          <Link to="/pricing">
            <div className="rounded-lg bg-muted/50 p-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">Upgrade to Pro</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Save, share & export
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* Logout - Clean */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
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
