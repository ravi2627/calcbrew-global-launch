import { Helmet } from "react-helmet-async";

/**
 * GlobalSEO Component
 * 
 * Adds Organization and WebSite structured data (JSON-LD)
 * for enhanced search engine visibility.
 */
const GlobalSEO = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CalcBrew",
    url: "https://calcbrew.com",
    logo: "https://calcbrew.com/logo.png",
    description:
      "CalcBrew provides 30+ free, accurate online calculators for home, business, finance, health, and everyday decisions.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@calcbrew.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CalcBrew",
    url: "https://calcbrew.com",
    description:
      "Smart, accurate calculators for home, business, and everyday decisions — built for global users.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://calcbrew.com/calculators?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      {/* Default meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563EB" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph defaults */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="CalcBrew" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter defaults */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@calcbrew" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default GlobalSEO;
