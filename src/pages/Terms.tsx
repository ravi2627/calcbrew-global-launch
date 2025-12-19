import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service - CalcBrew</title>
        <meta
          name="description"
          content="Read CalcBrew's terms of service to understand the rules and guidelines for using our free online calculator platform."
        />
        <link rel="canonical" href="https://calcbrew.com/terms" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using CalcBrew, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our service.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              CalcBrew provides free online calculators for various purposes including home 
              and construction, finance, business, health, and general utilities. Our 
              calculators are designed to provide accurate results based on industry-standard 
              formulas.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Use of Calculators</h2>
            <p className="text-muted-foreground mb-4">
              Our calculators are provided for informational and educational purposes. While 
              we strive for accuracy, the results should not be used as the sole basis for 
              financial, medical, legal, or other professional decisions. Always consult 
              qualified professionals for important decisions.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use automated tools to access the service excessively</li>
              <li>Copy or redistribute our calculators without permission</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The CalcBrew name, logo, and all content including calculators, designs, and 
              text are the property of CalcBrew or its licensors. You may not reproduce, 
              distribute, or create derivative works without our express permission.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              When CalcBrew Pro launches, you may need to create an account to access premium 
              features. You are responsible for maintaining the confidentiality of your 
              account credentials and for all activities under your account.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              CalcBrew is provided "as is" without warranties of any kind. We shall not be 
              liable for any direct, indirect, incidental, special, or consequential damages 
              resulting from your use of our service or reliance on calculation results.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Modifications to Service</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify, suspend, or discontinue any part of our service 
              at any time without notice. We may also update these Terms of Service 
              periodically.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed by and construed in accordance with applicable 
              laws, without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us at 
              legal@calcbrew.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
