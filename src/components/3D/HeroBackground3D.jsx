import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const Canvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  opacity: 0.9;
  pointer-events: none;
`;

const HeroBackground3D = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const pointsRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    let animationFrameId;
    const canvas = canvasRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup - lower far plane for performance
    const camera = new THREE.PerspectiveCamera(
      60, 
      window.innerWidth / window.innerHeight, 
      1, 
      200 // Reduced far plane
    );
    camera.position.z = 20;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    // Renderer setup - optimized settings
    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump" // Medium precision is sufficient and better for performance
    });
    
    // Set pixel ratio with a cap for high-DPI displays
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create particles - REDUCED count for performance
    const particleCount = 2500; // Reduced from 5000
    const brainRadius = 8;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Brain-like point distribution
    for (let i = 0; i < particleCount; i++) {
      // Generate points in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = brainRadius * Math.pow(Math.random(), 0.33);
      
      // Convert spherical to cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Apply brain-like distortion - simplified
      const distortFactor = Math.random() * 0.3; // Reduced factor
      positions[i * 3] = x * (1 + distortFactor);
      positions[i * 3 + 1] = y * (1 + distortFactor) + (Math.random() > 0.9 ? 1 : 0);
      positions[i * 3 + 2] = z * (1 + distortFactor);
      
      // Color gradient - simplified
      const intensity = Math.random();
      colors[i * 3] = 0.1 + (intensity * 0.3);
      colors[i * 3 + 1] = 0.7 + (intensity * 0.3);
      colors[i * 3 + 2] = 0.8 + (intensity * 0.2);
      
      // More consistent sizes
      sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Simpler shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointSize: { value: 2.5 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pointSize;
        
        void main() {
          vColor = color;
          
          // Simplified oscillation
          vec3 pos = position;
          float oscillation = sin(time * 0.3 + position.x * 0.2 + position.y * 0.1) * 0.1;
          pos.x += oscillation;
          pos.y += oscillation * 0.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pointSize * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          float opacity = 1.0 - smoothstep(0.4, 0.5, distance);
          
          gl_FragColor = vec4(vColor, opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    // Create points system
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;
    
    // Add minimal lighting
    const ambientLight = new THREE.AmbientLight(0x64ffda, 0.2);
    scene.add(ambientLight);
    
    // Handle window resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
      resizeTimeout = setTimeout(() => {
        if (!cameraRef.current || !rendererRef.current) return;
        
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }, 100); // Debounce resize events
    };
    
    // Animation loop with proper cancelation
    let lastTime = 0;
    const animate = (time) => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !pointsRef.current) return;
      
      // Time-based animation with reduced frequency
      if (time - lastTime > 30) { // Only update every ~30ms (approx 30 fps)
        // Rotate the scene more efficiently
        pointsRef.current.rotation.y += 0.0005;
        pointsRef.current.rotation.x += 0.0002;
        
        // Update time uniform less frequently
        pointsRef.current.material.uniforms.time.value += 0.005;
        
        // Render the scene
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        
        lastTime = time;
      }
    };
    
    // Initialize and start animation
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(animate);
    
    // Comprehensive cleanup
    return () => {
      // Stop animation loop
      cancelAnimationFrame(animationFrameId);
      
      // Clear resize handler and timeout
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
      // Dispose of Three.js objects
      if (pointsRef.current) {
        if (pointsRef.current.geometry) {
          pointsRef.current.geometry.dispose();
        }
        if (pointsRef.current.material) {
          pointsRef.current.material.dispose();
        }
      }
      
      // Dispose of renderer
      if (rendererRef.current) {
        rendererRef.current.dispose();
        
        if (rendererRef.current.domElement && canvasRef.current) {
          // Remove from DOM
          if (canvasRef.current.contains(rendererRef.current.domElement)) {
            canvasRef.current.removeChild(rendererRef.current.domElement);
          }
        }
      }
      
      // Clear refs
      pointsRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, []);
  
  return <Canvas ref={canvasRef} />;
};

export default HeroBackground3D;
