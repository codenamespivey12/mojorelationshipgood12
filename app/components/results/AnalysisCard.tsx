import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion'; // Disabled for deployment

interface AnalysisCardProps {
  title: string;
  content: string;
  visualData?: any;
  isExpandable?: boolean;
  animationDelay?: number;
}

export function AnalysisCard({
  title,
  content,
  visualData,
  isExpandable = true,
  animationDelay = 0,
}: AnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div 
        className={`p-6 ${isExpandable ? 'cursor-pointer' : ''}`}
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {isExpandable && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          )}
        </div>
        
        <div className="mt-2 text-gray-600">
          {content.substring(0, 150)}
          {content.length > 150 && !isExpanded && '...'}
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="p-6">
              <div className="text-gray-700 whitespace-pre-wrap">
                {content}
              </div>
              {visualData && (
                <div className="mt-4">
                  {/* Visualization component would go here */}
                  <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
                    Visualization placeholder
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}