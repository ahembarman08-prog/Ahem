"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Clock, Target } from "lucide-react";

const stats = [
  {
    value: "450+",
    label: "Active Clients",
    icon: Users,
    metric: "businesses growing with us"
  },
  {
    value: "2.4M+",
    label: "Hours Saved",
    icon: Clock,
    metric: "of manual work eliminated"
  },
  {
    value: "$12M+",
    label: "Revenue Generated",
    icon: TrendingUp,
    metric: "for our clients"
  },
  {
    value: "340%",
    label: "Avg ROI",
    icon: Target,
    metric: "within 90 days"
  }
];

export function SocialProofSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, idx) => {
      const numericValue = parseInt(stat.value.replace(/[^\d]/g, ''));
      let currentCount = 0;

      return setInterval(() => {
        currentCount += Math.ceil(numericValue / 50);
        if (currentCount >= numericValue) {
          currentCount = numericValue;
          clearInterval(intervals[idx]);
        }
        setCounts(prev => ({ ...prev, [idx]: currentCount }));
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Trusted by Industry Leaders
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Results That Speak
            <br />
            <span className="text-muted-foreground">for Themselves</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real businesses, real growth, real impact. See what Zyphronix has delivered.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass p-8 rounded-xl hover-lift group"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div className="mb-6 inline-flex p-3 bg-gradient-cyan rounded-lg">
                  <Icon className="w-6 h-6 text-background" />
                </div>
                
                <div className="mb-4">
                  <p className="text-4xl font-display tracking-tight mb-2">
                    {counts[idx] || 0}{stat.value.includes('+') ? '+' : stat.value.includes('%') ? '%' : ''}
                  </p>
                  <p className="text-foreground/80 font-medium">{stat.label}</p>
                </div>
                
                <p className="text-sm text-muted-foreground">{stat.metric}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
