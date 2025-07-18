import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';

const SkillsSection = styled.section`
  padding: 8rem 2rem;
  background-color: #0a192f;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(100, 255, 218, 0.03) 0%, transparent 70%);
  }
  
  @media (max-width: 768px) {
    padding: 6rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #f8f8f8;
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #64ffda, transparent);
  }
`;

const PyramidContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SkillTier = styled.div`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  /* Pyramid effect - wider at bottom */
  ${props => {
    if (props.tier === 1) {
      return `
        max-width: 900px;
        margin: 0 auto;
        border-color: rgba(255, 107, 107, 0.3);
        background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(15, 23, 42, 0.8));
      `;
    } else if (props.tier === 2) {
      return `
        max-width: 800px;
        margin: 0 auto;
        border-color: rgba(100, 255, 218, 0.3);
        background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(15, 23, 42, 0.8));
      `;
    } else {
      return `
        max-width: 700px;
        margin: 0 auto;
        border-color: rgba(147, 197, 253, 0.3);
        background: linear-gradient(135deg, rgba(147, 197, 253, 0.1), rgba(15, 23, 42, 0.8));
      `;
    }
  }}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => {
      if (props.tier === 1) return 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
      if (props.tier === 2) return 'linear-gradient(90deg, #64ffda, #4ecdc4)';
      return 'linear-gradient(90deg, #93c5fd, #60a5fa)';
    }};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
`;

const TierHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const TierTitle = styled.h3`
  font-size: 2rem;
  color: #e6f1ff;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const TierDescription = styled.p`
  color: #8892b0;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  
  ${props => {
    if (props.tier === 1) {
      return `
        gap: 1.5rem;
      `;
    } else if (props.tier === 2) {
      return `
        gap: 1.2rem;
      `;
    }
    return `gap: 1rem;`;
  }}
`;

const SkillBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  border: 2px solid;
  border-radius: 50px;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(15, 23, 42, 0.7);
  }
`;

const SkillIcon = styled.div`
  width: 24px;
  height: 24px;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const SkillName = styled.span`
  font-size: 1rem;
  color: #e6f1ff;
  font-weight: 500;
  white-space: nowrap;
`;

// Skills data organized by proficiency levels (pyramid structure)
const skillsData = {
  expert: {
    title: "🔥 Expert",
    description: "Technologies I've mastered through extensive experience",
    tier: 1,
    skills: [
      { name: "React", icon: "react", description: "Building dynamic UIs with hooks, context, and modern patterns", color: "#61DAFB" },
      { name: "Node.js", icon: "node", description: "Server-side JavaScript and API development", color: "#339933" },
      { name: "MongoDB", icon: "mongodb", description: "NoSQL database design and aggregation pipelines", color: "#47A248" },
      { name: "Git", icon: "git", description: "Version control, branching strategies, and collaboration", color: "#F05032" },
      { name: "Docker", icon: "docker", description: "Containerization and deployment workflows", color: "#2496ED" }
    ]
  },
  intermediate: {
    title: "🧠 Intermediate",
    description: "Technologies I'm proficient in and actively developing",
    tier: 2,
    skills: [
      { name: "Next.js", icon: "nextjs", description: "Full-stack React framework with SSR/SSG", color: "#000000" },
      { name: "Express", icon: "express", description: "Web application framework for Node.js", color: "#000000" },
      { name: "Python", icon: "python", description: "Data analysis, automation, and backend development", color: "#3776AB" },
      { name: "TypeScript", icon: "typescript", description: "Type-safe JavaScript development", color: "#3178C6" },
      { name: "TensorFlow", icon: "tensorflow", description: "Machine learning and neural networks", color: "#FF6F00" },
      { name: "AWS", icon: "aws", description: "Cloud services and infrastructure", color: "#FF9900" }
    ]
  },
  learning: {
    title: "🌱 Learning/Exploring",
    description: "Emerging technologies I'm currently exploring and learning",
    tier: 3,
    skills: [
      { name: "Kubernetes", icon: "kubernetes", description: "Container orchestration and management", color: "#326CE5" },
      { name: "LangChain", icon: "langchain", description: "Building applications with large language models", color: "#1C3C3C" },
      { name: "RAG", icon: "rag", description: "Retrieval-Augmented Generation for AI applications", color: "#FF6B6B" },
      { name: "CI/CD", icon: "cicd", description: "Continuous integration and deployment pipelines", color: "#4CAF50" }
    ]
  }
};

// Icon mapping function
const getSkillIcon = (icon) => {
  const iconMap = {
    react: '⚛️',
    node: '🟢',
    mongodb: '🍃',
    git: '📝',
    docker: '🐳',
    nextjs: '▲',
    express: '🚀',
    python: '🐍',
    typescript: '📘',
    tensorflow: '🧠',
    aws: '☁️',
    kubernetes: '☸️',
    langchain: '🔗',
    rag: '🔍',
    cicd: '🔄'
  };
  return iconMap[icon] || '💻';
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
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
  
  const tierVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <SkillsSection id="skills" ref={ref}>
      <SectionTitle
        as={motion.h2}
        variants={tierVariants}
        initial="hidden"
        animate={controls}
      >
        My Skills
      </SectionTitle>
      
      <PyramidContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {Object.entries(skillsData).map(([level, levelData]) => (
          <SkillTier
            key={level}
            as={motion.div}
            variants={tierVariants}
            tier={levelData.tier}
            whileHover={{ scale: 1.02 }}
          >
            <TierHeader>
              <TierTitle>{levelData.title}</TierTitle>
              <TierDescription>{levelData.description}</TierDescription>
            </TierHeader>
            
            <SkillsGrid tier={levelData.tier}>
              {levelData.skills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  as={motion.div}
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 8px 25px ${skill.color}40`,
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    borderColor: skill.color,
                    background: `linear-gradient(135deg, ${skill.color}10, ${skill.color}05)`
                  }}
                  title={skill.description}
                >
                  <SkillIcon color={skill.color}>
                    {getSkillIcon(skill.icon)}
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                </SkillBadge>
              ))}
            </SkillsGrid>
          </SkillTier>
        ))}
      </PyramidContainer>
    </SkillsSection>
  );
};

export default Skills;
