import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';

const CertificatesSection = styled.section`
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
  margin-bottom: 1rem;
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

const SectionSubtitle = styled.p`
  color: #8892b0;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? 'rgba(100, 255, 218, 0.1)' : 'rgba(15, 23, 42, 0.6)'};
  border: 2px solid ${props => props.active ? '#64ffda' : 'rgba(100, 255, 218, 0.2)'};
  border-radius: 25px;
  color: ${props => props.active ? '#64ffda' : '#8892b0'};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(100, 255, 218, 0.1);
    border-color: #64ffda;
    color: #64ffda;
    transform: translateY(-2px);
  }
`;

const CertificatesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CertificateCard = styled(motion.div)`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.domainColor || '#64ffda'}, transparent);
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CertificateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const IssuerLogo = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.bgColor || 'rgba(100, 255, 218, 0.1)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.color || '#64ffda'};
  font-weight: bold;
`;

const IssuerInfo = styled.div`
  flex: 1;
`;

const IssuerName = styled.h4`
  color: #e6f1ff;
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
`;

const CertificateDate = styled.p`
  color: #8892b0;
  font-size: 0.8rem;
  margin: 0;
`;

const CertificateTitle = styled.h3`
  color: #f8f8f8;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
`;

const CertificateDescription = styled.p`
  color: #8892b0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const CertificateFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DomainTag = styled.span`
  background: ${props => props.bgColor || 'rgba(100, 255, 218, 0.1)'};
  color: ${props => props.color || '#64ffda'};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ViewButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #64ffda;
  color: #64ffda;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(100, 255, 218, 0.1);
    transform: scale(1.05);
  }
