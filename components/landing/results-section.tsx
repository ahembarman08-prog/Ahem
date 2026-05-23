"use client";

import { useRef, useEffect, useState } from "react";

const results = [
  {
    metric: "15 hours",
    label: "Saved per week",
    description: "Automated repetitive tasks mean your team focuses on strategy and growth"
  },
  {
    metric: "3x",
    label: "More qualified leads",
    description: "AI identifies and engages high-potential prospects automatically"
  },
  {
    metric: "90%",
    label: "Faster responses",
    description: "Customers get instant answers instead of waiting for human replies"
  },
  {
    metric: "45%",
    label: "More bookings",
    description: "Always-on availability captures opportunities you'd normally miss"
  }
];

export function ResultsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(results.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, idx) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[idx] = true;
              return newVisible;
            });
            observer.unobserve(ref);
          }
        },
        { threshold: 0.3 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 -left-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Real Results.
            <br />
            <span className="text-muted-foreground">Measurable Impact.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These aren't promises. These are the actual results our clients see within 30 days of implementation.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {results.map((result, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              className={`group relative p-8 rounded-2xl overflow-hidden transition-all duration-500 ${
                visibleCards[idx]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`
              }}
            >
              {/* Background glass effect */}
              <div className="absolute inset-0 glass -z-10"></div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 ${
                  idx % 2 === 0 ? "bg-gradient-cyan/10" : "bg-gradient-purple/10"
                }`}></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className={`text-5xl lg:text-6xl font-display tracking-tight mb-2 ${
                  idx % 2 === 0 ? "text-transparent bg-clip-text bg-gradient-cyan" : "text-transparent bg-clip-text bg-gradient-purple"
                }`}>
                  {result.metric}
                </p>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  {result.label}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-px ${
                idx % 2 === 0 ? "bg-gradient-cyan" : "bg-gradient-purple"
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
