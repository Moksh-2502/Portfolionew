import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import TiltCard from './TiltCard';

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background-color: #0a192f;
  
  @media (max-width: 768px) {
    padding: 6rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 4rem 1rem;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: #112240;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: 480px) {
    border-radius: 6px;
    &:hover {
      transform: none;
    }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #e6f1ff;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ProjectDescription = styled.p`
  color: #8892b0;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProjectTag = styled.span`
  background-color: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  color: #64ffda;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

// Moksh's actual project data - Updated with all current and featured projects
const projectsData = [
  {
    id: 1,
    title: "NeuroSync",
    description: "A second brain for developers – tracks and understands context across all your and your team's repositories.",
    image: "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["LangChain", "FastAPI", "TypeScript", "PostgreSQL"],
    github: "#",
    demo: "https://neuro-sync-ogta.vercel.app/"
  },
  {
    id: 2,
    title: "Cortex",
    description: "ML-powered career coaching and progression tracking platform.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["Machine Learning", "Career Coaching", "Analytics", "Progression Tracking"],
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "Flow.ai",
    description: "Intelligent automation workflow builder.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["AI", "Automation", "Workflow", "Intelligence"],
    github: "#",
    demo: "https://app.flow.ai/"
  },
  {
    id: 4,
    title: "KBFS",
    description: "Secure knowledge-based file system for team memory and AI-driven documentation.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["Knowledge Management", "File System", "AI Documentation", "Security"],
    github: "#",
    demo: "#"
  },
  {
    id: 5,
    title: "Interview Bot",
    description: "AI-powered interview evaluator.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["AI", "Interview", "Evaluation", "HR Tech"],
    github: "https://github.com/Moksh-2502/interviewer",
    demo: "#"
  },
  {
    id: 6,
    title: "Brainlift",
    description: "AI coaching assistant to improve team productivity and individual growth.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["AI Coaching", "Productivity", "Team Growth", "Assistant"],
    github: "https://github.com/Moksh-2502/Second-Brain",
    demo: "#"
  },
  {
    id: 7,
    title: "Artemis",
    description: "Mobile app for women's safety using gesture-triggered SOS and cloud video sync.",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["Flutter", "Firebase", "YOLOv8", "Safety"],
    github: "https://github.com/Mayank4352/Security",
    demo: "#"
  },
  {
    id: 8,
    title: "MoneyLand",
    description: "Tokenized land investment platform for pooled stock and intra-day trading.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["Flask", "Solidity", "Blockchain", "Finance"],
    github: "https://github.com/Moksh-2502/MoneyLand",
    demo: "#"
  },
  {
    id: 9,
    title: "HealthBound",
    description: "AI-based disease predictor handling 2,000+ conditions with high accuracy.",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["TensorFlow", "Flask", "AI", "Healthcare"],
    github: "https://github.com/Moksh-2502/Hackathon",
    demo: "#"
  },
  {
    id: 10,
    title: "Token Launchpad",
    description: "Tool to configure and deploy ERC-20 smart contracts with live previews.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["Solidity", "Hardhat", "React", "Ethers.js", "Wagmi"],
    github: "https://github.com/Moksh-2502/token-launchpad",
    demo: "#"
  },
  {
    id: 11,
    title: "ragktflow",
    description: "Local RAG (Retrieval-Augmented Generation) system for decentralized dev knowledge sharing.",
    image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    tags: ["LangChain", "FAISS", "FastAPI", "React"],
    github: "https://github.com/Moksh-2502/ragktflow",
    demo: "#"
  }
];

const Projects = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ProjectsSection id="projects" ref={ref}>
      <TitleContainer>
        <SectionTitle>Projects</SectionTitle>
      </TitleContainer>
      
      <ProjectsContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {projectsData.filter(project => project && project.title && project.description).map((project) => (
          <TiltCard key={project.id} glareColor="rgba(100, 255, 218, 0.4)" intensity={10}>
            <ProjectCard variants={itemVariants}>
            <ProjectImage>
              <img src={project.image} alt={project.title} />
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTags>
                {project.tags.map((tag, index) => (
                  <ProjectTag key={index}>{tag}</ProjectTag>
                ))}
              </ProjectTags>
              <ProjectLinks>
                {project.github && project.github !== "#" && (
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Github
                  </ProjectLink>
                )}
                {project.demo && project.demo !== "#" && (
                  <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
          </TiltCard>
        ))}
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;
