import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Eyes from './Eyes';
import HeroBackground3D from '../3D/HeroBackground3D';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  z-index: 1;
`;

const SmallText = styled(motion.p)`
  color: #64ffda;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
`;

const BigText = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #f8f8f8;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SubText = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #8892b0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  max-width: 600px;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #8892b0;
  margin-bottom: 2rem;
`;

const CTAButton = styled(motion.button)`
  background-color: transparent;
  color: #64ffda;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #64ffda;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(5px);
`;

const Hero = () => {
  const shapesRef = useRef([]);
  
  useEffect(() => {
    // Create floating shapes
    const shapes = shapesRef.current;
    const colors = ['rgba(100, 255, 218, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)'];
    
    shapes.forEach((shape, index) => {
      if (!shape) return;
      
      const size = Math.random() * 200 + 50;
      const xPos = Math.random() * window.innerWidth;
      const yPos = Math.random() * window.innerHeight;
      
      gsap.set(shape, {
        width: size,
        height: size,
        x: xPos,
        y: yPos,
        backgroundColor: colors[index % colors.length],
      });
      
      // Animate each shape
      gsap.to(shape, {
        x: '+=' + (Math.random() * 200 - 100),
        y: '+=' + (Math.random() * 200 - 100),
        duration: Math.random() * 10 + 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  }, []);
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <HeroSection id="hero">
      {/* Interactive 3D AI Brain Background */}
      <HeroBackground3D />
      
      <FloatingShapes>
        {[...Array(5)].map((_, i) => (
          <Shape key={i} ref={el => shapesRef.current[i] = el} />
        ))}
      </FloatingShapes>
      
      <HeroContent>
        <SmallText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hello, my name is
        </SmallText>
        
        <BigText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Moksh Mehndiratta.
        </BigText>
        
        <SubText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          AI-First Software Engineer.
        </SubText>
        
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          SDE 2 with 3+ years in full-stack development and 2.5 years in AI engineering. 
          Specialized in building and leading globally-used SaaS and AI-native systems.
        </Description>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <CTAButton 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
          >
            Check out my work
          </CTAButton>
          
          <CTAButton 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
          >
            Contact me
          </CTAButton>
        </motion.div>
        
        <Eyes />
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
