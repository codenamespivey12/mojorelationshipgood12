// import { motion } from "framer-motion"; // Disabled for deployment
import { Link } from "@remix-run/react";
import { useUser } from "@clerk/remix";
import { Button } from "~/components/ui/Button";

export function HeroSection() {
  const { isSignedIn } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className="text-center lg:text-left text-white relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl mobile:text-5xl tablet:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 leading-tight"
        variants={itemVariants}
      >
        <motion.span 
          className="block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Relationship
        </motion.span>
        <motion.span
          className="block bg-gradient-to-r from-[#FFCC00] via-[#FFB800] to-[#B13BFF] bg-clip-text text-transparent relative"
          style={{
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Mojo
          {/* Sparkle effects */}
          <motion.span
            className="absolute -top-2 -right-2 text-2xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            ✨
          </motion.span>
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-lg mobile:text-xl tablet:text-2xl lg:text-2xl xl:text-3xl mb-8 lg:mb-10 max-w-4xl mx-auto lg:mx-0 leading-relaxed text-white/90"
        variants={itemVariants}
      >
        Discover your relationship style with our{" "}
        <motion.span 
          className="text-[#FFCC00] font-semibold relative"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          AI-powered assessment
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFCC00] to-[#B13BFF]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
        </motion.span>
        {" "}across{" "}
        <span className="text-[#B13BFF] font-semibold">5 psychological domains</span>
      </motion.p>

      <motion.div
        className="flex flex-col mobile:flex-row gap-4 mobile:gap-6 justify-center lg:justify-start items-center"
        variants={itemVariants}
      >
        <motion.div variants={buttonVariants}>
          {isSignedIn ? (
            <Link to="/assessment">
              <Button variant="secondary" size="lg" className="min-w-[220px] mobile:min-w-[240px]">
                <motion.span
                  className="flex items-center gap-2"
                  whileHover={{
                    x: [0, 3, 0],
                    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                >
                  Start Assessment
                  <motion.span
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </Button>
            </Link>
          ) : (
            <Link to="/sign-up">
              <Button variant="secondary" size="lg" className="min-w-[220px] mobile:min-w-[240px]">
                <motion.span
                  className="flex items-center gap-2"
                  whileHover={{
                    x: [0, 3, 0],
                    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                >
                  Get Started Free
                  <motion.span
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </Button>
            </Link>
          )}
        </motion.div>

        <motion.div variants={buttonVariants}>
          <Button variant="outline" size="lg" className="min-w-[180px] mobile:min-w-[200px]">
            <motion.span
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Learn More
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Enhanced trust indicators */}
      <motion.div
        className="mt-12 lg:mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-6 mobile:gap-8 text-white/70"
        variants={itemVariants}
      >
        {[
          { text: "AI-Powered Analysis", color: "#FFCC00", icon: "🧠" },
          { text: "Privacy Protected", color: "#B13BFF", icon: "🔒" },
          { text: "Science-Based", color: "#471396", icon: "🔬" }
        ].map((item, index) => (
          <motion.div 
            key={index}
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              color: item.color,
              transition: { duration: 0.2 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{
                x: [0, 2, 0],
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full relative"
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
              >
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: item.color }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              </motion.div>
              <span className="text-sm mobile:text-base font-medium group-hover:font-semibold transition-all duration-200">
                {item.text}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}