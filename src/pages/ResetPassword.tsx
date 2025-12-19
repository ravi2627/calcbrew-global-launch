import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Loader2, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

const passwordSchema = z.object({
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a valid recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Check URL hash for recovery token (Supabase adds it automatically)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const type = hashParams.get("type");
      
      if (type === "recovery" && accessToken) {
        // Valid recovery link - session will be set by Supabase automatically
        setIsValidSession(true);
      } else if (session) {
        // User might have clicked the link and session is already set
        setIsValidSession(true);
      } else {
        setIsValidSession(false);
      }
    };

    checkSession();

    // Listen for auth state changes (recovery token exchange)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsValidSession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = passwordSchema.safeParse({ password, confirmPassword });
    if (!validation.success) {
      const fieldErrors: { password?: string; confirmPassword?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "password") fieldErrors.password = err.message;
        if (err.path[0] === "confirmPassword") fieldErrors.confirmPassword = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: validation.data.password,
      });

      if (error) {
        toast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setIsSuccess(true);
      toast({
        title: "Password updated!",
        description: "Your password has been successfully reset.",
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (err) {
      toast({
        title: "Password update failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while checking session
  if (isValidSession === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Invalid or expired link
  if (!isValidSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <Link to="/" className="mx-auto flex items-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CalcBrew</span>
            </Link>
            <div className="flex justify-center">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-2xl">Invalid or expired link</CardTitle>
              <CardDescription className="mt-2">
                This password reset link is invalid or has expired. 
                Please request a new one.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Link to="/forgot-password">
              <Button className="w-full">Request new reset link</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <Link to="/" className="mx-auto flex items-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CalcBrew</span>
            </Link>
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-2xl">Password updated!</CardTitle>
              <CardDescription className="mt-2">
                Your password has been successfully reset. 
                Redirecting you to the dashboard...
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <Link to="/" className="mx-auto flex items-center gap-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">CalcBrew</span>
          </Link>
          <div>
            <CardTitle className="text-2xl">Set new password</CardTitle>
            <CardDescription>
              Enter your new password below
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
