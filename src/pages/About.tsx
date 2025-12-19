import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calculator, Users, Globe, Target } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About CalcBrew - Our Mission & Story</title>
        <meta
          name="description"
          content="Learn about CalcBrew's mission to provide accurate, free online calculators for users worldwide. Discover our commitment to precision and accessibility."
        />
        <link rel="canonical" href="https://calcbrew.com/about" />
      </Helmet>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">
                About CalcBrew
              </h1>
              <p className="text-xl text-muted-foreground">
                Brewing accurate calculations for millions of users worldwide.
              </p>
            </div>

            {/* Mission */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                CalcBrew was founded with a simple but powerful mission: to make accurate 
                calculations accessible to everyone, everywhere, for free. We believe that 
                whether you're a homeowner planning a renovation, a student solving math 
                problems, or a business owner analyzing finances, you deserve tools that 
                are precise, easy to use, and always available.
              </p>
              <p className="text-lg text-muted-foreground">
                Too many calculator websites are cluttered, slow, or inaccurate. We built 
                CalcBrew to be different — a clean, fast, and reliable platform where every 
                calculation is verified and every user experience is prioritized.
              </p>
            </div>

            {/* Values */}
            <div className="grid gap-6 md:grid-cols-2 mb-16">
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Accuracy First</h3>
                <p className="text-muted-foreground">
                  Every formula is verified by experts and tested rigorously. We use 
                  industry-standard calculations that professionals trust.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">User-Centered Design</h3>
                <p className="text-muted-foreground">
                  We design for real people, not tech demos. Every feature exists because 
                  users need it, not because it looks impressive.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Global Accessibility</h3>
                <p className="text-muted-foreground">
                  CalcBrew works for users worldwide with support for international 
                  units, standards, and measurements across all calculators.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Always Free</h3>
                <p className="text-muted-foreground">
                  Core calculators are free forever. No hidden paywalls, no forced 
                  sign-ups, no tricks. Accurate calculations should be a right, not a privilege.
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                CalcBrew started when we noticed a gap in the online calculator space. 
                Most tools were either inaccurate, loaded with ads, or required 
                unnecessary sign-ups. We knew there had to be a better way.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                We assembled a team of developers, mathematicians, and industry experts 
                to build a platform that prioritizes accuracy and usability above all else. 
                Every calculator goes through rigorous testing and validation before it 
                reaches our users.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, CalcBrew serves users from over 150 countries, processing millions 
                of calculations every month. We're just getting started, with new 
                calculators and features being added regularly based on user feedback.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center p-8 rounded-2xl bg-primary/5 border border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Ready to Start Calculating?
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore our collection of 30+ free, accurate calculators.
              </p>
              <Button size="lg" asChild>
                <Link to="/calculators">Browse All Calculators</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
