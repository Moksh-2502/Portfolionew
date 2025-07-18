import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CursorContainer = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
`;

const CursorOutline = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
  transition: transform 0.2s ease;
  
  &.hover {
    transform: translate(-50%, -50%) scale(1.5);
  }
`;

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOutline = cursorOutlineRef.current;
    
    if (!cursor || !cursorOutline) return;
    
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      
      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
        
        // Add slight delay to outline for trail effect
        setTimeout(() => {
          cursorOutline.style.left = `${clientX}px`;
          cursorOutline.style.top = `${clientY}px`;
        }, 50);
      });
    });
    
    // Add hover effect on interactive elements
    const handleMouseOver = () => {
      cursorOutline.classList.add('hover');
    };
    
    const handleMouseLeave = () => {
      cursorOutline.classList.remove('hover');
    };
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', () => {});
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return (
    <CursorContainer>
      <CursorDot ref={cursorRef} />
      <CursorOutline ref={cursorOutlineRef} />
    </CursorContainer>
  );
};

export default Cursor;
