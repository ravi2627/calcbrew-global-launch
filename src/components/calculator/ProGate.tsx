import { Link } from "react-router-dom";
import { Lock, Sparkles, Download, Share2, History, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface ProGateProps {
  calculatorName: string;
  children: React.ReactNode;
}

const ProGate = ({ calculatorName, children }: ProGateProps) => {
  const { isPro } = useAuth();

  if (isPro) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred/Disabled Calculator Preview */}
      <div className="pointer-events-none select-none opacity-50 blur-[2px]">
        {children}
      </div>

      {/* Pro Gate Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Unlock {calculatorName}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            This advanced calculator is available exclusively for CalcBrew Pro members.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <History className="h-4 w-4 text-primary" />
              <span>Save History</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Download className="h-4 w-4 text-primary" />
              <span>Export Results</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="h-4 w-4 text-primary" />
              <span>Share Results</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span>Advanced Analysis</span>
            </div>
          </div>

          <Link to="/pricing">
            <Button size="lg" className="w-full gap-2">
              <Sparkles className="h-4 w-4" />
              Upgrade to Pro
            </Button>
          </Link>

          <p className="text-xs text-muted-foreground mt-4">
            Starting at $9/month • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProGate;
