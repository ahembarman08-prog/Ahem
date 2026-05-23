"use client";

import { CheckCircle2, Zap, Heart, Trophy } from "lucide-react";

const reasons = [
  {
    icon: Trophy,
    title: "Proven Track Record",
    description: "450+ clients. 2.4M hours saved. $12M in revenue generated. We deliver results, not just promises."
  },
  {
    icon: Zap,
    title: "Implementation in Days",
    description: "Not months. You see results in your first week. Our 3-day free trial proves it."
  },
  {
    icon: Heart,
    title: "Human Support Team",
    description: "No AI chatbots for support. Real people, real expertise. We're in your corner."
  },
  {
    icon: CheckCircle2,
    title: "No Hidden Fees",
    description: "Transparent pricing. 30-day money-back guarantee. Cancel anytime, no penalties."
  }
];

export function WhyZyphronixSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Why Choose Zyphronix
            </span>
            <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-6">
              Built for businesses
              <br />
              <span className="text-muted-foreground">that don't settle</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're not another software company. We're a partner in your growth. Your success is our only metric.
            </p>
          </div>

          <div className="space-y-6">
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div
                  key={idx}
                  className="glass p-6 rounded-xl hover-lift group"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg gradient-cyan">
                        <Icon className="h-6 w-6 text-background" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-display mb-4">
            Stop wasting time. Start seeing results.
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Your first 3 days are free. No credit card. No commitment. See what's possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="gradient-cyan text-background px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
              Start Free Trial
            </button>
            <button className="border border-accent/30 text-foreground px-8 py-3 rounded-full font-medium hover:bg-accent/5 transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
