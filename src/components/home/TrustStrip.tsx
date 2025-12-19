import { Calculator, Shield, Zap, Globe } from "lucide-react";

const trustItems = [
  {
    icon: Calculator,
    title: "30+ Calculators",
    description: "Comprehensive tools for every need",
  },
  {
    icon: Shield,
    title: "Industry-Standard Formulas",
    description: "Verified accuracy you can trust",
  },
  {
    icon: Zap,
    title: "Fast & Free",
    description: "Instant results, zero cost",
  },
  {
    icon: Globe,
    title: "Global Users",
    description: "Built for international standards",
  },
];

const TrustStrip = () => {
  return (
    <section className="border-y border-border bg-secondary/30 py-8 md:py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
