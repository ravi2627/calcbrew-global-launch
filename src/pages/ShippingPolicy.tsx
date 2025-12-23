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
              Shipping & Delivery Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated on Dec 23 2025
            </p>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Orders are shipped within Not Applicable or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                RAVI KUMAR SHARMA is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within Not Applicable from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                For any issues in utilizing our services you may contact our helpdesk on{" "}
                <a href="tel:8168262790" className="text-primary hover:underline">8168262790</a> or{" "}
                <a href="mailto:support@calcbrew.com" className="text-primary hover:underline">support@calcbrew.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShippingPolicy;
