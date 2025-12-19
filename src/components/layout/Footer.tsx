import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    calculators: [
      { href: "/calculators/home-construction", label: "Home & Construction" },
      { href: "/calculators/finance", label: "Finance" },
      { href: "/calculators/business", label: "Business" },
      { href: "/calculators/health-fitness", label: "Health & Fitness" },
      { href: "/calculators/conversion", label: "Conversion Tools" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/pricing", label: "Pricing" },
    ],
    legal: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  };

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Calculator className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>CalcBrew</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Smart, accurate calculators for home, business, and everyday decisions — built for global users.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Calculators</h3>
            <ul className="space-y-3">
              {footerLinks.calculators.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/calculators"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View All Calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CalcBrew. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built for accuracy. Designed for everyone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
