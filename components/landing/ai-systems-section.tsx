"use client";

import { useState, useRef, useEffect } from "react";
import { Zap, Brain, BarChart3, Shield } from "lucide-react";

const systems = [
  {
    name: "The Lead Engine",
    description: "Generates qualified prospects automatically. Identifies high-intent leads, qualifies them in real-time, and moves them through your pipeline.",
    icon: Zap,
    benefits: ["30-50 new leads/week", "90% qualification accuracy", "24/7 operation"],
    color: "cyan"
  },
  {
    name: "The Receptionist",
    description: "Your AI customer service agent. Answers questions, books appointments, handles inquiries instantly—no team required.",
    icon: Brain,
    benefits: ["Instant responses", "Multi-language support", "CRM integration"],
    color: "purple"
  },
  {
    name: "The Pipeline Manager",
    description: "Automates your entire sales process. Tracks deals, sends follow-ups, predicts closures, and identifies at-risk deals before they slip away.",
    icon: BarChart3,
    benefits: ["Deal tracking", "Smart follow-ups", "Revenue forecasting"],
    color: "cyan"
  },
  {
    name: "The Compliance Guard",
    description: "Ensures every interaction meets your requirements. Monitors conversations, enforces guidelines, and maintains audit trails automatically.",
    icon: Shield,
    benefits: ["Rule enforcement", "Audit logging", "Compliance verified"],
    color: "purple"
  }
];

export function AiSystemsSection() {
  const [selectedSystem, setSelectedSystem] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            Intelligent Systems
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Your Entire Business
            <br />
            <span className="text-muted-foreground">Automated</span>
          </h2>
        </div>

        {/* Systems Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* System Cards */}
          <div className="space-y-4">
            {systems.map((system, idx) => {
              const Icon = system.icon;
              const isSelected = selectedSystem === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSystem(idx)}
                  className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                    isSelected
                      ? system.color === "cyan"
                        ? "glass glow-cyan"
                        : "glass glow-purple"
                      : "glass hover:border-accent/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        system.color === "cyan"
                          ? "gradient-cyan"
                          : "gradient-purple"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-background" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg mb-2">{system.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {system.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed View */}
          <div
            className="glass-dark p-10 rounded-2xl min-h-[400px] flex flex-col justify-between"
            key={selectedSystem}
          >
            <div>
              <div className="flex items-start gap-4 mb-8">
                <div
                  className={`p-4 rounded-xl ${
                    systems[selectedSystem].color === "cyan"
                      ? "gradient-cyan"
                      : "gradient-purple"
                  }`}
                >
                  {(() => {
                    const Icon = systems[selectedSystem].icon;
                    return <Icon className="w-8 h-8 text-background" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-display">
                    {systems[selectedSystem].name}
                  </h3>
                </div>
              </div>

              <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
                {systems[selectedSystem].description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-mono text-accent mb-4 uppercase">
                What You Get
              </h4>
              <ul className="space-y-3">
                {systems[selectedSystem].benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
