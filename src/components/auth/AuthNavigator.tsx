import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AUTH_PUBLIC_ROUTES = new Set(["/login", "/signup"]);

/**
 * Centralized navigation guard for auth transitions.
 * - If logged in: keeps users out of /login and /signup
 * - If logged out: blocks /dashboard routes
 */
const AuthNavigator = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    const pathname = location.pathname;

    // Signed in → keep users out of auth pages
    if (user) {
      if (AUTH_PUBLIC_ROUTES.has(pathname)) {
        navigate("/dashboard", { replace: true });
      }
      return;
    }

    // Signed out → block dashboard
    if (pathname.startsWith("/dashboard")) {
      navigate("/login", {
        replace: true,
        state: {
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
        },
      });
    }
  }, [isLoading, user, location.pathname, location.search, location.hash, navigate]);

  return null;
};

export default AuthNavigator;
