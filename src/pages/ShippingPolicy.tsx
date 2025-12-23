import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const ShippingPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Shipping Policy - CalcBrew</title>
        <meta
          name="description"
          content="CalcBrew shipping policy. We are a digital SaaS product with no physical shipping. Access is provided instantly after payment."
        />
        <link rel="canonical" href="https://calcbrew.com/shipping-policy" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Shipping Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  No Physical Shipping
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  CalcBrew is a 100% digital product. We do not sell, ship, or deliver any physical goods. There are no shipping charges, delivery times, or physical addresses required for our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Digital SaaS Product
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  CalcBrew is a Software-as-a-Service (SaaS) platform that provides online calculator tools and premium features. All our services are delivered digitally through our web platform accessible at calcbrew.com.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Instant Digital Access
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Upon successful payment for any CalcBrew subscription or service:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access to premium features is granted immediately</li>
                  <li>No waiting period or shipping time required</li>
                  <li>You can start using all features right away</li>
                  <li>A confirmation email will be sent to your registered email address</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  How to Access Your Subscription
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  After completing your purchase, simply log in to your CalcBrew account to access all premium features. Your subscription status and features will be automatically updated in your dashboard.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Service Availability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our digital services are available 24/7 from anywhere in the world with an internet connection. There are no geographical restrictions on accessing CalcBrew.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about accessing our digital services, please contact us at:
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

export default ShippingPolicy;
