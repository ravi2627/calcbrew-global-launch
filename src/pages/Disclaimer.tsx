import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const Disclaimer = () => {
  return (
    <Layout>
      <Helmet>
        <title>Disclaimer - CalcBrew</title>
        <meta
          name="description"
          content="Read CalcBrew's disclaimer about calculator accuracy and appropriate use of our free online tools for informational purposes."
        />
        <link rel="canonical" href="https://calcbrew.com/disclaimer" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1 className="text-4xl font-bold text-foreground mb-8">Disclaimer</h1>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">General Information</h2>
            <p className="text-muted-foreground mb-4">
              The calculators and information provided on CalcBrew are for general 
              informational and educational purposes only. While we make every effort to 
              ensure accuracy, we make no representations or warranties of any kind, express 
              or implied, about the completeness, accuracy, reliability, or suitability of 
              the information and calculations provided.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Not Professional Advice</h2>
            <p className="text-muted-foreground mb-4">
              The results from our calculators should not be construed as professional 
              advice. Specifically:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>
                <strong>Financial Calculators:</strong> Results are not financial advice. 
                Consult a qualified financial advisor for investment, mortgage, or tax 
                decisions.
              </li>
              <li>
                <strong>Health Calculators:</strong> Results are not medical advice. Consult 
                a healthcare professional for health-related decisions.
              </li>
              <li>
                <strong>Construction Calculators:</strong> Results are estimates only. Consult 
                qualified contractors and engineers for actual projects.
              </li>
              <li>
                <strong>Business Calculators:</strong> Results are not business or legal 
                advice. Consult appropriate professionals for business decisions.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Accuracy Limitations</h2>
            <p className="text-muted-foreground mb-4">
              While CalcBrew uses industry-standard formulas verified by experts, calculation 
              results may vary from actual outcomes due to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Rounding differences in calculations</li>
              <li>Variations in regional standards and regulations</li>
              <li>Changes in tax laws, interest rates, or other variables</li>
              <li>Simplifications made for usability</li>
              <li>User input errors</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">User Responsibility</h2>
            <p className="text-muted-foreground mb-4">
              You are solely responsible for verifying the accuracy of any calculations 
              before making decisions based on them. We recommend cross-referencing 
              important calculations with multiple sources and consulting qualified 
              professionals.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">No Liability</h2>
            <p className="text-muted-foreground mb-4">
              CalcBrew, its owners, employees, and affiliates shall not be held liable for 
              any loss, damage, or inconvenience arising from the use of our calculators 
              or reliance on the information provided. This includes but is not limited to 
              financial losses, personal injury, property damage, or any other damages.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">External Links</h2>
            <p className="text-muted-foreground mb-4">
              Our website may contain links to external websites. We have no control over 
              the content and nature of these sites and are not responsible for their 
              content, privacy policies, or practices.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Changes to Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify this disclaimer at any time. Changes will be 
              effective immediately upon posting on this page. Your continued use of 
              CalcBrew after changes constitutes acceptance of the modified disclaimer.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this disclaimer, please contact us at 
              legal@calcbrew.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
