import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Home,
  DollarSign,
  Briefcase,
  Heart,
  Clock,
  ArrowLeftRight,
  Wrench,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { AdSection } from "@/components/ads";

const categories = [
  {
    title: "Home & Construction",
    description: "Calculate materials, costs, and measurements for your projects",
    icon: Home,
    href: "/calculators/home-construction",
    calculatorCount: 6,
  },
  {
    title: "Finance",
    description: "Loans, investments, mortgages, and savings calculators",
    icon: DollarSign,
    href: "/calculators/finance",
    calculatorCount: 8,
  },
  {
    title: "Business",
    description: "ROI, payroll, profit margins, and business metrics",
    icon: Briefcase,
    href: "/calculators/business",
    calculatorCount: 5,
  },
  {
    title: "Health & Fitness",
    description: "BMI, calories, macros, and fitness tracking tools",
    icon: Heart,
    href: "/calculators/health-fitness",
    calculatorCount: 4,
  },
  {
    title: "Time & Date",
    description: "Age, duration, time zones, and date calculations",
    icon: Clock,
    href: "/calculators/time-date",
    calculatorCount: 4,
  },
  {
    title: "Conversion Tools",
    description: "Units, currency, temperature, and measurement conversions",
    icon: ArrowLeftRight,
    href: "/calculators/conversion",
    calculatorCount: 5,
  },
  {
    title: "Utility Tools",
    description: "Percentages, random generators, and everyday calculations",
    icon: Wrench,
    href: "/calculators/utilities",
    calculatorCount: 4,
  },
];

const Calculators = () => {
  const totalCalculators = categories.reduce((sum, cat) => sum + cat.calculatorCount, 0);

  return (
    <Layout>
      <Helmet>
        <title>All Calculators - CalcBrew | 30+ Free Online Tools</title>
        <meta
          name="description"
          content="Browse CalcBrew's complete collection of 30+ free online calculators for home, finance, business, health, and more. Find the right tool for any calculation."
        />
        <link rel="canonical" href="https://calcbrew.com/calculators" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              {totalCalculators}+ Free Calculators
            </div>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">
              All Calculators
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of calculators organized by category. 
              Every tool is free, accurate, and works on any device.
            </p>
          </div>

          {/* NO ADS in the main category grid area */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.href}
                className="group relative rounded-xl border border-border bg-card p-6 shadow-soft card-hover accent-line"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <category.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.calculatorCount} calculators
                  </span>
                  <span className="flex items-center text-sm font-medium text-primary">
                    Browse
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center p-8 rounded-2xl bg-secondary/50 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We're constantly adding new calculators. Let us know what tool would 
              help you and we'll prioritize building it.
            </p>
            <Button asChild>
              <Link to="/contact">Request a Calculator</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AD ZONE: After main content - Safe placement */}
      <AdSection slot="calculators-bottom" format="horizontal" />
    </Layout>
  );
};

export default Calculators;
