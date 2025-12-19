import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <Crown className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Need Advanced Calculators and Detailed Reports?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Upgrade to CalcBrew Pro for premium features including saved calculations, 
            exportable reports, and exclusive professional-grade tools designed for 
            businesses and power users.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="text-base px-8"
          >
            <Link to="/pricing">
              Upgrade to Pro
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
