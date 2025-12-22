import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCalculationHistory, useSavedCalculations } from "@/hooks/useCalculationHistory";
import { exportToPDF, exportToExcel } from "@/lib/exportUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileDown,
  Crown,
  Lock,
  FileSpreadsheet,
  FileText,
  Download,
  MoreVertical,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const DashboardExports = () => {
  const { isPro } = useAuth();
  const { history, isLoading: historyLoading } = useCalculationHistory();
  const { saved, isLoading: savedLoading } = useSavedCalculations();
  const [exportingId, setExportingId] = useState<string | null>(null);

  const handleExportPDF = (item: {
    calculator_name: string;
    calculator_type: string;
    inputs: Record<string, unknown>;
    result: Record<string, unknown>;
  }, id: string) => {
    setExportingId(id);
    try {
      exportToPDF({
        calculatorName: item.calculator_name,
        calculatorType: item.calculator_type,
        inputs: item.inputs,
        result: item.result,
      });
      toast.success("PDF exported successfully");
    } catch {
      toast.error("Failed to export PDF");
    } finally {
      setExportingId(null);
    }
  };

  const handleExportExcel = (item: {
    calculator_name: string;
    calculator_type: string;
    inputs: Record<string, unknown>;
    result: Record<string, unknown>;
  }, id: string) => {
    setExportingId(id);
    try {
      exportToExcel({
        calculatorName: item.calculator_name,
        calculatorType: item.calculator_type,
        inputs: item.inputs,
        result: item.result,
      });
      toast.success("Excel file exported successfully");
    } catch {
      toast.error("Failed to export Excel file");
    } finally {
      setExportingId(null);
    }
  };

  const handleBulkExportPDF = () => {
    if (history.length === 0) {
      toast.error("No calculations to export");
      return;
    }
    
    history.slice(0, 10).forEach((item, index) => {
      setTimeout(() => {
        exportToPDF({
          calculatorName: item.calculator_name,
          calculatorType: item.calculator_type,
          inputs: item.inputs,
          result: item.result,
        });
      }, index * 500);
    });
    toast.success(`Exporting ${Math.min(history.length, 10)} calculations as PDF`);
  };

  const handleBulkExportExcel = () => {
    if (history.length === 0) {
      toast.error("No calculations to export");
      return;
    }

    history.slice(0, 10).forEach((item, index) => {
      setTimeout(() => {
        exportToExcel({
          calculatorName: item.calculator_name,
          calculatorType: item.calculator_type,
          inputs: item.inputs,
          result: item.result,
        });
      }, index * 500);
    });
    toast.success(`Exporting ${Math.min(history.length, 10)} calculations as Excel`);
  };

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

  const isLoading = historyLoading || savedLoading;
  const allCalculations = [
    ...saved.map(s => ({ ...s, type: 'saved' as const })),
    ...history.map(h => ({ ...h, type: 'history' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
              Bulk Export to PDF
            </CardTitle>
            <CardDescription>
              Download recent calculations as PDF reports (up to 10)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={handleBulkExportPDF}
              disabled={history.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              Bulk Export to Excel
            </CardTitle>
            <CardDescription>
              Download recent calculations in spreadsheet format (up to 10)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full"
              onClick={handleBulkExportExcel}
              disabled={history.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export as Excel
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Available Calculations
          </CardTitle>
          <CardDescription>
            Select individual calculations to export
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : allCalculations.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <FileDown className="mx-auto h-12 w-12" />
              <p className="mt-4">No calculations yet. Use a calculator to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Calculator</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Export</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCalculations.slice(0, 20).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.calculator_name}
                      </TableCell>
                      <TableCell className="capitalize text-muted-foreground">
                        {item.calculator_type.replace(/-/g, ' ')}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(item.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          item.type === 'saved' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {item.type === 'saved' ? 'Saved' : 'History'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              disabled={exportingId === item.id}
                            >
                              {exportingId === item.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MoreVertical className="h-4 w-4" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleExportPDF(item, item.id)}
                            >
                              <FileText className="mr-2 h-4 w-4 text-red-500" />
                              Export as PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleExportExcel(item, item.id)}
                            >
                              <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                              Export as Excel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardExports;
