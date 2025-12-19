import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ruler, DollarSign, Calculator, PaintBucket, Scale, Percent } from "lucide-react";

const featuredCalculators = [
  {
    title: "Square Footage Calculator",
    description: "Calculate area for flooring, painting, and construction projects",
    icon: Ruler,
    href: "/calculators/home-construction/square-footage-calculator",
  },
  {
    title: "ROI Calculator",
    description: "Measure return on investment for business decisions",
    icon: DollarSign,
    href: "/calculators/business/roi-calculator",
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate monthly payments and total interest",
    icon: Calculator,
    href: "/calculators/finance/mortgage-calculator",
  },
  {
    title: "Paint Calculator",
    description: "Estimate paint needed for walls, ceilings, and rooms",
    icon: PaintBucket,
    href: "/calculators/home-construction/paint-calculator",
  },
  {
    title: "Profit Margin Calculator",
    description: "Calculate gross and net profit margins for your business",
    icon: Scale,
    href: "/calculators/business/profit-margin-calculator",
  },
  {
    title: "EMI Calculator",
    description: "Calculate equated monthly installments for loans",
    icon: Percent,
    href: "/calculators/finance/emi-calculator",
  },
];

const FeaturedCalculators = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Featured Calculators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most popular calculators, trusted by thousands of users worldwide 
            for accurate, instant results.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCalculators.map((calc) => (
            <div
              key={calc.title}
              className="rounded-xl border border-border bg-card p-6 shadow-soft card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <calc.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {calc.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {calc.description}
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to={calc.href}>Open Calculator</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <Link to="/calculators">View All Calculators</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculators;
