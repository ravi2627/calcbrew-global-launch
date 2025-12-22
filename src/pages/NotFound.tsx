import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Calculator, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-[10rem] font-bold leading-none text-muted/30 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-primary/10 p-6 backdrop-blur-sm">
                <Search className="h-12 w-12 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-2xl font-semibold mb-3 text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/calculators">
                <Calculator className="h-4 w-4" />
                Browse Calculators
              </Link>
            </Button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to previous page
          </button>

          {/* Tried Path */}
          <p className="mt-8 text-xs text-muted-foreground/60">
            Attempted path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
