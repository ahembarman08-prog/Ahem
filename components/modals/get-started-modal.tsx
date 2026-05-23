"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/auth-context";
import { X } from "lucide-react";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal = ({ isOpen, onClose }: GetStartedModalProps) => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignInSuccess = (credentialResponse: any) => {
    setIsLoading(true);
    signIn(credentialResponse);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 500);
  };

  const handleSignInError = () => {
    console.log("[v0] Sign in failed");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="glass rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95 duration-300">
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
          <h2 className="text-3xl font-display tracking-tight mb-3">
            Get Started
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Sign in to access your personalized plans and book a demo. No credit card needed.
          </p>
        </div>

        {/* Sign in button */}
        <div className="mb-6">
          <GoogleLogin
            onSuccess={handleSignInSuccess}
            onError={handleSignInError}
            theme="dark"
            size="large"
            locale="en"
            text="signin"
          />
        </div>

        {/* Info */}
        <div className="pt-6 border-t border-accent/10">
          <p className="text-xs text-muted-foreground text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
