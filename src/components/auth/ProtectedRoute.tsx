import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePro?: boolean;
}

const ProtectedRoute = ({ children, requirePro = false }: ProtectedRouteProps) => {
  const { user, isLoading, isPro } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requirePro && !isPro) {
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
