import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
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
  ArrowLeft,
  Calculator,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { AdSection, SidebarAd } from "@/components/ads";

interface CalculatorItem {
  name: string;
  description: string;
  href: string;
}

interface CategoryData {
  title: string;
  description: string;
  icon: LucideIcon;
  longDescription: string;
  calculators: CalculatorItem[];
}

const categoryData: Record<string, CategoryData> = {
  "home-construction": {
    title: "Home & Construction",
    description: "Calculate materials, costs, and measurements for your projects",
    icon: Home,
    longDescription:
      "Our home and construction calculators help homeowners, contractors, and DIY enthusiasts estimate materials, costs, and measurements for renovation and building projects. From flooring and paint to concrete and roofing, get accurate estimates to plan your projects effectively.",
    calculators: [
      { name: "Square Footage Calculator", description: "Calculate area for flooring, painting, and more", href: "/calculators/home-construction/square-footage-calculator" },
      { name: "Paint Calculator", description: "Estimate paint needed for walls and ceilings", href: "/calculators/home-construction/paint-calculator" },
      { name: "Tile Calculator", description: "Determine tiles needed for floors and walls", href: "/calculators/home-construction/tile-calculator" },
      { name: "Concrete Calculator", description: "Calculate concrete volume for slabs and footings", href: "/calculators/home-construction/concrete-calculator" },
      { name: "Flooring Cost Calculator", description: "Estimate flooring materials and costs", href: "/calculators/home-construction/flooring-cost-calculator" },
      { name: "Roofing Calculator", description: "Estimate shingles and materials for roof projects", href: "/calculators/home-construction/roofing-calculator" },
      { name: "Construction Cost Estimator", description: "Estimate total construction project costs", href: "/calculators/home-construction/construction-cost-estimator" },
    ],
  },
  finance: {
    title: "Finance",
    description: "Loans, investments, mortgages, and savings calculators",
    icon: DollarSign,
    longDescription:
      "Make informed financial decisions with our comprehensive finance calculators. Whether you're planning a mortgage, calculating loan payments, analyzing investment returns, or building a savings plan, our tools provide accurate projections to help you manage your money wisely.",
    calculators: [
      { name: "Salary to Hourly Calculator", description: "Convert annual salary to hourly rate", href: "/calculators/finance/salary-to-hourly-calculator" },
      { name: "Hourly to Salary Calculator", description: "Convert hourly rate to annual salary", href: "/calculators/finance/hourly-to-salary-calculator" },
      { name: "Loan Calculator", description: "Determine payments for personal and auto loans", href: "/calculators/finance/loan-calculator" },
      { name: "EMI Calculator", description: "Calculate equated monthly installments", href: "/calculators/finance/emi-calculator" },
      { name: "Mortgage Calculator", description: "Calculate monthly payments and total interest", href: "/calculators/finance/mortgage-calculator" },
      { name: "Simple Interest Calculator", description: "Calculate simple interest on principal", href: "/calculators/finance/simple-interest-calculator" },
      { name: "Compound Interest Calculator", description: "See how your investments grow over time", href: "/calculators/finance/compound-interest-calculator" },
      { name: "Savings Calculator", description: "Plan how to reach your savings targets", href: "/calculators/finance/savings-calculator" },
      { name: "Payroll Calculator", description: "Compute wages, taxes, and deductions", href: "/calculators/finance/payroll-calculator" },
    ],
  },
  business: {
    title: "Business",
    description: "ROI, payroll, profit margins, and business metrics",
    icon: Briefcase,
    longDescription:
      "Our business calculators help entrepreneurs and business owners make data-driven decisions. Analyze return on investment, calculate payroll, determine profit margins, and track key business metrics with tools designed for real-world business applications.",
    calculators: [
      { name: "Profit Margin Calculator", description: "Calculate gross and net profit margins", href: "/calculators/business/profit-margin-calculator" },
      { name: "Markup Calculator", description: "Set prices based on cost and desired margin", href: "/calculators/business/markup-calculator" },
      { name: "Commission Calculator", description: "Calculate sales commissions and earnings", href: "/calculators/business/commission-calculator" },
      { name: "ROI Calculator", description: "Measure return on investment for business decisions", href: "/calculators/business/roi-calculator" },
      { name: "Break-Even Calculator", description: "Determine when your business becomes profitable", href: "/calculators/business/break-even-calculator" },
    ],
  },
  "health-fitness": {
    title: "Health & Fitness",
    description: "BMI, calories, macros, and fitness tracking tools",
    icon: Heart,
    longDescription:
      "Track your health and fitness goals with our calculator tools. Calculate your BMI, determine daily calorie needs, plan macronutrient ratios, and monitor your fitness progress with tools based on established health formulas.",
    calculators: [
      { name: "BMI Calculator", description: "Calculate body mass index for health assessment", href: "/calculators/health-fitness/bmi-calculator" },
      { name: "Calorie Calculator", description: "Determine daily calorie needs for your goals", href: "/calculators/health-fitness/calorie-calculator" },
      { name: "Macro Calculator", description: "Plan protein, carb, and fat intake", href: "/calculators/health-fitness/macro-calculator" },
      { name: "Body Fat Calculator", description: "Estimate body fat percentage", href: "/calculators/health-fitness/body-fat-calculator" },
    ],
  },
  "time-date": {
    title: "Time & Date",
    description: "Age, duration, time zones, and date calculations",
    icon: Clock,
    longDescription:
      "Our time and date calculators help with age calculations, duration between dates, time zone conversions, and other temporal computations. Perfect for planning events, calculating deadlines, or simply knowing exact durations.",
    calculators: [
      { name: "Age Calculator", description: "Calculate exact age in years, months, and days", href: "/calculators/time-date" },
      { name: "Date Difference Calculator", description: "Find duration between two dates", href: "/calculators/time-date" },
      { name: "Time Zone Converter", description: "Convert times across different zones", href: "/calculators/time-date" },
      { name: "Work Hours Calculator", description: "Track and calculate work hours", href: "/calculators/time-date" },
    ],
  },
  conversion: {
    title: "Conversion Tools",
    description: "Units, currency, temperature, and measurement conversions",
    icon: ArrowLeftRight,
    longDescription:
      "Convert between different units of measurement, currencies, and scales with our conversion calculators. Whether you need to convert length, weight, temperature, or currencies, our tools provide quick and accurate conversions.",
    calculators: [
      { name: "Length Converter", description: "Convert between meters, feet, inches, and more", href: "/calculators/conversion" },
      { name: "Weight Converter", description: "Convert between kg, pounds, ounces, and more", href: "/calculators/conversion" },
      { name: "Temperature Converter", description: "Convert between Celsius, Fahrenheit, and Kelvin", href: "/calculators/conversion" },
      { name: "Area Converter", description: "Convert between sq meters, sq feet, acres, and more", href: "/calculators/conversion" },
      { name: "Volume Converter", description: "Convert between liters, gallons, cups, and more", href: "/calculators/conversion" },
    ],
  },
  utilities: {
    title: "Utility Tools",
    description: "Percentages, random generators, and everyday calculations",
    icon: Wrench,
    longDescription:
      "Our utility calculators handle everyday calculations that don't fit into specific categories. From percentage calculations to random number generators, these versatile tools help with a variety of common calculation needs.",
    calculators: [
      { name: "Percentage Calculator", description: "Calculate percentages, increases, and decreases", href: "/calculators/utilities" },
      { name: "Tip Calculator", description: "Calculate tips and split bills easily", href: "/calculators/utilities" },
      { name: "GPA Calculator", description: "Calculate grade point average", href: "/calculators/utilities" },
      { name: "Random Number Generator", description: "Generate random numbers within a range", href: "/calculators/utilities" },
    ],
  },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const data = category ? categoryData[category] : null;

  if (!data) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
          <Button asChild>
            <Link to="/calculators">View All Calculators</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const Icon = data.icon;

  return (
    <Layout>
      <Helmet>
        <title>{data.title} Calculators - CalcBrew | Free Online Tools</title>
        <meta
          name="description"
          content={`${data.description}. Free, accurate ${data.title.toLowerCase()} calculators from CalcBrew.`}
        />
        <link rel="canonical" href={`https://calcbrew.com/calculators/${category}`} />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          {/* Back link */}
          <Link
            to="/calculators"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Calculators
          </Link>

          {/* Main content with optional sidebar */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Main content column */}
            <div>
              {/* Header */}
              <div className="flex items-start gap-6 mb-12">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-2">
                    {data.title} Calculators
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    {data.longDescription}
                  </p>
                </div>
              </div>

              {/* Calculator Grid - NO ADS inside calculator tools */}
              <div className="grid gap-6 sm:grid-cols-2">
                {data.calculators.map((calc) => (
                  <Link
                    key={calc.name}
                    to={calc.href}
                    className="group rounded-xl border border-border bg-card p-6 shadow-soft card-hover"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{calc.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{calc.description}</p>
                    <Button variant="outline" size="sm">
                      Open Calculator
                    </Button>
                  </Link>
                ))}
              </div>

              {/* SEO Content - ads come AFTER this, not inside */}
              <div className="mt-16 p-8 rounded-2xl bg-secondary/30 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  About Our {data.title} Calculators
                </h2>
                <p className="text-muted-foreground mb-4">
                  CalcBrew's {data.title.toLowerCase()} calculators are designed to provide 
                  accurate, reliable results for your specific needs. Each calculator uses 
                  verified formulas and industry standards to ensure you can trust the results.
                </p>
                <p className="text-muted-foreground">
                  Whether you're a professional or just need quick calculations for personal 
                  use, our tools are built to be intuitive, fast, and accessible on any device. 
                  All calculators are free to use with no registration required.
                </p>
              </div>
            </div>

            {/* Sidebar - Desktop only, below navigation level */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <SidebarAd />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AD ZONE: After content sections - Safe placement */}
      <AdSection slot={`category-${category}-bottom`} format="horizontal" />
    </Layout>
  );
};

export default CategoryPage;
