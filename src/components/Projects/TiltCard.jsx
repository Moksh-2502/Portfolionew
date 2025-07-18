import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TiltWrapper = styled(motion.div)`
  transform-style: preserve-3d;
  transform: perspective(1000px);
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const TiltContent = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const TiltCard = ({ children, glareColor = "#64ffda", intensity = 15, glare = true, scale = 1.05 }) => {
  const tiltRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  // Glare effect element state
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [glareOpacity, setGlareOpacity] = useState(0);
  
  const handleMouseMove = (e) => {
    if (!tiltRef.current) return;
    
    const rect = tiltRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;
    const rotateXValue = -((mouseY / (rect.height / 2)) * intensity);
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Update glare position and opacity
    if (glare) {
      const x = (mouseX / rect.width) * 100 + 50;
      const y = (mouseY / rect.height) * 100 + 50;
      setGlarePosition({ x, y });
      setGlareOpacity(0.4);
    }
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareOpacity(0);
    setIsHovered(false);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  useEffect(() => {
    const currentRef = tiltRef.current;
    if (!currentRef) return;
    
    currentRef.addEventListener('mousemove', handleMouseMove);
    currentRef.addEventListener('mouseleave', handleMouseLeave);
    currentRef.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
        currentRef.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);
  
  return (
    <TiltWrapper 
      ref={tiltRef}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        zIndex: isHovered ? 10 : 1
      }}
      whileHover={{ scale: scale }}
    >
      <TiltContent>
        {children}
        
        {/* Glare effect */}
        {glare && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
              opacity: glareOpacity,
              transition: 'opacity 0.2s ease',
              zIndex: 2
            }}
          />
        )}
      </TiltContent>
    </TiltWrapper>
  );
};

export default TiltCard;
