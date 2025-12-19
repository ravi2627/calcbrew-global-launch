import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy - CalcBrew</title>
        <meta
          name="description"
          content="CalcBrew's privacy policy explains how we handle your data. We prioritize your privacy and don't collect personal information for basic calculator use."
        />
        <link rel="canonical" href="https://calcbrew.com/privacy-policy" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              CalcBrew ("we," "our," or "us") is committed to protecting your privacy. This 
              Privacy Policy explains how we collect, use, and safeguard your information 
              when you use our website and calculator tools.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Calculator Usage:</strong> When you use our calculators, the calculations 
              are performed locally in your browser. We do not store your calculation inputs 
              or results on our servers unless you explicitly save them (Pro feature).
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Analytics Data:</strong> We collect anonymized usage analytics to improve 
              our service, including pages visited, time spent, and general geographic location. 
              This data cannot be used to identify you personally.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Contact Information:</strong> If you contact us through our contact form, 
              we collect your name, email address, and message content to respond to your inquiry.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Provide and improve our calculator services</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Data Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may 
              share anonymized, aggregate data with partners for analytics purposes.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use essential cookies to ensure our website functions properly. Analytics 
              cookies help us understand how visitors interact with our site. You can disable 
              cookies in your browser settings, though some features may not work as intended.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of analytics tracking</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your data. However, 
              no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy periodically. We will notify you of significant 
              changes by posting the new policy on this page with an updated date.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy, please contact us at 
              privacy@calcbrew.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
