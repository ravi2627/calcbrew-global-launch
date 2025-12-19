import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSharedCalculations } from "@/hooks/useCalculationHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Share2,
  Crown,
  Lock,
  Trash2,
  Copy,
  ExternalLink,
  Clock,
} from "lucide-react";

const DashboardShared = () => {
  const { isPro } = useAuth();
  const { shared, deleteShared, canAccessShared } = useSharedCalculations();
  const { toast } = useToast();

  const copyLink = (token: string) => {
    const link = `${window.location.origin}/shared/${token}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "The share link has been copied to your clipboard.",
    });
  };

  if (!canAccessShared) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Shared Links Locked</CardTitle>
            <CardDescription>
              Upgrade to Pro to share your calculations with unique links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2 text-left text-sm">
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Share with unique links
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Set expiration dates
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Track who views your shares
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
        <h1 className="text-2xl font-bold">Shared Links</h1>
        <p className="text-muted-foreground">
          Manage your shared calculation links
        </p>
      </div>

      {shared.length > 0 ? (
        <div className="space-y-4">
          {shared.map((item) => {
            const isExpired = item.expires_at && new Date(item.expires_at) < new Date();
            
            return (
              <Card key={item.id} className={isExpired ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base capitalize">
                        {item.calculator_type.replace(/-/g, " ")}
                      </CardTitle>
                      <CardDescription>
                        Created {new Date(item.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {isExpired ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Share2 className="mr-1 h-3 w-3" />
                        Active
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 rounded-lg bg-muted p-2">
                    <code className="flex-1 truncate text-sm">
                      {window.location.origin}/shared/{item.share_token}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyLink(item.share_token)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={`/shared/${item.share_token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  {item.expires_at && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {isExpired ? "Expired" : "Expires"}{" "}
                      {new Date(item.expires_at).toLocaleDateString()}
                    </p>
                  )}

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteShared(item.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Share2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              No shared links yet. Use the share button on any calculator to create a link!
            </p>
            <Link to="/calculators">
              <Button className="mt-4">Browse Calculators</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardShared;
