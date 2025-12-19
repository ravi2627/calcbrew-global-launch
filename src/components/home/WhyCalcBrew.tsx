import { CheckCircle, Zap, Smartphone, Crown } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Accurate, Verified Formulas",
    description:
      "Every calculator uses industry-standard formulas verified by experts. Our calculations meet international standards for precision and reliability.",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    description:
      "Get instant results with our optimized calculators. No loading delays, no lag — just immediate, accurate answers when you need them.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly & Responsive",
    description:
      "Calculate on any device, anywhere. Our responsive design ensures a seamless experience on smartphones, tablets, and desktops.",
  },
  {
    icon: Crown,
    title: "Advanced Features with Pro",
    description:
      "Unlock detailed reports, save calculations, export data, and access premium calculators with CalcBrew Pro for power users.",
  },
];

const WhyCalcBrew = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Why Choose CalcBrew?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We built CalcBrew to be the most reliable, user-friendly calculator 
            platform on the web. Here's what sets us apart.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5 p-6 rounded-xl border border-border bg-card shadow-soft card-hover"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCalcBrew;
