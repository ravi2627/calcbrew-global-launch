import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedCalculations } from "@/hooks/useCalculationHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  Crown,
  Lock,
  Trash2,
  Eye,
  Edit,
  Calculator,
} from "lucide-react";

const DashboardSaved = () => {
  const { isPro } = useAuth();
  const { saved, deleteSaved, canAccessSaved } = useSavedCalculations();

  if (!canAccessSaved) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Saved Calculations Locked</CardTitle>
            <CardDescription>
              Upgrade to Pro to save your favorite calculations for quick access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2 text-left text-sm">
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Save unlimited calculations
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Organize with custom names
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Quick access from dashboard
              </li>
            </ul>
            <Link to="/pricing">
              <Button className="w-full">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Calculations</h1>
        <p className="text-muted-foreground">
          Your bookmarked calculations for quick access
        </p>
      </div>

      {saved.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {item.title || "Untitled Calculation"}
                    </CardTitle>
                    <CardDescription className="capitalize">
                      {item.calculator_type.replace(/-/g, " ")}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    <Bookmark className="mr-1 h-3 w-3" />
                    Saved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Saved on {new Date(item.created_at).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteSaved(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              No saved calculations yet. Use the save button on any calculator to bookmark it!
            </p>
            <Link to="/calculators">
              <Button className="mt-4">
                <Calculator className="mr-2 h-4 w-4" />
                Browse Calculators
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardSaved;
