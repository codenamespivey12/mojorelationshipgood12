// import { motion } from "framer-motion"; // Disabled for deployment

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
  index: number;
}

function FeatureCard({ icon, title, description, delay, index }: FeatureCardProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -15,
        rotateX: -5,
        transition: { 
          duration: 0.4, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 300,
          damping: 20
        },
      }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative bg-white/8 backdrop-blur-md rounded-3xl p-8 text-center text-white border border-white/15 overflow-hidden shadow-2xl"
        whileHover={{
          backgroundColor: "rgba(255, 255, 255, 0.18)",
          borderColor: "rgba(255, 204, 0, 0.6)",
          boxShadow: "0 25px 50px -12px rgba(255, 204, 0, 0.25), 0 0 0 1px rgba(255, 204, 0, 0.1)",
          transition: { duration: 0.4 },
        }}
      >
        {/* Enhanced floating background effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${50 + index * 20}% ${30 + index * 15}%, rgba(255, 204, 0, 0.15) 0%, rgba(177, 59, 255, 0.1) 50%, transparent 80%)`,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        
        {/* Animated mesh gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255, 204, 0, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(177, 59, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(71, 19, 150, 0.2) 0%, transparent 50%)
            `,
          }}
          animate={{
            backgroundPosition: [
              "20% 20%, 80% 80%, 40% 60%",
              "25% 25%, 75% 75%, 45% 55%",
              "20% 20%, 80% 80%, 40% 60%",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
        
        {/* Icon container with enhanced animations */}
        <motion.div
          className="relative w-24 h-24 bg-gradient-to-br from-[#FFCC00]/25 to-[#B13BFF]/25 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/25 shadow-lg"
          whileHover={{
            scale: 1.15,
            rotate: [0, -5, 5, 0],
            transition: { 
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              rotate: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }
            },
          }}
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.span 
            className="text-4xl relative z-10"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
          >
            {icon}
          </motion.span>
          
          {/* Multiple pulsing ring effects */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-[#FFCC00]/40"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: index * 0.3,
            }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-2xl border border-[#B13BFF]/30"
            animate={{
              scale: [1.1, 1.4, 1.1],
              opacity: [0.3, 0.05, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: index * 0.3 + 0.5,
            }}
          />
          
          {/* Floating particles around icon */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-[#FFCC00]/60 rounded-full"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: Math.cos((i * 120 * Math.PI) / 180) * 40,
                y: Math.sin((i * 120 * Math.PI) / 180) * 40,
                opacity: [0.6, 0.2, 0.6],
                scale: [1, 0.5, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 0.8,
              }}
            />
          ))}
        </motion.div>
        
        <motion.h3
          className="relative text-xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text"
          whileHover={{
            backgroundImage: "linear-gradient(to right, #FFCC00, #B13BFF)",
            transition: { duration: 0.3 },
          }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="relative text-white/85 leading-relaxed text-sm"
          whileHover={{
            color: "rgba(255, 255, 255, 0.95)",
            transition: { duration: 0.3 },
          }}
        >
          {description}
        </motion.p>
        
        {/* Enhanced hover glow effects */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255, 204, 0, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(177, 59, 255, 0.1) 0%, transparent 50%)
            `,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function FeatureCards() {
  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your responses using established psychological frameworks to provide deep insights into your relationship patterns.",
    },
    {
      icon: "📊",
      title: "Comprehensive Assessment",
      description: "50 carefully crafted questions across 5 domains: attachment styles, communication patterns, emotional intelligence, love languages, and more.",
    },
    {
      icon: "🎯",
      title: "Actionable Insights",
      description: "Receive personalized recommendations and strategies for relationship growth, self-improvement, and better connection with others.",
    },
  ];

  return (
    <div className="relative">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Why Choose Relationship Mojo?
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Discover the science-backed approach to understanding your relationship patterns
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={0.5 + index * 0.2}
            index={index}
          />
        ))}
      </motion.div>
      
      {/* Enhanced connecting elements */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFCC00]/30 to-transparent hidden lg:block"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Floating connection nodes */}
      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute top-1/2 w-3 h-3 bg-[#FFCC00]/60 rounded-full hidden lg:block"
          style={{
            left: `${33 + i * 34}%`,
            transform: "translateY(-50%)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5 + 2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
}