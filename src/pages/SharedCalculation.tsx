import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calculator, Eye, Calendar, ArrowLeft } from "lucide-react";

interface SharedData {
  share: {
    id: string;
    share_token: string;
    views: number;
    expires_at: string | null;
    created_at: string;
  };
  calculation: {
    id: string;
    calculator_type: string;
    calculator_name: string;
    title: string;
    inputs: Record<string, unknown>;
    result: Record<string, unknown>;
    created_at: string;
  } | null;
}

const SharedCalculation = () => {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<SharedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShared = async () => {
      if (!token) {
        setError("Invalid share link");
        setIsLoading(false);
        return;
      }

      try {
        // Get share data
        const { data: shareData, error: shareError } = await supabase
          .from("shared_calculations")
          .select("*")
          .eq("share_token", token)
          .maybeSingle();

        if (shareError || !shareData) {
          setError("This shared calculation was not found or has been deleted.");
          setIsLoading(false);
          return;
        }

        // Check if expired
        if (shareData.expires_at && new Date(shareData.expires_at) < new Date()) {
          setError("This shared link has expired.");
          setIsLoading(false);
          return;
        }

        // Increment view count
        await supabase
          .from("shared_calculations")
          .update({ views: (shareData.views || 0) + 1 })
          .eq("id", shareData.id);

        // Get the saved calculation
        const { data: calcData } = await supabase
          .from("saved_calculations")
          .select("*")
          .eq("id", shareData.saved_calculation_id)
          .maybeSingle();

        setData({
          share: shareData,
          calculation: calcData ? {
            ...calcData,
            inputs: (calcData.inputs || {}) as Record<string, unknown>,
            result: (calcData.result || {}) as Record<string, unknown>,
          } : null,
        });
      } catch (err) {
        setError("An error occurred while loading the shared calculation.");
      }
      
      setIsLoading(false);
    };

    fetchShared();
  }, [token]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !data?.calculation) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-md text-center">
            <CardHeader>
              <CardTitle>Calculation Not Found</CardTitle>
              <CardDescription>
                {error || "This shared calculation could not be loaded."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/calculators">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Calculators
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const { share, calculation } = data;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/calculators"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Link>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {calculation.title}
                </CardTitle>
                <CardDescription className="capitalize">
                  {calculation.calculator_name.replace(/-/g, " ")}
                </CardDescription>
              </div>
              <Badge variant="secondary">Shared</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Inputs */}
            <div>
              <h3 className="mb-3 font-semibold">Input Values</h3>
              <div className="rounded-lg bg-muted/50 p-4">
                <dl className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(calculation.inputs).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-muted-foreground capitalize">
                        {key.replace(/_/g, " ")}
                      </dt>
                      <dd className="font-medium">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Results */}
            <div>
              <h3 className="mb-3 font-semibold">Results</h3>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <dl className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(calculation.result).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-muted-foreground capitalize">
                        {key.replace(/_/g, " ")}
                      </dt>
                      <dd className="text-lg font-bold text-primary">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Shared on {new Date(share.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {share.views} views
              </span>
            </div>

            {/* CTA */}
            <div className="rounded-lg bg-muted/30 p-4 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                Want to create your own calculations?
              </p>
              <Link to="/signup">
                <Button>Sign Up Free</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SharedCalculation;
