import { useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components';

// Components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Certificates from './components/Certificates/Certificates';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor/Cursor';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    background-color: #0a192f;
    color: #e6f1ff;
    overflow-x: hidden;
    cursor: none; /* Hide default cursor when using custom cursor */
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #0a192f;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #233554;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #64ffda;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

function App() {
  // Preload Google Fonts
  useEffect(() => {
    // Import Inter font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Cursor />
      <AppContainer>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </AppContainer>
    </>
  )
}

export default App
