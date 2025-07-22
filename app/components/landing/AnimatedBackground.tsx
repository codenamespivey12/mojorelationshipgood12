// import { motion } from "framer-motion"; // Disabled for deployment

export function AnimatedBackground() {
  // Generate consistent particle positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 6,
  }));

  const geometricShapes = [
    { type: 'circle', size: 80, x: 10, y: 15, color: '#FFCC00', opacity: 0.15 },
    { type: 'square', size: 60, x: 85, y: 25, color: '#B13BFF', opacity: 0.12 },
    { type: 'triangle', size: 40, x: 20, y: 70, color: '#FFCC00', opacity: 0.18 },
    { type: 'hexagon', size: 50, x: 75, y: 65, color: '#471396', opacity: 0.14 },
    { type: 'circle', size: 35, x: 50, y: 20, color: '#B13BFF', opacity: 0.16 },
    { type: 'square', size: 25, x: 30, y: 45, color: '#FFCC00', opacity: 0.13 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Enhanced animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, #090040 0%, transparent 50%), radial-gradient(circle at 80% 20%, #471396 0%, transparent 50%), radial-gradient(circle at 40% 40%, #B13BFF 0%, transparent 50%), linear-gradient(135deg, #090040 0%, #471396 50%, #B13BFF 100%)",
            "radial-gradient(circle at 60% 20%, #471396 0%, transparent 50%), radial-gradient(circle at 20% 60%, #B13BFF 0%, transparent 50%), radial-gradient(circle at 80% 80%, #090040 0%, transparent 50%), linear-gradient(135deg, #471396 0%, #B13BFF 50%, #090040 100%)",
            "radial-gradient(circle at 80% 60%, #B13BFF 0%, transparent 50%), radial-gradient(circle at 40% 20%, #090040 0%, transparent 50%), radial-gradient(circle at 20% 40%, #471396 0%, transparent 50%), linear-gradient(135deg, #B13BFF 0%, #090040 50%, #471396 100%)",
            "radial-gradient(circle at 20% 80%, #090040 0%, transparent 50%), radial-gradient(circle at 80% 20%, #471396 0%, transparent 50%), radial-gradient(circle at 40% 40%, #B13BFF 0%, transparent 50%), linear-gradient(135deg, #090040 0%, #471396 50%, #B13BFF 100%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />

      {/* Floating geometric shapes with enhanced animations */}
      {geometricShapes.map((shape, index) => (
        <motion.div
          key={`shape-${index}`}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: shape.type === 'square' ? [0, 45, 0] : [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: index * 0.5,
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="w-full h-full rounded-full backdrop-blur-sm border border-white/20"
              style={{
                backgroundColor: `${shape.color}${Math.floor(shape.opacity * 255).toString(16).padStart(2, '0')}`,
              }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="w-full h-full backdrop-blur-sm border border-white/20"
              style={{
                backgroundColor: `${shape.color}${Math.floor(shape.opacity * 255).toString(16).padStart(2, '0')}`,
                borderRadius: '8px',
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className="w-full h-full backdrop-blur-sm"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                backgroundColor: `${shape.color}${Math.floor(shape.opacity * 255).toString(16).padStart(2, '0')}`,
              }}
            />
          )}
          {shape.type === 'hexagon' && (
            <div
              className="w-full h-full backdrop-blur-sm"
              style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                backgroundColor: `${shape.color}${Math.floor(shape.opacity * 255).toString(16).padStart(2, '0')}`,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Enhanced particle system */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}

      {/* Connecting lines animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFCC00" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#B13BFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#471396" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.path
            key={`line-${i}`}
            d={`M ${Math.random() * 100}% ${Math.random() * 100}% Q ${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}% ${Math.random() * 100}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </svg>

      {/* Ambient light effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 204, 0, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(177, 59, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 2,
        }}
      />
    </div>
  );
}