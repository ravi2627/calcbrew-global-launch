import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { AdSection, SidebarAd } from "@/components/ads";
import { useUser } from "@/contexts/UserContext";

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedCalculator {
  name: string;
  href: string;
}

interface CalculatorLayoutProps {
  title: string;
  description: string;
  intro: string;
  category: string;
  categorySlug: string;
  formula: string;
  formulaExplanation: string;
  example: string;
  faqs: FAQItem[];
  relatedCalculators: RelatedCalculator[];
  children: React.ReactNode;
  canonicalUrl: string;
}

const CalculatorLayout = ({
  title,
  description,
  intro,
  category,
  categorySlug,
  formula,
  formulaExplanation,
  example,
  faqs,
  relatedCalculators,
  children,
  canonicalUrl,
}: CalculatorLayoutProps) => {
  const { isPro } = useUser();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Layout>
      <Helmet>
        <title>{title} | CalcBrew</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://calcbrew.com${canonicalUrl}`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/calculators" className="hover:text-primary transition-colors">
            Calculators
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/calculators/${categorySlug}`} className="hover:text-primary transition-colors">
            {category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-8">
            {/* Title & Intro */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {intro}
              </p>
            </div>

            {/* Calculator Component */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              {children}
            </div>

            {/* Formula Section */}
            <section className="bg-muted/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Formula Used
              </h2>
              <div className="bg-background border border-border rounded-lg p-4 mb-4">
                <code className="text-primary font-mono text-lg">{formula}</code>
              </div>
              <p className="text-muted-foreground">{formulaExplanation}</p>
            </section>

            {/* Example Section */}
            <section className="bg-muted/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Example Calculation
              </h2>
              <p className="text-muted-foreground whitespace-pre-line">{example}</p>
            </section>

            {/* Ad after result section */}
            {!isPro && <AdSection slot="calculator-after-result" />}

            {/* FAQ Section */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Calculators */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Related Calculators
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedCalculators.map((calc, index) => (
                  <Link
                    key={index}
                    to={calc.href}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <span className="text-foreground font-medium">{calc.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Ad after FAQ section */}
            {!isPro && <AdSection slot="calculator-after-faq" />}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <SidebarAd />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default CalculatorLayout;
