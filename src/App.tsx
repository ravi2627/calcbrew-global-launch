import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthNavigator from "@/components/auth/AuthNavigator";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Calculators from "./pages/Calculators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SharedCalculation from "./pages/SharedCalculation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  DashboardOverview,
  DashboardHistory,
  DashboardSaved,
  DashboardShared,
  DashboardExports,
  DashboardSettings,
  DashboardBilling,
} from "./pages/dashboard";

// Home & Construction Calculators
import {
  SquareFootageCalculator,
  PaintCalculator,
  TileCalculator,
  ConcreteCalculator,
  FlooringCostCalculator,
  RoofingCalculator,
  ConstructionCostEstimator,
} from "./pages/calculators/home-construction";

// Finance Calculators
import {
  SalaryToHourlyCalculator,
  HourlyToSalaryCalculator,
  LoanCalculator,
  EMICalculator,
  MortgageCalculator,
  SimpleInterestCalculator,
  CompoundInterestCalculator,
  SavingsCalculator,
  PayrollCalculator,
} from "./pages/calculators/finance";

// Business Calculators
import {
  ProfitMarginCalculator,
  MarkupCalculator,
  CommissionCalculator,
  ROICalculator,
  BreakEvenCalculator,
} from "./pages/calculators/business";

// Health & Fitness Calculators
import {
  BMICalculator,
  CalorieCalculator,
  MacroCalculator,
  BodyFatCalculator,
} from "./pages/calculators/health-fitness";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AuthNavigator />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/calculators/:category" element={<CategoryPage />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Shared Calculation (Public) */}
              <Route path="/shared/:token" element={<SharedCalculation />} />
              
              {/* Dashboard Routes (Protected) */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<DashboardOverview />} />
                <Route path="history" element={<DashboardHistory />} />
                <Route path="saved" element={<DashboardSaved />} />
                <Route path="shared" element={<DashboardShared />} />
                <Route path="exports" element={<DashboardExports />} />
                <Route path="settings" element={<DashboardSettings />} />
                <Route path="billing" element={<DashboardBilling />} />
              </Route>
              
              {/* Home & Construction Calculators */}
              <Route path="/calculators/home-construction/square-footage-calculator" element={<SquareFootageCalculator />} />
              <Route path="/calculators/home-construction/paint-calculator" element={<PaintCalculator />} />
              <Route path="/calculators/home-construction/tile-calculator" element={<TileCalculator />} />
              <Route path="/calculators/home-construction/concrete-calculator" element={<ConcreteCalculator />} />
              <Route path="/calculators/home-construction/flooring-cost-calculator" element={<FlooringCostCalculator />} />
              <Route path="/calculators/home-construction/roofing-calculator" element={<RoofingCalculator />} />
              <Route path="/calculators/home-construction/construction-cost-estimator" element={<ConstructionCostEstimator />} />
              
              {/* Finance Calculators */}
              <Route path="/calculators/finance/salary-to-hourly-calculator" element={<SalaryToHourlyCalculator />} />
              <Route path="/calculators/finance/hourly-to-salary-calculator" element={<HourlyToSalaryCalculator />} />
              <Route path="/calculators/finance/loan-calculator" element={<LoanCalculator />} />
              <Route path="/calculators/finance/emi-calculator" element={<EMICalculator />} />
              <Route path="/calculators/finance/mortgage-calculator" element={<MortgageCalculator />} />
              <Route path="/calculators/finance/simple-interest-calculator" element={<SimpleInterestCalculator />} />
              <Route path="/calculators/finance/compound-interest-calculator" element={<CompoundInterestCalculator />} />
              <Route path="/calculators/finance/savings-calculator" element={<SavingsCalculator />} />
              <Route path="/calculators/finance/payroll-calculator" element={<PayrollCalculator />} />
              
              {/* Business Calculators */}
              <Route path="/calculators/business/profit-margin-calculator" element={<ProfitMarginCalculator />} />
              <Route path="/calculators/business/markup-calculator" element={<MarkupCalculator />} />
              <Route path="/calculators/business/commission-calculator" element={<CommissionCalculator />} />
              <Route path="/calculators/business/roi-calculator" element={<ROICalculator />} />
              <Route path="/calculators/business/break-even-calculator" element={<BreakEvenCalculator />} />
              
              {/* Health & Fitness Calculators */}
              <Route path="/calculators/health-fitness/bmi-calculator" element={<BMICalculator />} />
              <Route path="/calculators/health-fitness/calorie-calculator" element={<CalorieCalculator />} />
              <Route path="/calculators/health-fitness/macro-calculator" element={<MacroCalculator />} />
              <Route path="/calculators/health-fitness/body-fat-calculator" element={<BodyFatCalculator />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
