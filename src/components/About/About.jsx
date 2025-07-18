import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../../assets/animation.json';

const AboutSection = styled.section`
  padding: 8rem 2rem;
  background-color: #0a192f;
`;

const SectionContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div``;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #f8f8f8;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #64ffda, transparent);
  }
`;

const AboutParagraph = styled(motion.p)`
  color: #8892b0;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const SkillsList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 2rem;
  list-style-type: none;
`;

const SkillItem = styled(motion.li)`
  color: #8892b0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '▹';
    color: #64ffda;
    margin-right: 10px;
  }
`;

const AnimationContainer = styled(motion.div)`
  position: relative;
  max-width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 300px;
    height: 300px;
  }
`;

const LottieWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: rgba(100, 255, 218, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.2);
  padding: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(100, 255, 218, 0.1);
    border-color: rgba(100, 255, 218, 0.4);
  }
`;

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AboutSection id="about" ref={ref}>
      <SectionContent>
        <AboutText
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SectionTitle>About Me</SectionTitle>
          
          <AboutParagraph variants={itemVariants}>
            Hello! I'm Moksh Mehndiratta, an AI-First Software Engineer with over 3 years of experience in full-stack development and 2.5 years in AI engineering.
            I've built and led globally-used SaaS and AI-native systems including Flow.ai, KBFS, and Neurosync.
          </AboutParagraph>
          
          <AboutParagraph variants={itemVariants}>
            Currently working at Trilogy (via Crossover) as an AI-First Software Engineer II, where I integrate AI-powered functionality into scalable SaaS products.
            I've also contributed to Interview Bot, Cortex, and Brainlift, focusing on clean, scalable architecture.
          </AboutParagraph>
          
          <AboutParagraph variants={itemVariants}>
            Here are a few technologies I've been working with recently:
          </AboutParagraph>
          
          <SkillsList variants={containerVariants}>
            <SkillItem variants={itemVariants}>Python</SkillItem>
            <SkillItem variants={itemVariants}>TypeScript/JavaScript</SkillItem>
            <SkillItem variants={itemVariants}>React/Next.js</SkillItem>
            <SkillItem variants={itemVariants}>Node.js/Express</SkillItem>
            <SkillItem variants={itemVariants}>LangChain</SkillItem>
            <SkillItem variants={itemVariants}>TensorFlow</SkillItem>
            <SkillItem variants={itemVariants}>MongoDB/SQL</SkillItem>
            <SkillItem variants={itemVariants}>AWS/Docker/K8s</SkillItem>
          </SkillsList>
        </AboutText>
        
        <AnimationContainer
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <LottieWrapper>
            <Lottie 
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </LottieWrapper>
        </AnimationContainer>
      </SectionContent>
    </AboutSection>
  );
};

export default About;