`;

// Your actual certificates from Coursera
const certificatesData = [
  // AI/ML & Data Science
  {
    id: 1,
    title: "Algorithmic Toolbox",
    issuer: "University of California San Diego",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "Fundamental algorithms and data structures for competitive programming and software development.",
    logo: "C",
    logoColor: "#0056D3",
    logoBg: "rgba(0, 86, 211, 0.1)",
    domainColor: "#0056D3",
    link: "https://www.coursera.org/account/accomplishments/certificate/BSWJXKDYWK6F"
  },
  {
    id: 2,
    title: "Object-Oriented Data Structures in C++",
    issuer: "University of Illinois at Urbana-Champaign",
    platform: "Coursera",
    date: "2024",
    domain: "Backend",
    description: "Advanced C++ programming with focus on object-oriented design and data structures.",
    logo: "C",
    logoColor: "#0056D3",
    logoBg: "rgba(0, 86, 211, 0.1)",
    domainColor: "#00599C",
    link: "https://www.coursera.org/account/accomplishments/verify/JH8UBFPMR5Y2"
  },
  {
    id: 3,
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "Data exploration techniques and statistical analysis for machine learning projects.",
    logo: "IBM",
    logoColor: "#1261FE",
    logoBg: "rgba(18, 97, 254, 0.1)",
    domainColor: "#1261FE",
    link: "https://www.coursera.org/account/accomplishments/verify/HUDVXSYFYLAJ"
  },
  {
    id: 4,
    title: "Supervised Machine Learning: Classification",
    issuer: "IBM",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "Classification algorithms, model evaluation, and supervised learning techniques.",
    logo: "IBM",
    logoColor: "#1261FE",
    logoBg: "rgba(18, 97, 254, 0.1)",
    domainColor: "#1261FE",
    link: "https://www.coursera.org/account/accomplishments/verify/37U3649Y23HL"
  },
  {
    id: 5,
    title: "Unsupervised Machine Learning",
    issuer: "IBM",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "Clustering, dimensionality reduction, and unsupervised learning algorithms.",
    logo: "IBM",
    logoColor: "#1261FE",
    logoBg: "rgba(18, 97, 254, 0.1)",
    domainColor: "#1261FE",
    link: "https://www.coursera.org/account/accomplishments/verify/GJF2BSADMUZM"
  },
  // Software Development
  {
    id: 6,
    title: "Lean Software Development",
    issuer: "University of Minnesota",
    platform: "Coursera",
    date: "2024",
    domain: "DevOps",
    description: "Agile methodologies, lean principles, and efficient software development practices.",
    logo: "UM",
    logoColor: "#7A0019",
    logoBg: "rgba(122, 0, 25, 0.1)",
    domainColor: "#7A0019",
    link: "https://www.coursera.org/account/accomplishments/verify/JPT33XLNWFPL"
  },
  {
    id: 7,
    title: "Introduction to Agile Development and Scrum",
    issuer: "IBM",
    platform: "Coursera",
    date: "2024",
    domain: "DevOps",
    description: "Scrum framework, agile principles, and project management methodologies.",
    logo: "IBM",
    logoColor: "#1261FE",
    logoBg: "rgba(18, 97, 254, 0.1)",
    domainColor: "#1261FE",
    link: "https://www.coursera.org/account/accomplishments/verify/G9YQZ52C72EQ"
  },
  // Networking & Security
  {
    id: 8,
    title: "Fundamentals of Network Communication",
    issuer: "University of Colorado System",
    platform: "Coursera",
    date: "2024",
    domain: "Networking",
    description: "Network protocols, communication systems, and distributed computing fundamentals.",
    logo: "UC",
    logoColor: "#CFB87C",
    logoBg: "rgba(207, 184, 124, 0.1)",
    domainColor: "#CFB87C",
    link: "https://www.coursera.org/account/accomplishments/verify/3KG8B2EDFEMV"
  },
  {
    id: 9,
    title: "Introduction to Computers and Operating Systems and Security",
    issuer: "Microsoft",
    platform: "Coursera",
    date: "2024",
    domain: "Security",
    description: "Computer systems, operating system concepts, and cybersecurity fundamentals.",
    logo: "UCI",
    logoColor: "#0064A4",
    logoBg: "rgba(0, 100, 164, 0.1)",
    domainColor: "#0064A4",
    link: "https://www.coursera.org/account/accomplishments/verify/YEHY4BJPC579"
  },
  {
    id: 10,
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    platform: "Coursera",
    date: "2024",
    domain: "Networking",
    description: "Network fundamentals, TCP/IP, routing, and network troubleshooting.",
    logo: "G",
    logoColor: "#4285F4",
    logoBg: "rgba(66, 133, 244, 0.1)",
    domainColor: "#4285F4",
    link: "https://www.coursera.org/account/accomplishments/verify/F3H6EPCJU4NW"
  },
  {
    id: 11,
    title: "Convolutional Neural Networks",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "Deep learning with CNNs, computer vision, and neural network architectures.",
    logo: "DL",
    logoColor: "#00D4FF",
    logoBg: "rgba(0, 212, 255, 0.1)",
    domainColor: "#00D4FF",
    link: "https://www.coursera.org/account/accomplishments/verify/H195FQMAIFW9"
  },
  // Advanced Topics
  {
    id: 12,
    title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "Advanced neural network optimization, regularization techniques, and hyperparameter tuning.",
    logo: "DL",
    logoColor: "#00D4FF",
    logoBg: "rgba(0, 212, 255, 0.1)",
    domainColor: "#00D4FF",
    link: "https://www.coursera.org/account/accomplishments/verify/D0UN7YWVWA2Z"
  },
  {
    id: 13,
    title: "Natural Language Processing with Classification and Vector Spaces",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "NLP fundamentals, text classification, and vector space models.",
    logo: "DL",
    logoColor: "#00D4FF",
    logoBg: "rgba(0, 212, 255, 0.1)",
    domainColor: "#00D4FF",
    link: "https://www.coursera.org/account/accomplishments/verify/GB0F28ZK8BJI"
  },
  {
    id: 14,
    title: "Sample-based Learning Methods",
    issuer: "University of Alberta",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "Reinforcement learning, Monte Carlo methods, and sample-based algorithms.",
    logo: "UA",
    logoColor: "#007C41",
    logoBg: "rgba(0, 124, 65, 0.1)",
    domainColor: "#007C41",
    link: "https://www.coursera.org/account/accomplishments/verify/U3MRZDV9EB36"
  },
  {
    id: 15,
    title: "Enterprise Product Management Fundamentals",
    issuer: "Microsoft",
    platform: "Coursera",
    date: "2024",
    domain: "Management",
    description: "Product strategy, market analysis, and enterprise product management.",
    logo: "UVA",
    logoColor: "#E57200",
    logoBg: "rgba(229, 114, 0, 0.1)",
    domainColor: "#E57200",
    link: "https://www.coursera.org/account/accomplishments/records/LBQWV4S62WM4"
  },
  {
    id: 16,
    title: "Copyright Law",
    issuer: "University of Pennsylvania",
    platform: "Coursera",
    date: "2024",
    domain: "Legal",
    description: "Intellectual property law, copyright regulations, and legal frameworks.",
    logo: "Penn",
    logoColor: "#011F5B",
    logoBg: "rgba(1, 31, 91, 0.1)",
    domainColor: "#011F5B",
    link: "https://www.coursera.org/account/accomplishments/records/P9UM94TP82T1"
  },
  {
    id: 17,
    title: "Structuring Machine Learning Projects",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    date: "2024",
    domain: "AI/ML",
    description: "ML project management, error analysis, and systematic approach to ML development.",
    logo: "DL",
    logoColor: "#00D4FF",
    logoBg: "rgba(0, 212, 255, 0.1)",
    domainColor: "#00D4FF",
    link: "https://www.coursera.org/account/accomplishments/records/V35YN8NEZLUF"
  },
  {
    id: 18,
    title: "Simulation and modeling of natural processes",
    issuer: "University of Geneva",
    platform: "Coursera",
    date: "2024",
    domain: "Science",
    description: "Mathematical modeling, simulation techniques, and natural process analysis.",
    logo: "UNIGE",
    logoColor: "#DC143C",
    logoBg: "rgba(220, 20, 60, 0.1)",
    domainColor: "#DC143C",
    link: "https://www.coursera.org/account/accomplishments/records/NMTN1IQNZDZE"
  },
  {
    id: 19,
    title: "Introduction to Intellectual Property",
    issuer: "University of Pennsylvania",
    platform: "Coursera",
    date: "2024",
    domain: "Legal",
    description: "IP law fundamentals, patents, trademarks, and intellectual property protection.",
    logo: "Penn",
    logoColor: "#011F5B",
    logoBg: "rgba(1, 31, 91, 0.1)",
    domainColor: "#011F5B",
    link: "https://www.coursera.org/account/accomplishments/records/IP04Q92TK2XP"
  }
];

const domains = ["All", "AI/ML", "Backend", "DevOps", "Networking", "Security", "Management", "Legal", "Science"];

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredCertificates, setFilteredCertificates] = useState(certificatesData);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  useEffect(() => {
    const filtered = activeFilter === "All" 
      ? [...certificatesData] 
      : certificatesData.filter(cert => cert.domain === activeFilter);
    setFilteredCertificates(filtered);
  }, [activeFilter]);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
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
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <CertificatesSection id="certificates" ref={ref}>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate={controls}
      >
        <SectionTitle>Certifications & Achievements</SectionTitle>
        <SectionSubtitle>
          Professional certifications and courses that showcase my continuous learning journey
        </SectionSubtitle>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <FilterContainer>
          {domains.map((domain) => (
            <FilterButton
              key={domain}
              active={activeFilter === domain}
              onClick={() => setActiveFilter(domain)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {domain}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <CertificatesGrid>
          <AnimatePresence mode="wait">
            {filteredCertificates.map((certificate) => (
            <CertificateCard
              key={`${activeFilter}-${certificate.id}`}
              variants={cardVariants}
              domainColor={certificate.domainColor}
              whileHover={{ scale: 1.02 }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
            >
              <CertificateHeader>
                <IssuerLogo 
                  bgColor={certificate.logoBg} 
                  color={certificate.logoColor}
                >
                  {certificate.logo}
                </IssuerLogo>
                <IssuerInfo>
                  <IssuerName>{certificate.issuer}</IssuerName>
                  <CertificateDate>{certificate.platform} • {certificate.date}</CertificateDate>
                </IssuerInfo>
              </CertificateHeader>
              
              <CertificateTitle>{certificate.title}</CertificateTitle>
              <CertificateDescription>{certificate.description}</CertificateDescription>
              
              <CertificateFooter>
                <DomainTag 
                  bgColor={`${certificate.domainColor}20`} 
                  color={certificate.domainColor}
                >
                  {certificate.domain}
                </DomainTag>
                <ViewButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(certificate.link, '_blank')}
                >
                  View Certificate
                </ViewButton>
              </CertificateFooter>
            </CertificateCard>
            ))}
          </AnimatePresence>
        </CertificatesGrid>
      </motion.div>
    </CertificatesSection>
  );
};

export default Certificates;
