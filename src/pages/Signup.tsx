import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Loader2, Mail, Lock, Chrome, Github, User, CheckCircle, RefreshCw } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password is too long"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { user, signUp, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = signupSchema.safeParse({ name, email: email.trim(), password, confirmPassword });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await signUp(validation.data.email, password, name);

      if (error) {
        // Check for "User already registered" error
        if (error.message.toLowerCase().includes("already registered") || 
            error.message.toLowerCase().includes("already exists")) {
          toast({
            title: "Account exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      // Show verification screen
      setShowVerification(true);
      toast({
        title: "Check your email!",
        description: "We've sent you a verification link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
      });

      if (error) {
        toast({
          title: "Couldn't resend email",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Email sent!",
        description: "We've resent the verification link to your email.",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    const { error } = provider === 'google' 
      ? await signInWithGoogle()
      : await signInWithGithub();
    setIsLoading(false);
    
    if (error) {
      toast({
        title: `${provider === 'google' ? 'Google' : 'GitHub'} signup unavailable`,
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Email verification reminder screen
  if (showVerification) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <Link to="/" className="mx-auto flex items-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CalcBrew</span>
            </Link>
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Verify your email</CardTitle>
              <CardDescription className="mt-2">
                We've sent a verification link to
              </CardDescription>
              <p className="mt-1 font-medium text-foreground">{email}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-2 font-medium">Next steps:</h4>
              <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                <li>Check your email inbox</li>
                <li>Click the verification link</li>
                <li>Start using CalcBrew!</li>
              </ol>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email?
              </p>
              <Button
                variant="link"
                onClick={handleResendVerification}
                disabled={isResending}
                className="mt-1"
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend verification email
                  </>
                )}
              </Button>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => setShowVerification(false)}
              >
                Use a different email
              </Button>
              <Link to="/login">
                <Button variant="ghost" className="w-full">
                  Already verified? Sign in
                </Button>
              </Link>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Check your spam folder if you don't see the email in your inbox.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <Link to="/" className="mx-auto flex items-center gap-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">CalcBrew</span>
          </Link>
          <div>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Start using CalcBrew for free</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* OAuth Buttons */}
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuth('google')}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuth('github')}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              or continue with email
            </span>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
