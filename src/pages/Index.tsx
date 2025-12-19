import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCalculators from "@/components/home/FeaturedCalculators";
import WhyCalcBrew from "@/components/home/WhyCalcBrew";
import SEOContent from "@/components/home/SEOContent";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import { AdSection } from "@/components/ads";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>CalcBrew - Brew the Right Numbers | Free Online Calculators</title>
        <meta
          name="description"
          content="CalcBrew offers 30+ free online calculators for home, business, finance, and health. Accurate, fast, and mobile-friendly tools built for global users."
        />
        <meta name="keywords" content="online calculator, free calculator, ROI calculator, mortgage calculator, BMI calculator, construction calculator" />
        <link rel="canonical" href="https://calcbrew.com/" />
      </Helmet>

      {/* NO ADS ABOVE THE FOLD - Hero is 100% content-focused */}
      <HeroSection />
      <TrustStrip />
      <CategoriesSection />
      <FeaturedCalculators />
      <WhyCalcBrew />
      <SEOContent />
      
      {/* AD ZONE 1: After SEO content block - Safe placement */}
      <AdSection slot="home-after-seo" format="horizontal" />
      
      <FAQSection />
      
      {/* AD ZONE 2: After FAQ section - Safe placement */}
      <AdSection slot="home-after-faq" format="leaderboard" />
      
      <FinalCTA />
      
      {/* AD ZONE 3: Before footer - Safe placement */}
      <AdSection slot="home-before-footer" format="horizontal" className="border-t border-border" />
    </Layout>
  );
};

export default Index;
