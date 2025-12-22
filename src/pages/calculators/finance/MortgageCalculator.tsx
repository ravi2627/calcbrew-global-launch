import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive, calculateEMI } from "@/lib/calculators";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("30");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const price = parseInput(homePrice);
    const down = parseInput(downPayment);
    const r = parseInput(rate);
    const years = parseInput(tenure);
    const tax = parseInput(propertyTax);
    const ins = parseInput(insurance);

    if (!isValidPositive(price) || !isValidPositive(r) || !isValidPositive(years)) {
      return;
    }

    const loanAmount = price - down;
    const months = years * 12;
    
    const principalAndInterest = calculateEMI(loanAmount, r, months);
    const monthlyTax = tax / 12;
    const monthlyInsurance = ins / 12;
    const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance;

    const totalPayments = principalAndInterest * months;
    const totalInterest = totalPayments - loanAmount;
    const totalCost = totalPayments + (tax * years) + (ins * years);

    const downPaymentPercent = (down / price) * 100;

    setResults([
      { label: "Home Price", value: formatCurrency(price) },
      { label: "Down Payment", value: `${formatCurrency(down)} (${formatNumber(downPaymentPercent, 1)}%)` },
      { label: "Loan Amount", value: formatCurrency(loanAmount) },
      { label: "Monthly Payment (P&I)", value: formatCurrency(principalAndInterest) },
      { label: "Monthly Taxes", value: formatCurrency(monthlyTax) },
      { label: "Monthly Insurance", value: formatCurrency(monthlyInsurance) },
      { label: "Total Monthly Payment", value: formatCurrency(totalMonthlyPayment), highlight: true },
      { label: "Total Interest Over Loan", value: formatCurrency(totalInterest) },
      { label: "Total Cost of Home", value: formatCurrency(totalCost) },
    ]);
  };

  const reset = () => {
    setHomePrice("");
    setDownPayment("");
    setRate("");
    setTenure("30");
    setPropertyTax("");
    setInsurance("");
    setResults([]);
  };

  const inputs = { homePrice, downPayment, rate, tenure, propertyTax, insurance };

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate monthly mortgage payments with taxes and insurance. Free mortgage calculator for home buyers to estimate housing costs."
      intro="Calculate your monthly mortgage payment including principal, interest, property taxes, and insurance (PITI). Understand the true cost of homeownership."
      category="Finance"
      categorySlug="finance"
      formula="Monthly Payment = P&I + Property Tax/12 + Insurance/12"
      formulaExplanation="Your total monthly housing payment includes Principal & Interest (calculated using standard amortization), plus monthly property tax and homeowner's insurance. This gives you the PITI (Principal, Interest, Taxes, Insurance) - the true monthly cost of your home."
      example={`For a $300,000 home with 20% down at 6.5% for 30 years:
Down payment = $300,000 × 20% = $60,000
Loan amount = $300,000 - $60,000 = $240,000

P&I = $1,517/month
Property tax ($3,600/year) = $300/month
Insurance ($1,200/year) = $100/month

Total PITI = $1,517 + $300 + $100 = $1,917/month`}
      faqs={[
        {
          question: "What is PITI?",
          answer: "PITI stands for Principal, Interest, Taxes, and Insurance - the four components of a typical monthly mortgage payment. This is your true monthly housing cost.",
        },
        {
          question: "How much should I put down?",
          answer: "Conventional loans typically require 3-20% down. 20% down avoids PMI (Private Mortgage Insurance). FHA loans allow as little as 3.5% down.",
        },
        {
          question: "What is PMI?",
          answer: "Private Mortgage Insurance is required when down payment is less than 20%. It typically costs 0.5-1% of the loan annually and can be removed once you have 20% equity.",
        },
        {
          question: "15-year vs 30-year mortgage: which is better?",
          answer: "15-year mortgages have higher monthly payments but much lower total interest. 30-year mortgages offer lower payments and more flexibility. Choose based on your budget and goals.",
        },
      ]}
      relatedCalculators={[
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
        { name: "EMI Calculator", href: "/calculators/finance/emi-calculator" },
        { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator" },
        { name: "Savings Calculator", href: "/calculators/finance/savings-calculator" },
      ]}
      canonicalUrl="/calculators/finance/mortgage-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="homePrice">Home Price ($)</Label>
            <Input
              id="homePrice"
              type="number"
              placeholder="e.g., 300000"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              min="0"
              step="10000"
            />
          </div>
          <div>
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="e.g., 60000"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              min="0"
              step="5000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rate">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              placeholder="e.g., 6.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              min="0"
              max="20"
              step="0.125"
            />
          </div>
          <div>
            <Label htmlFor="tenure">Loan Term (Years)</Label>
            <Input
              id="tenure"
              type="number"
              placeholder="e.g., 30"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              min="1"
              max="40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
            <Input
              id="propertyTax"
              type="number"
              placeholder="e.g., 3600"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              min="0"
              step="100"
            />
          </div>
          <div>
            <Label htmlFor="insurance">Annual Home Insurance ($)</Label>
            <Input
              id="insurance"
              type="number"
              placeholder="e.g., 1200"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              min="0"
              step="100"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Mortgage
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "This estimate does not include PMI (if applicable), HOA fees, or maintenance costs. Budget an additional 1-2% of home value annually for maintenance."
              : undefined
          }
          calculatorType="finance"
          calculatorName="Mortgage Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default MortgageCalculator;
