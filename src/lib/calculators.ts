// Utility functions for calculations

// Format number with commas and decimal places
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Format currency
export const formatCurrency = (num: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num);
};

// Parse input to number, return 0 if invalid
export const parseInput = (value: string): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
};

// Validate positive number
export const isValidPositive = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

// Calculate BMI
export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

// Calculate BMR (Mifflin-St Jeor Equation)
export const calculateBMR = (
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female"
): number => {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
};

// Calculate EMI
export const calculateEMI = (
  principal: number,
  annualRate: number,
  tenureMonths: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) return principal / tenureMonths;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
};

// Calculate Simple Interest
export const calculateSimpleInterest = (
  principal: number,
  rate: number,
  years: number
): number => {
  return (principal * rate * years) / 100;
};

// Calculate Compound Interest
export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  years: number,
  compoundsPerYear: number = 12
): number => {
  return (
    principal * Math.pow(1 + rate / 100 / compoundsPerYear, compoundsPerYear * years) -
    principal
  );
};

// Calculate profit margin
export const calculateProfitMargin = (revenue: number, cost: number): number => {
  return ((revenue - cost) / revenue) * 100;
};

// Calculate markup percentage
export const calculateMarkup = (cost: number, sellingPrice: number): number => {
  return ((sellingPrice - cost) / cost) * 100;
};

// Calculate ROI
export const calculateROI = (gain: number, cost: number): number => {
  return ((gain - cost) / cost) * 100;
};

// Calculate break-even point
export const calculateBreakEven = (
  fixedCosts: number,
  pricePerUnit: number,
  costPerUnit: number
): number => {
  return fixedCosts / (pricePerUnit - costPerUnit);
};

// Calculate age from date
export const calculateAge = (birthDate: Date): { years: number; months: number; days: number } => {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

// Calculate date difference
export const calculateDateDifference = (
  startDate: Date,
  endDate: Date
): { days: number; weeks: number; months: number; years: number } => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  return { days, weeks, months, years };
};

// Unit conversion helpers
export const lengthConversions = {
  meters: 1,
  kilometers: 0.001,
  centimeters: 100,
  millimeters: 1000,
  inches: 39.3701,
  feet: 3.28084,
  yards: 1.09361,
  miles: 0.000621371,
};

export const weightConversions = {
  kilograms: 1,
  grams: 1000,
  milligrams: 1000000,
  pounds: 2.20462,
  ounces: 35.274,
  tons: 0.001,
};

export const areaConversions = {
  squareMeters: 1,
  squareFeet: 10.7639,
  squareYards: 1.19599,
  squareKilometers: 0.000001,
  acres: 0.000247105,
  hectares: 0.0001,
};

export const volumeConversions = {
  liters: 1,
  milliliters: 1000,
  cubicMeters: 0.001,
  gallons: 0.264172,
  quarts: 1.05669,
  pints: 2.11338,
  cups: 4.22675,
};
