import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { AnimatedBackground } from "~/components/landing/AnimatedBackground";
import { HeroSection } from "~/components/landing/HeroSection";
import { FeatureCards } from "~/components/landing/FeatureCards";
import { Button } from "~/components/ui/Button";

export const meta: MetaFunction = () => {
  return [
    { title: "Relationship Mojo - Discover Your Relationship Style" },
    { name: "description", content: "AI-powered relationship analysis to help you understand your relationship patterns and tendencies." },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] relative overflow-hidden">
      <Header />

      <main className="relative z-10">
        <div className="container mx-auto px-4 mobile:px-6">
          {/* Simple Hero Section */}
          <section className="py-16 lg:py-24 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Discover Your Relationship Mojo
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                AI-powered relationship analysis to help you understand your patterns and build stronger connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/assessment/intro">
                  <Button variant="secondary" size="lg" className="min-w-[240px]">
                    Start Free Assessment →
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="min-w-[240px]">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Why Choose Relationship Mojo?
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Discover the science-backed approach to understanding your relationship patterns
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {[
                  {
                    icon: "🧠",
                    title: "Science-Based Analysis",
                    description: "Built on established psychological frameworks including Attachment Theory and Love Languages"
                  },
                  {
                    icon: "🎯",
                    title: "Personalized Insights",
                    description: "Get tailored recommendations based on your unique relationship patterns and communication style"
                  },
                  {
                    icon: "🔒",
                    title: "Private & Secure",
                    description: "Your data is encrypted and private. Take the assessment anonymously if you prefer"
                  },
                  {
                    icon: "📊",
                    title: "Comprehensive Assessment",
                    description: "50 carefully crafted questions covering attachment style, communication, and emotional intelligence"
                  },
                  {
                    icon: "💡",
                    title: "Actionable Advice",
                    description: "Receive specific strategies and tips to improve your relationships and communication"
                  },
                  {
                    icon: "🚀",
                    title: "Instant Results",
                    description: "Get your detailed analysis immediately after completing the assessment"
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/8 backdrop-blur-md rounded-3xl p-8 text-center text-white border border-white/15 shadow-2xl hover:bg-white/12 transition-all duration-300"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-[#FFCC00]/25 to-[#B13BFF]/25 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/25">
                      <span className="text-4xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Relationships?
                </h2>
                <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands who have discovered their relationship patterns and built stronger, more fulfilling connections.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/assessment/intro">
                    <Button variant="secondary" size="lg" className="min-w-[240px]">
                      Start Free Assessment →
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="min-w-[240px]">
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex flex-wrap justify-center items-center gap-6 text-white/70">
                    {[
                      { text: "100% Free", color: "#FFCC00" },
                      { text: "Science-Based", color: "#B13BFF" },
                      { text: "Private & Secure", color: "#10B981" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm sm:text-base font-medium">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}