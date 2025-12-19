import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calculator,
  LogOut,
  Settings,
  User,
  Menu,
} from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const { user, isPro, signOut } = useAuth();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Logo (mobile only) */}
      <Link to="/" className="flex items-center gap-2 lg:hidden">
        <Calculator className="h-5 w-5 text-primary" />
        <span className="font-semibold">CalcBrew</span>
      </Link>

      {/* Spacer */}
      <div className="hidden lg:block" />

      {/* Right side */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="hidden sm:inline-block text-sm">
                {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
              </span>
              {isPro && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  Pro
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">
                {isPro ? "Pro Plan" : "Free Plan"}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/billing">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
