import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const EyesContainer = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

const Eye = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: block;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 35px;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background-color: #333;
    border-radius: 50%;
    transition: 0.1s linear;
  }
`;

const Eyes = () => {
  const eyesRef = useRef([]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = eyesRef.current;
      if (!eyes.length) return;
      
      eyes.forEach((eye) => {
        if (!eye) return;
        
        // Get the eye's position
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        // Calculate angle between eye center and cursor
        const radian = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        // Convert to degrees
        const rotation = radian * (180 / Math.PI);
        
        // Set rotation for the eye to follow cursor
        eye.style.transform = `rotate(${rotation}deg)`;
        
        // Move the pupil (before element) within the eye
        const pupil = eye.querySelector('::before');
        if (pupil) {
          // Adjust pupil position
          const pupilX = Math.cos(radian) * 10;
          const pupilY = Math.sin(radian) * 10;
          pupil.style.left = `${35 + pupilX}px`;
          pupil.style.top = `${30 + pupilY}px`;
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <EyesContainer>
      <Eye ref={(el) => (eyesRef.current[0] = el)} />
      <Eye ref={(el) => (eyesRef.current[1] = el)} />
    </EyesContainer>
  );
};

export default Eyes;
