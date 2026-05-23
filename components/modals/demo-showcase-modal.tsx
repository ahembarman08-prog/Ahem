"use client";

import { useState } from "react";
import { X, MessageCircle, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DemoTab = "chatbot" | "workflow" | "dashboard";

export function DemoShowcaseModal({ isOpen, onClose }: DemoShowcaseModalProps) {
  const [activeTab, setActiveTab] = useState<DemoTab>("chatbot");
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "Hi! 👋 How can I help you today?" },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: messageInput },
      { role: "bot", text: "Thanks for your message! Our AI is processing your request..." },
    ]);
    setMessageInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto">
        <div className="glass rounded-2xl p-8 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-accent/20 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-display text-foreground mb-2">
              AI Automation in Action
            </h2>
            <p className="text-muted-foreground">
              See how our AI systems transform your business operations
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-background/50 p-2 rounded-xl border border-accent/20">
            <button
              onClick={() => setActiveTab("chatbot")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === "chatbot"
                  ? "bg-accent text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              AI Chatbot
            </button>
            <button
              onClick={() => setActiveTab("workflow")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === "workflow"
                  ? "bg-accent text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Zap className="w-4 h-4" />
              Workflow
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === "dashboard"
                  ? "bg-accent text-background"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </button>
          </div>

          {/* Content */}
          {activeTab === "chatbot" && (
            <div className="space-y-4">
              <div className="bg-background/50 border border-accent/20 rounded-xl p-4 h-64 flex flex-col overflow-y-auto">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-xs ${
                        msg.role === "user"
                          ? "bg-accent/20 text-foreground"
                          : "bg-accent/10 border border-accent/30 text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
                <Button
                  onClick={handleSendMessage}
                  className="gradient-cyan text-background px-6 rounded-lg hover:opacity-90"
                >
                  Send
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                This is a live demo showcasing our AI chatbot capabilities. Your business can automate customer conversations 24/7.
              </p>
            </div>
          )}

          {activeTab === "workflow" && (
            <div className="space-y-4">
              <div className="bg-gradient-mesh rounded-xl p-6 border border-accent/20">
                <h3 className="font-semibold text-foreground mb-4">Automated Lead Pipeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Lead Capture</p>
                      <p className="text-xs text-muted-foreground">AI identifies qualified leads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Qualification</p>
                      <p className="text-xs text-muted-foreground">Automated scoring and analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Engagement</p>
                      <p className="text-xs text-muted-foreground">Personalized follow-ups sent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Conversion</p>
                      <p className="text-xs text-muted-foreground">Ready to close deals</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background/50 border border-accent/20 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  Watch how our automation system processes thousands of leads daily, qualifying and nurturing them automatically while your team focuses on closing deals.
                </p>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 border border-accent/20 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">Leads Generated</p>
                  <p className="text-2xl font-bold text-accent">1,247</p>
                  <p className="text-xs text-green-400 mt-1">↑ 45% vs last month</p>
                </div>
                <div className="bg-background/50 border border-accent/20 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">Automation Rate</p>
                  <p className="text-2xl font-bold text-accent">89%</p>
                  <p className="text-xs text-green-400 mt-1">Tasks automated</p>
                </div>
                <div className="bg-background/50 border border-accent/20 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">Response Time</p>
                  <p className="text-2xl font-bold text-accent">2.3s</p>
                  <p className="text-xs text-green-400 mt-1">Average</p>
                </div>
                <div className="bg-background/50 border border-accent/20 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">Cost Saved</p>
                  <p className="text-2xl font-bold text-accent">$15.2k</p>
                  <p className="text-xs text-green-400 mt-1">Monthly</p>
                </div>
              </div>

              <div className="bg-gradient-mesh rounded-xl p-4 border border-accent/20">
                <p className="text-sm text-muted-foreground">
                  Real-time analytics dashboard showing the impact of AI automation on your business metrics. Track performance, ROI, and optimization opportunities instantly.
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-accent/20">
            <Button
              onClick={onClose}
              className="w-full gradient-cyan text-background h-12 rounded-xl font-semibold hover:opacity-90"
            >
              Ready to see this for your business?
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Book a demo to see how Zyphronix can transform your operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
