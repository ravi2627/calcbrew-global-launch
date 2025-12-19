import { Link } from "react-router-dom";
import { Calculator, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { href: "/calculators/home-construction", label: "Home & Construction" },
  { href: "/calculators/finance", label: "Finance" },
  { href: "/calculators/business", label: "Business" },
  { href: "/calculators/health-fitness", label: "Health & Fitness" },
  { href: "/calculators/time-date", label: "Time & Date" },
  { href: "/calculators/conversion", label: "Conversion Tools" },
  { href: "/calculators/utilities", label: "Utility Tools" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Calculator className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>CalcBrew</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/calculators"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Calculators
          </Link>
          
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Categories
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-background border border-border shadow-lg z-50">
              {categories.map((category) => (
                <DropdownMenuItem key={category.href} asChild>
                  <Link
                    to={category.href}
                    className="w-full cursor-pointer"
                  >
                    {category.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
            Login
          </Button>
          <Button asChild>
            <Link to="/pricing">Go Pro</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/calculators"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculators
            </Link>
            
            {/* Mobile Categories */}
            <div className="pl-4 border-l-2 border-border space-y-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Categories
              </span>
              {categories.map((category) => (
                <Link
                  key={category.href}
                  to={category.href}
                  className="block text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.label}
                </Link>
              ))}
            </div>

            <Link
              to="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" disabled className="justify-center">
                Login
              </Button>
              <Button asChild>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                  Go Pro
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
