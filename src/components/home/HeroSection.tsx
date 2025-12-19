import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, Ruler, PaintBucket } from "lucide-react";

const calculatorCards = [
  {
    title: "Square Footage",
    icon: Ruler,
    color: "bg-blue-50",
    delay: "animate-float",
  },
  {
    title: "ROI Calculator",
    icon: DollarSign,
    color: "bg-green-50",
    delay: "animate-float-delayed",
  },
  {
    title: "Payroll Calculator",
    icon: Calculator,
    color: "bg-purple-50",
    delay: "animate-float-slow",
  },
  {
    title: "Paint Calculator",
    icon: PaintBucket,
    color: "bg-orange-50",
    delay: "animate-float-delayed",
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Brew the Right{" "}
                <span className="text-primary">Numbers</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Smart, accurate calculators for home, business, and everyday decisions — built for global users.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base px-8">
                <Link to="/calculators">Explore Calculators</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8">
                <Link to="/pricing">Go Pro</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">100% Free to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">No Sign-up Required</span>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Cards */}
          <div className="relative h-80 md:h-96 lg:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {calculatorCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`absolute ${card.delay} ${getCardPosition(index)}`}
                >
                  <div className={`${card.color} rounded-xl p-5 shadow-card border-l-4 border-primary bg-card`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <card.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground whitespace-nowrap">
                        {card.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />
    </section>
  );
};

const getCardPosition = (index: number): string => {
  const positions = [
    "top-4 left-4 md:top-8 md:left-8",
    "top-16 right-0 md:top-20 md:right-4",
    "bottom-20 left-8 md:bottom-24 md:left-16",
    "bottom-4 right-4 md:bottom-8 md:right-12",
  ];
  return positions[index] || positions[0];
};

export default HeroSection;
