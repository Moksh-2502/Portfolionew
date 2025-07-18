import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: all 0.5s ease;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  color: #f8f8f8;
  
  span {
    color: #64ffda;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 3rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.div)`
  cursor: pointer;
  font-weight: 500;
  position: relative;
  color: #f8f8f8;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #64ffda;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  cursor: pointer;
  z-index: 200;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
  }
`;

const MobileMenuLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f8f8f8;
  transition: all 0.3s ease;
  
  &:first-child {
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
  }
  
  &:nth-child(2) {
    opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
  }
  
  &:last-child {
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'rotate(0)'};
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background: rgba(10, 25, 47, 0.95);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`;

const MobileNavItem = styled(motion.div)`
  font-size: 1.5rem;
  cursor: pointer;
  color: #f8f8f8;
`;

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      delay: 0.1
    }
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Nav 
      style={{ backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.9)' : 'transparent' }}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <Logo 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection('hero')}
      >
        Port<span>folio</span>
      </Logo>
      
      <NavItems>
        <NavItem whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('about')}>About</NavItem>
        <NavItem whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('skills')}>Skills</NavItem>
        <NavItem whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('projects')}>Projects</NavItem>
        <NavItem whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('certificates')}>Certificates</NavItem>
        <NavItem whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('contact')}>Contact</NavItem>
      </NavItems>
      
      <MobileMenuButton onClick={toggleMenu}>
        <MobileMenuLine $isOpen={isOpen} />
        <MobileMenuLine $isOpen={isOpen} />
        <MobileMenuLine $isOpen={isOpen} />
      </MobileMenuButton>
      
      <MobileMenu 
        $isOpen={isOpen}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <MobileNavItem 
          onClick={() => scrollToSection('about')}
          whileHover={{ scale: 1.1, color: '#64ffda' }}
        >
          About
        </MobileNavItem>
        <MobileNavItem 
          onClick={() => scrollToSection('skills')}
          whileHover={{ scale: 1.1, color: '#64ffda' }}
        >
          Skills
        </MobileNavItem>
        <MobileNavItem 
          onClick={() => scrollToSection('projects')}
          whileHover={{ scale: 1.1, color: '#64ffda' }}
        >
          Projects
        </MobileNavItem>
        <MobileNavItem 
          onClick={() => scrollToSection('certificates')}
          whileHover={{ scale: 1.1, color: '#64ffda' }}
        >
          Certificates
        </MobileNavItem>
        <MobileNavItem 
          onClick={() => scrollToSection('contact')}
          whileHover={{ scale: 1.1, color: '#64ffda' }}
        >
          Contact
        </MobileNavItem>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
