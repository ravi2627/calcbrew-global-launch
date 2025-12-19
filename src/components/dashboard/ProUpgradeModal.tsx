import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

interface ProUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: "save" | "share" | "export" | "history";
}

const featureMessages = {
  save: {
    title: "Save your calculations with Pro",
    description: "Keep all your important calculations organized and easily accessible anytime.",
  },
  share: {
    title: "Sharing is available in Pro",
    description: "Create shareable links to your calculations and collaborate with others.",
  },
  export: {
    title: "Export your results with Pro",
    description: "Download your calculations as PDF or Excel files for reports and records.",
  },
  history: {
    title: "View full history with Pro",
    description: "Access your complete calculation history and never lose your work.",
  },
};

const ProUpgradeModal = ({ open, onOpenChange, feature }: ProUpgradeModalProps) => {
  const { title, description } = featureMessages[feature];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left">
          <div className="mx-auto sm:mx-0 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Not now
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/pricing">Upgrade to Pro</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProUpgradeModal;
