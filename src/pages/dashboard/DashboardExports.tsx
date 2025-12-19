import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileDown,
  Crown,
  Lock,
  FileSpreadsheet,
  FileText,
  Download,
} from "lucide-react";

const DashboardExports = () => {
  const { isPro } = useAuth();

  if (!isPro) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Exports Locked</CardTitle>
            <CardDescription>
              Upgrade to Pro to export your calculations to PDF and Excel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 space-y-2 text-left text-sm">
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Export to PDF format
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Export to Excel format
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                Bulk export history
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
        <h1 className="text-2xl font-bold">Exports</h1>
        <p className="text-muted-foreground">
          Download your calculations in various formats
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-500" />
              Export to PDF
            </CardTitle>
            <CardDescription>
              Download a professional PDF report of your calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export History as PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              Export to Excel
            </CardTitle>
            <CardDescription>
              Download your data in spreadsheet format for further analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export History as Excel
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Recent Exports
          </CardTitle>
          <CardDescription>
            Your previously generated export files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            <FileDown className="mx-auto h-12 w-12" />
            <p className="mt-4">No exports yet. Generate your first export above!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardExports;
