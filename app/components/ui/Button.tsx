import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '~/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  animated?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, animated = true, ...props }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-lg';
    
    const variants = {
      primary: 'bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white hover:from-purple-500 hover:to-purple-700 focus:ring-purple-400 hover:shadow-xl hover:shadow-purple-500/30 border border-purple-400/20',
      secondary: 'bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#090040] hover:from-yellow-300 hover:to-yellow-400 focus:ring-yellow-400 hover:shadow-xl hover:shadow-yellow-500/30 border border-yellow-400/20',
      outline: 'border-2 border-white/80 text-white hover:bg-white hover:text-[#090040] focus:ring-white/50 hover:shadow-xl hover:shadow-white/20 backdrop-blur-sm bg-white/5',
      ghost: 'text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/30 backdrop-blur-sm',
    };
    
    const sizes = {
      sm: 'px-5 py-2.5 text-sm min-h-[40px]',
      md: 'px-7 py-3.5 text-base min-h-[48px]',
      lg: 'px-9 py-4.5 text-lg min-h-[56px]',
    };

    const motionProps = animated ? {
      whileHover: { 
        scale: 1.03,
        y: -2,
        transition: { 
          duration: 0.2, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      },
      whileTap: { 
        scale: 0.97,
        y: 0,
        transition: { duration: 0.1 }
      },
      initial: { scale: 1, y: 0 },
    } : {};
    
    if (animated) {
      return (
        <motion.button
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          {...motionProps}
          {...props}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0"
            style={{
              background: variant === 'secondary' 
                ? 'linear-gradient(45deg, rgba(255, 204, 0, 0.3), rgba(255, 184, 0, 0.3))'
                : variant === 'primary'
                ? 'linear-gradient(45deg, rgba(177, 59, 255, 0.3), rgba(71, 19, 150, 0.3))'
                : 'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))'
            }}
            whileHover={{ 
              opacity: 1,
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: variant === 'secondary' 
                ? 'radial-gradient(circle, rgba(255, 204, 0, 0.4) 0%, transparent 70%)'
                : variant === 'primary'
                ? 'radial-gradient(circle, rgba(177, 59, 255, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ 
              scale: 1.2, 
              opacity: [0, 0.6, 0],
              transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
          />
          
          {/* Pulse effect on press */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2"
            style={{
              borderColor: variant === 'secondary' 
                ? 'rgba(255, 204, 0, 0.6)'
                : variant === 'primary'
                ? 'rgba(177, 59, 255, 0.6)'
                : 'rgba(255, 255, 255, 0.6)'
            }}
            initial={{ scale: 1, opacity: 0 }}
            animate={isPressed ? {
              scale: [1, 1.05, 1],
              opacity: [0, 0.8, 0],
              transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
            } : {}}
          />
          
          {/* Content with micro-bounce */}
          <motion.span 
            className="relative z-10 flex items-center justify-center gap-2"
            whileHover={{
              y: [-1, 0],
              transition: { 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                repeat: 1,
                repeatType: "reverse"
              }
            }}
          >
            {children}
          </motion.span>
          
          {/* Enhanced shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 opacity-0"
            initial={{ x: '-100%', opacity: 0 }}
            whileHover={{ 
              x: '100%',
              opacity: [0, 1, 0],
              transition: { 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.6 }
              }
            }}
          />
          
          {/* Floating particles effect for secondary buttons */}
          {variant === 'secondary' && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-[#090040]/60 rounded-full"
                  style={{
                    top: `${30 + i * 20}%`,
                    left: `${20 + i * 30}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    y: [0, -10, -20],
                    x: [0, Math.random() * 10 - 5, Math.random() * 20 - 10],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              ))}
            </>
          )}
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
            style={{
              boxShadow: variant === 'secondary' 
                ? '0 0 20px rgba(255, 204, 0, 0.4), 0 0 40px rgba(255, 204, 0, 0.2)'
                : variant === 'primary'
                ? '0 0 20px rgba(177, 59, 255, 0.4), 0 0 40px rgba(177, 59, 255, 0.2)'
                : '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{
              opacity: 0.8,
              transition: { duration: 0.3 }
            }}
          />
        </motion.button>
      );
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };