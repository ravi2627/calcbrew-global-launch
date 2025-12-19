import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCalculationHistory } from "@/hooks/useCalculationHistory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  History,
  Crown,
  Lock,
  Trash2,
  Eye,
  Download,
  Share2,
} from "lucide-react";

const DashboardHistory = () => {
  const { isPro } = useAuth();
  const { history, clearHistory, canAccessHistory } = useCalculationHistory();

  if (!canAccessHistory) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Calculation History Locked</CardTitle>
            <CardDescription>
              Upgrade to Pro to save and view your calculation history across all devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2 text-left text-sm">
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                View all past calculations
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Export history to Excel/PDF
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Search and filter results
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calculation History</h1>
          <p className="text-muted-foreground">
            View and manage all your past calculations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          {history.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear History
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            All Calculations
          </CardTitle>
          <CardDescription>
            {history.length} calculation{history.length !== 1 ? "s" : ""} recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Calculator</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium capitalize">
                        {item.calculator_type.replace(/-/g, " ")}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {Object.keys(item.result || {}).length} results
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <History className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                No calculations yet. Start using calculators to build your history!
              </p>
              <Link to="/calculators">
                <Button className="mt-4">Browse Calculators</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHistory;
