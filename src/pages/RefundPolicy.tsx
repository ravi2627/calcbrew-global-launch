import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Refund Policy - CalcBrew</title>
        <meta
          name="description"
          content="CalcBrew refund policy for subscription-based digital services. Learn about our refund terms for Pro subscriptions."
        />
        <link rel="canonical" href="https://calcbrew.com/refund-policy" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Refund Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  About Our Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  CalcBrew is a subscription-based digital service that provides access to premium calculator tools and features. We offer a Software-as-a-Service (SaaS) product with no physical goods involved.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Digital Product Notice
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is entirely digital. There are no physical products, shipments, or deliveries associated with any CalcBrew subscription or purchase. Upon successful payment, you receive instant access to our premium features.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Refund Eligibility
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Due to the nature of digital services, refunds are generally not provided once access has been granted. However, we may issue refunds in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>You were charged mistakenly or in error</li>
                  <li>Duplicate charges for the same subscription period</li>
                  <li>Technical issues on our end that prevented you from accessing the service</li>
                  <li>Unauthorized transactions (subject to verification)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  How to Request a Refund
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you believe you are eligible for a refund, please contact us within 7 days of the transaction with your payment details and reason for the refund request. We will review your case and respond within 5-7 business days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Subscription Cancellation
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may cancel your subscription at any time from your dashboard. Upon cancellation, you will retain access to premium features until the end of your current billing period. No partial refunds are provided for unused subscription time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For refund requests or questions about this policy, please contact us at:
                </p>
                <p className="text-foreground font-medium mt-2">
                  Email: support@calcbrew.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
