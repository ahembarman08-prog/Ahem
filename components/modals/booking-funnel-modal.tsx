"use client";

import { useState } from "react";
import { X, Check, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AutomationOption = 
  | "lead-generation" 
  | "customer-support" 
  | "booking-systems" 
  | "ai-chatbots" 
  | "sales-automation" 
  | "workflow-automation";

const automationOptions: { id: AutomationOption; label: string; icon: string }[] = [
  { id: "lead-generation", label: "Lead Generation", icon: "🎯" },
  { id: "customer-support", label: "Customer Support", icon: "💬" },
  { id: "booking-systems", label: "Booking Systems", icon: "📅" },
  { id: "ai-chatbots", label: "AI Chatbots", icon: "🤖" },
  { id: "sales-automation", label: "Sales Automation", icon: "📈" },
  { id: "workflow-automation", label: "Workflow Automation", icon: "⚙️" },
];

export function BookingFunnelModal({ isOpen, onClose }: BookingFunnelModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationOption | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && selectedAutomation) {
      setStep(2);
    } else if (step === 2 && formData.name && formData.email) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-demo-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          ...formData,
          automation: selectedAutomation,
        }),
      });
      if (response.ok) {
        setStep(4);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3);
  };

  if (!isOpen) return null;

  const progressPercent = (step / 3) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-300">
        <div className="glass rounded-2xl p-8 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-accent/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>

          {/* Progress Bar */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-display text-foreground">
                  {step === 1 && "What would you like to automate?"}
                  {step === 2 && "Tell us about your business"}
                  {step === 3 && "Let's book your strategy call"}
                </h2>
                <span className="text-sm text-muted-foreground">Step {step} of 3</span>
              </div>
              <div className="h-1 bg-accent/20 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-cyan transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Automation Options */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {automationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAutomation(option.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover-lift ${
                      selectedAutomation === option.id
                        ? "border-accent bg-accent/10"
                        : "border-accent/20 hover:border-accent/40 bg-background/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-foreground">{option.label}</span>
                      {selectedAutomation === option.id && (
                        <Check className="w-5 h-5 text-accent ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <Button
                onClick={handleNext}
                disabled={!selectedAutomation}
                className="w-full gradient-cyan text-background h-12 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your Business"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your automation needs..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-accent/30 hover:bg-accent/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email}
                  className="flex-1 gradient-cyan text-background h-12 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Calendar Booking */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-mesh rounded-xl p-6 text-center">
                <h3 className="text-xl font-display text-foreground mb-2">
                  Let's build your AI system
                </h3>
                <p className="text-muted-foreground">
                  Schedule a 30-minute strategy call to discuss your automation needs.
                </p>
              </div>

              <div className="bg-background/50 border border-accent/20 rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Our team will reach out to confirm your preferred time
                </p>
                <div className="mb-6">
                  <p className="font-semibold text-foreground mb-2">Selected Automation:</p>
                  <p className="text-accent">
                    {automationOptions.find((o) => o.id === selectedAutomation)?.label}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-accent/30 hover:bg-accent/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 gradient-cyan text-background h-12 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Book Strategy Call"}
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-cyan rounded-full opacity-30 animate-pulse" />
                  <div className="absolute inset-2 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-background" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display text-foreground mb-2">
                  Your AI strategy session is booked!
                </h3>
                <p className="text-muted-foreground">
                  We'll analyze your business and identify automation opportunities that can help you save time and grow faster.
                </p>
              </div>

              <div className="bg-gradient-mesh rounded-xl p-4 border border-accent/20">
                <p className="text-sm text-muted-foreground mb-2">Confirmation email sent to:</p>
                <p className="font-semibold text-foreground">{formData.email}</p>
              </div>

              <Button
                onClick={onClose}
                className="w-full gradient-cyan text-background h-12 rounded-xl font-semibold hover:opacity-90"
              >
                Explore More Features
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
