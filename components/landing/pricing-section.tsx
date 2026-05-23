"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { GetStartedModal } from "@/components/modals/get-started-modal";

const plans = [
  {
    name: "Starter",
    description: "For small businesses getting started",
    price: { monthly: 299, annual: 249 },
    features: [
      "Answer customer messages 24/7",
      "Capture and organize leads",
      "Basic automations",
      "Email support",
      "Easy setup included",
      "Monthly performance reports",
    ],
    cta: "Start 3-day free trial",
    mailtoSubject: "I'm interested in the Starter plan",
    mailtoBody: "Hi,\n\nI'm interested in starting a 3-day free trial of your Starter plan ($299/month).\n\nPlease let me know how to get started.\n\nThanks!",
    popular: false,
  },
  {
    name: "Accelerator",
    description: "For businesses ready to scale",
    price: { monthly: 799, annual: 699 },
    features: [
      "Everything in Starter, plus:",
      "Unlimited customer conversations",
      "Advanced lead qualification",
      "Custom workflows for your business",
      "Priority support—we answer fast",
      "Detailed analytics to track ROI",
      "Direct email support",
      "Personal setup & training call",
    ],
    cta: "Start 3-day free trial",
    mailtoSubject: "I'm interested in the Accelerator plan",
    mailtoBody: "Hi,\n\nI'm interested in starting a 3-day free trial of your Accelerator plan ($799/month).\n\nI'd love to learn more about the custom workflows and advanced features.\n\nThanks!",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For serious growth and scale",
    price: { monthly: null, annual: null },
    features: [
      "Everything in Accelerator, plus:",
      "Custom solutions built for you",
      "Dedicated support person",
      "Integration with your exact systems",
      "Advanced security & compliance",
      "Custom workflows & training",
      "Guaranteed response times",
      "Monthly strategy calls",
    ],
    cta: "Talk to our team",
    mailtoSubject: "Enterprise plan inquiry",
    mailtoBody: "Hi,\n\nI'm interested in learning more about your Enterprise plan and would like to discuss custom solutions for my business.\n\nPlease get in touch at your earliest convenience.\n\nThanks!",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-accent uppercase block mb-6">
            Pricing That Works For You
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Pick a plan. Get results.
            <br />
            <span className="text-stroke">No surprises.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Start with a free 3-day trial. No credit card needed. All plans include setup and support. Cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className={`text-sm transition-colors ${
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-foreground/10 rounded-full p-1 transition-colors hover:bg-foreground/20"
          >
            <div
              className={`w-5 h-5 bg-foreground rounded-full transition-transform duration-300 ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm transition-colors ${
              isAnnual ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Annual
          </span>
          {isAnnual && (
            <span className="ml-2 px-2 py-1 bg-foreground text-primary-foreground text-xs font-mono">
              Save 17%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl lg:text-6xl text-foreground">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <span className="font-display text-4xl text-foreground">Custom</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {isSignedIn ? (
                <a
                  href={`mailto:nexora.01801@gmail.com?subject=${encodeURIComponent(plan.mailtoSubject)}&body=${encodeURIComponent(plan.mailtoBody)}`}
                  className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group block text-center ${
                    plan.popular
                      ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                      : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <button
                  onClick={() => setShowGetStarted(true)}
                  className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group block text-center ${
                    plan.popular
                      ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                      : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          All plans include automatic updates, HTTPS, and DDoS protection.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Compare all features
          </a>
        </p>
      </div>

      <GetStartedModal
        isOpen={showGetStarted}
        onClose={() => setShowGetStarted(false)}
      />
    </section>
  );
}
