import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "What is CalcBrew?",
    answer:
      "CalcBrew is a free online calculator platform offering 30+ specialized calculators for home, business, finance, health, and everyday calculations. Our tools use verified, industry-standard formulas to deliver accurate results instantly on any device.",
  },
  {
    question: "Are the calculators accurate?",
    answer:
      "Yes, all CalcBrew calculators use industry-standard formulas verified by domain experts. We regularly audit our calculations against authoritative sources and maintain transparent methodology so users can trust and verify results.",
  },
  {
    question: "Are all calculators free to use?",
    answer:
      "Yes, all CalcBrew calculators are completely free to use without any registration or sign-up required. We believe accurate calculations should be accessible to everyone. CalcBrew Pro offers additional features for power users who need advanced functionality.",
  },
  {
    question: "Can I use CalcBrew internationally?",
    answer:
      "Absolutely. CalcBrew is designed for global users with support for international units, measurements, and standards. Whether you're using metric or imperial units, our calculators adapt to your needs and work seamlessly worldwide.",
  },
  {
    question: "Do the calculators follow global standards?",
    answer:
      "Yes, our calculators comply with international standards and recognized formulas. Financial calculators use accepted banking and tax formulas, construction tools follow building industry norms, and health calculators align with medical institution guidelines.",
  },
  {
    question: "Is there a Pro version with advanced features?",
    answer:
      "Yes, CalcBrew Pro offers premium features including detailed calculation reports, saved calculation history, data export capabilities, and access to exclusive professional-grade calculators. Pro is designed for power users, businesses, and professionals who need enhanced functionality.",
  },
];

const FAQSection = () => {
  // Generate JSON-LD structured data for FAQ
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
    <section className="py-16 md:py-24 bg-background">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions about CalcBrew? Find answers to the most common 
            questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
