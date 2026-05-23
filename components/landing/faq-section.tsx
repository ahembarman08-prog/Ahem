"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How quickly will I see results?",
    answer: "Most customers see measurable results within the first week. You'll notice time savings immediately as repetitive tasks get automated, and lead generation improvements typically appear within 7-10 days as the system learns your business.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, absolutely. There are no long-term contracts. You can cancel your subscription anytime, no questions asked. Your data is yours—we'll help you export everything if you decide to leave.",
  },
  {
    question: "Do I need technical knowledge to use this?",
    answer: "Not at all. We handle the technical setup for you. You'll get training and support, and everything is designed to be simple and intuitive. If you ever get stuck, our support team is here to help.",
  },
  {
    question: "What if it doesn't work for my business?",
    answer: "We're confident you'll see results, but if you don't after your 3-day trial, just let us know. We'll work with you to adjust the setup or discuss options. Your success is our success.",
  },
  {
    question: "How does the 3-day trial work?",
    answer: "Your 3-day trial gives you full access to all features of your chosen plan. No credit card required. After 3 days, you can upgrade to a paid plan, extend your trial, or cancel—whatever works best for you.",
  },
  {
    question: "Can you integrate with my existing tools?",
    answer: "Yes. We integrate with most popular business tools like CRM systems, email platforms, and scheduling software. If you use something specific, let us know and we'll confirm compatibility or find a solution that works.",
  },
];

export function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", question: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(`New FAQ Question from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nQuestion:\n${formData.question}`
    );

    // Open mailto link
    window.location.href = `mailto:nexora.01801@gmail.com?subject=${subject}&body=${body}`;

    // Reset form and show message
    setTimeout(() => {
      setSubmitMessage("Thank you! Your question has been sent to our team. We'll get back to you shortly.");
      setFormData({ name: "", email: "", question: "" });
      setIsSubmitting(false);

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 500);
  };

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span
            className={`inline-flex items-center gap-3 text-sm font-mono text-accent mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-8 h-px bg-accent/30" />
            Common Questions
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Questions?
            <br />
            <span className="text-muted-foreground">We have answers.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                className={`w-full text-left p-6 transition-all duration-300 ${
                  expandedIndex === idx
                    ? "glass"
                    : "hover:glass"
                } border border-accent/10 hover:border-accent/30 rounded-lg group`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${
                      expandedIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedIndex === idx && (
                  <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                )}
              </button>
            ))}
          </div>

          {/* Contact Form */}
          <div className={`glass p-8 lg:p-10 rounded-lg transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <h3 className="text-2xl font-semibold text-foreground mb-2">Didn&apos;t find your answer?</h3>
            <p className="text-muted-foreground mb-8">
              Send us your question and we&apos;ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-background/50 border border-accent/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 bg-background/50 border border-accent/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="question" className="block text-sm font-medium text-foreground mb-2">
                  Your question
                </label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleFormChange}
                  required
                  placeholder="Tell us what you'd like to know..."
                  rows={4}
                  className="w-full px-4 py-2 bg-background/50 border border-accent/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-cyan text-background hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Question"}
              </Button>

              {submitMessage && (
                <p className="text-sm text-accent text-center mt-4 animate-pulse">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
