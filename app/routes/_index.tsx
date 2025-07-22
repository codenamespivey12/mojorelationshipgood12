import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
// import { motion } from "framer-motion"; // Temporarily disabled for deployment
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
// import { AnimatedBackground } from "~/components/landing/AnimatedBackground"; // Temporarily disabled
// import { HeroSection } from "~/components/landing/HeroSection"; // Temporarily disabled
// import { FeatureCards } from "~/components/landing/FeatureCards"; // Temporarily disabled
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Animated background */}
        <AnimatedBackground />
        
        {/* Main content */}
        <div className="relative z-10">
          {/* Hero section - Mobile-first stacked, Desktop split-screen */}
          <section className="min-h-screen flex items-center">
            <div className="container mx-auto px-4 mobile:px-6 py-12 mobile:py-16 tablet:py-20 lg:py-24">
              {/* Enhanced responsive layout */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mobile:gap-10 tablet:gap-12 lg:gap-16 xl:gap-20">
                {/* Hero content - Responsive sizing */}
                <div className="flex-1 lg:max-w-2xl xl:max-w-3xl text-center lg:text-left">
                  <HeroSection />
                </div>
                
                {/* Desktop: Enhanced visual element */}
                <motion.div
                  className="hidden lg:flex flex-1 justify-center items-center lg:max-w-lg xl:max-w-xl"
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="relative w-full max-w-md">
                    {/* Main floating visualization */}
                    <motion.div
                      className="w-80 h-80 xl:w-96 xl:h-96 rounded-full bg-gradient-to-br from-[#FFCC00]/15 to-[#B13BFF]/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div
                        className="w-60 h-60 xl:w-72 xl:h-72 rounded-full bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm border border-white/15 flex items-center justify-center"
                        animate={{
                          rotate: [360, 0],
                        }}
                        transition={{
                          duration: 18,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <motion.div 
                          className="text-center text-white"
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          <motion.div 
                            className="text-6xl xl:text-7xl mb-4"
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          >
                            💝
                          </motion.div>
                          <div className="text-lg xl:text-xl font-semibold bg-gradient-to-r from-[#FFCC00] to-[#B13BFF] bg-clip-text text-transparent">
                            Discover
                          </div>
                          <div className="text-sm xl:text-base opacity-80">Your Love Style</div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Enhanced orbiting elements */}
                    {[
                      { emoji: "🧠", color: "#FFCC00" },
                      { emoji: "💬", color: "#B13BFF" },
                      { emoji: "❤️", color: "#471396" },
                      { emoji: "🎯", color: "#FFCC00" },
                      { emoji: "✨", color: "#B13BFF" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-14 h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-white/25 shadow-lg"
                        style={{
                          top: "50%",
                          left: "50%",
                          transformOrigin: "0 0",
                          backgroundColor: `${item.color}15`,
                        }}
                        animate={{
                          rotate: [0, 360],
                          x: Math.cos((index * 72 * Math.PI) / 180) * (220 + index * 10),
                          y: Math.sin((index * 72 * Math.PI) / 180) * (220 + index * 10),
                        }}
                        transition={{
                          duration: 12 + index * 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.span 
                          className="text-xl xl:text-2xl"
                          animate={{
                            rotate: [360, 0],
                          }}
                          transition={{
                            duration: 12 + index * 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {item.emoji}
                        </motion.span>
                      </motion.div>
                    ))}
                    
                    {/* Additional floating particles */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={`float-particle-${i}`}
                        className="absolute w-2 h-2 bg-white/40 rounded-full"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          x: [0, Math.sin(i) * 10, 0],
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 4 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Features section with enhanced spacing */}
          <section className="py-12 mobile:py-16 tablet:py-20 lg:py-24 xl:py-32">
            <div className="container mx-auto px-4 mobile:px-6">
              <FeatureCards />
            </div>
          </section>
          
          {/* Enhanced call-to-action section */}
          <section className="py-12 mobile:py-16 tablet:py-20 lg:py-24 xl:py-32">
            <div className="container mx-auto px-4 mobile:px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-4xl mx-auto"
              >
                <motion.h2 
                  className="text-3xl mobile:text-4xl tablet:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Ready to Discover Your{" "}
                  <span className="bg-gradient-to-r from-[#FFCC00] to-[#B13BFF] bg-clip-text text-transparent">
                    Relationship Style
                  </span>
                  ?
                </motion.h2>
                
                <motion.p 
                  className="text-lg mobile:text-xl tablet:text-2xl text-white/85 mb-8 lg:mb-12 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Join thousands who have gained valuable insights into their relationship patterns. 
                  Take the first step towards better connections today.
                </motion.p>
                
                <motion.div
                  className="flex flex-col mobile:flex-row gap-4 mobile:gap-6 justify-center items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link to="/assessment">
                    <Button variant="secondary" size="lg" className="min-w-[220px] mobile:min-w-[240px]">
                      <motion.span
                        className="flex items-center gap-2"
                        whileHover={{
                          x: [0, 5, 0],
                          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                        }}
                      >
                        Start Free Assessment
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          →
                        </motion.span>
                      </motion.span>
                    </Button>
                  </Link>
                  
                  <Button variant="outline" size="lg" className="min-w-[180px] mobile:min-w-[200px]">
                    Learn More
                  </Button>
                </motion.div>
                
                {/* Trust indicators with enhanced animations */}
                <motion.div
                  className="mt-12 lg:mt-16 flex flex-wrap justify-center items-center gap-6 mobile:gap-8 text-white/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {[
                    { text: "AI-Powered Analysis", color: "#FFCC00" },
                    { text: "Privacy Protected", color: "#B13BFF" },
                    { text: "Science-Based", color: "#471396" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      whileHover={{ 
                        scale: 1.05,
                        color: item.color,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity, 
                          delay: index * 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      />
                      <span className="text-sm mobile:text-base font-medium">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}