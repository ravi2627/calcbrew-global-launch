import { useState } from "react";
import { Bookmark, Share2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import ProUpgradeModal from "@/components/dashboard/ProUpgradeModal";
import { useSavedCalculations, useSharedCalculations } from "@/hooks/useCalculationHistory";
import { useToast } from "@/hooks/use-toast";

interface ProActionsBarProps {
  calculatorType: string;
  calculatorName: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  hasResult: boolean;
}

const ProActionsBar = ({
  calculatorType,
  calculatorName,
  inputs,
  result,
  hasResult,
}: ProActionsBarProps) => {
  const { isPro, user } = useAuth();
  const { saveCalculation } = useSavedCalculations();
  const { createShare } = useSharedCalculations();
  const { toast } = useToast();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFeature, setModalFeature] = useState<"save" | "share" | "export">("save");
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleSave = async () => {
    if (!isPro) {
      setModalFeature("save");
      setModalOpen(true);
      return;
    }

    if (!hasResult) {
      toast({
        title: "No result to save",
        description: "Please calculate a result first.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const title = `${calculatorName} - ${new Date().toLocaleDateString()}`;
      const saved = await saveCalculation(calculatorType, calculatorName, title, inputs, result);
      
      if (saved) {
        toast({
          title: "Calculation saved",
          description: "View it in your dashboard.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to save",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!isPro) {
      setModalFeature("share");
      setModalOpen(true);
      return;
    }

    if (!hasResult) {
      toast({
        title: "No result to share",
        description: "Please calculate a result first.",
        variant: "destructive",
      });
      return;
    }

    setIsSharing(true);
    try {
      // First save, then share
      const title = `${calculatorName} - ${new Date().toLocaleDateString()}`;
      const saved = await saveCalculation(calculatorType, calculatorName, title, inputs, result);
      
      if (saved) {
        const shared = await createShare(saved.id);
        if (shared) {
          const shareUrl = `${window.location.origin}/share/${shared.share_token}`;
          await navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Link copied!",
            description: "Share link has been copied to your clipboard.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Failed to share",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleExport = () => {
    if (!isPro) {
      setModalFeature("export");
      setModalOpen(true);
      return;
    }

    if (!hasResult) {
      toast({
        title: "No result to export",
        description: "Please calculate a result first.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement PDF/Excel export
    toast({
      title: "Export coming soon",
      description: "PDF and Excel export will be available soon.",
    });
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2 pt-4 border-t border-border mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                <Bookmark className="h-4 w-4" />
                Save
                {!isPro && (
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    Pro
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            {!isPro && (
              <TooltipContent>
                <p>Save calculations with Pro</p>
              </TooltipContent>
            )}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                disabled={isSharing}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
                {!isPro && (
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    Pro
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            {!isPro && (
              <TooltipContent>
                <p>Share results with Pro</p>
              </TooltipContent>
            )}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="gap-2"
              >
                <FileDown className="h-4 w-4" />
                Export
                {!isPro && (
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    Pro
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            {!isPro && (
              <TooltipContent>
                <p>Export to PDF/Excel with Pro</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <ProUpgradeModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        feature={modalFeature}
      />
    </>
  );
};

export default ProActionsBar;
