import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';

const BarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: rgba(100, 255, 218, 0.1);
  border-radius: 5px;
  margin: 8px 0;
  position: relative;
  overflow: hidden;
`;

const ProgressIndicator = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #64ffda 0%, #0a92b8 100%);
  border-radius: 5px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
      opacity: 0.6;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const ProgressLabel = styled(motion.div)`
  position: absolute;
  right: 0;
  top: -20px;
  background-color: #64ffda;
  color: #0a192f;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 3px;
`;

const AnimatedProgressBar = ({ progress, delay = 0 }) => {
  const [showValue, setShowValue] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.5 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${progress}%`,
        transition: { 
          duration: 1.2, 
          delay,
          ease: [0.32, 0.72, 0, 1] // Nice elastic ease
        }
      });
      
      // Show the value after the animation starts
      setTimeout(() => {
        setShowValue(true);
      }, delay * 1000 + 300);
    }
  }, [isInView, controls, progress, delay]);

  return (
    <BarContainer ref={ref}>
      <ProgressIndicator
        initial={{ width: "0%" }}
        animate={controls}
      />
      {showValue && (
        <ProgressLabel
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {progress}%
        </ProgressLabel>
      )}
    </BarContainer>
  );
};

export default AnimatedProgressBar;
