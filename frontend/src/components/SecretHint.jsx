import { motion } from 'framer-motion';

// A more visible Easter Egg hint component
export const SecretHint = ({ onClick, found, fragmentNumber }) => {
  if (found) {
    return (
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30">
          <span className="text-yellow-400">💎</span>
          <span className="text-xs font-mono text-yellow-400">FRAGMENT #{fragmentNumber} COLLECTED</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="text-center py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={onClick}
        className="inline-flex flex-col items-center gap-2 cursor-pointer group"
      >
        {/* Glowing gem icon */}
        <motion.div
          animate={{ 
            textShadow: ['0 0 10px rgba(234, 179, 8, 0)', '0 0 20px rgba(234, 179, 8, 0.5)', '0 0 10px rgba(234, 179, 8, 0)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          💎
        </motion.div>
        
        {/* Hint text */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-dashed border-yellow-500/30 group-hover:border-yellow-500/60 group-hover:bg-yellow-500/5 transition-all">
          <span className="text-xs font-mono text-yellow-500/60 group-hover:text-yellow-400 transition-colors">
            Something hidden here...
          </span>
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-yellow-500/60 group-hover:text-yellow-400"
          >
            →
          </motion.span>
        </div>
        
        {/* Sparkle effects */}
        <div className="absolute -inset-4 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SecretHint;
