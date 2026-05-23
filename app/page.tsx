import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { SocialProofSection } from "@/components/landing/social-proof-section";
import { AiSystemsSection } from "@/components/landing/ai-systems-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ResultsSection } from "@/components/landing/results-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { WhyZyphronixSection } from "@/components/landing/why-zyphronix-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection />
      <SocialProofSection />
      <AiSystemsSection />
      <FeaturesSection />
      <ResultsSection />
      <HowItWorksSection />
      <DevelopersSection />
      <WhyZyphronixSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
