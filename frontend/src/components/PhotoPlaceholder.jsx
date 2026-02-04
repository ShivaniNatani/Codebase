import { useState } from 'react';
import { motion } from 'framer-motion';

export const PhotoPlaceholder = ({ 
  label = 'Memory Fragment', 
  aspectRatio = '4/3',
  className = '',
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border border-border/50 bg-card cursor-pointer group ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0.5,
            scale: isHovered ? 1.1 : 1
          }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
            <i className="fas fa-image text-2xl text-primary/60" />
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            {label}
          </span>
        </motion.div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40" />

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 bg-primary/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export const PhotoGallery = ({ photos, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PhotoPlaceholder 
            label={photo.label || `Memory ${index + 1}`}
            aspectRatio={photo.aspectRatio || '4/3'}
          />
        </motion.div>
      ))}
    </div>
  );
};
