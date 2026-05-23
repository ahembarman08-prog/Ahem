"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  businessType: string;
  teamSize: string;
  preferredTime: string;
  date: string;
  country: string;
}

export const DemoBookingModal = ({
  isOpen,
  onClose,
}: DemoBookingModalProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
    businessType: "",
    teamSize: "",
    preferredTime: "",
    date: "",
    country: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-demo-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
          setFormData({
            name: user?.name || "",
            email: user?.email || "",
            businessType: "",
            teamSize: "",
            preferredTime: "",
            date: "",
            country: "",
          });
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.log("[v0] Error submitting demo booking:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-accent/20 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-foreground/60 hover:text-foreground" />
        </button>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-3xl font-display tracking-tight mb-2">
            Schedule Your Demo
          </h2>
          <p className="text-muted-foreground">
            Tell us about your business. We&apos;ll show you exactly how we can help.
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center">
            <p className="text-foreground font-medium mb-2">
              Demo booking confirmed!
            </p>
            <p className="text-muted-foreground text-sm">
              Check your email for confirmation. We&apos;ll be in touch soon.
            </p>
          </div>
        ) : submitStatus === "error" ? (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center mb-6">
            <p className="text-destructive font-medium">
              Something went wrong. Please try again or contact us at nexora.01801@gmail.com
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {/* Business Type */}
            <div>
              <label
                htmlFor="businessType"
                className="block text-sm font-medium mb-2"
              >
                Type of Business *
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
                className="w-full bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select your business type</option>
                <option value="e-commerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="services">Services</option>
                <option value="agency">Agency</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="real-estate">Real Estate</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Team Size */}
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium mb-2">
                Team Size / Employees *
              </label>
              <select
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                required
                className="w-full bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select team size</option>
                <option value="solo">Solo / Self-employed</option>
                <option value="1-5">1-5 employees</option>
                <option value="6-20">6-20 employees</option>
                <option value="21-50">21-50 employees</option>
                <option value="51-100">51-100 employees</option>
                <option value="100+">100+ employees</option>
              </select>
            </div>

            {/* Preferred Time */}
            <div>
              <label
                htmlFor="preferredTime"
                className="block text-sm font-medium mb-2"
              >
                Preferred Time (Your Timezone) *
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                required
                className="w-full bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select preferred time</option>
                <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
                <option value="13:00-14:00">1:00 PM - 2:00 PM</option>
                <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={today}
                className="w-full bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full bg-background/50 border border-accent/20 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="United States"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-cyan text-background rounded-lg py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Booking your demo...
                </div>
              ) : (
                "Confirm Demo Booking"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
