import { Link } from "react-router-dom";
import { 
  Home, 
  DollarSign, 
  Briefcase, 
  Heart, 
  Clock, 
  ArrowLeftRight, 
  Wrench,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    title: "Home & Construction",
    description: "Calculate materials, costs, and measurements for your projects",
    icon: Home,
    href: "/calculators/home-construction",
  },
  {
    title: "Finance",
    description: "Loans, investments, mortgages, and savings calculators",
    icon: DollarSign,
    href: "/calculators/finance",
  },
  {
    title: "Business",
    description: "ROI, payroll, profit margins, and business metrics",
    icon: Briefcase,
    href: "/calculators/business",
  },
  {
    title: "Health & Fitness",
    description: "BMI, calories, macros, and fitness tracking tools",
    icon: Heart,
    href: "/calculators/health-fitness",
  },
  {
    title: "Time & Date",
    description: "Age, duration, time zones, and date calculations",
    icon: Clock,
    href: "/calculators/time-date",
  },
  {
    title: "Conversion Tools",
    description: "Units, currency, temperature, and measurement conversions",
    icon: ArrowLeftRight,
    href: "/calculators/conversion",
  },
  {
    title: "Utility Tools",
    description: "Percentages, random generators, and everyday calculations",
    icon: Wrench,
    href: "/calculators/utilities",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Calculator Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive collection of calculators organized by category. 
            Find the right tool for any calculation need.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.href}
              className="group relative rounded-xl border border-border bg-card p-6 shadow-soft card-hover accent-line"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                Browse calculators
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
