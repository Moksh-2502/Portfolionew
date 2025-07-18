import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import styled from "styled-components";

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

const ParticlesBackground = ({ theme = "ai" }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const getConfig = () => {
    const baseConfig = {
      fullScreen: false,
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#64ffda",
        },
        links: {
          color: "#64ffda",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 3,
        },
      },
      detectRetina: true,
    };

    // AI theme with neural network-like particles
    if (theme === "ai") {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          links: {
            ...baseConfig.particles.links,
            color: "#64ffda",
            distance: 170,
            width: 0.8,
          },
          move: {
            ...baseConfig.particles.move,
            speed: 0.8,
          },
          number: {
            ...baseConfig.particles.number,
            value: 60,
          },
          opacity: {
            value: 0.35,
          },
        },
        interactivity: {
          ...baseConfig.interactivity,
          events: {
            ...baseConfig.interactivity.events,
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            ...baseConfig.interactivity.modes,
            grab: {
              distance: 180,
              links: {
                opacity: 0.7,
                color: "#a5ffe3",
              },
            },
          },
        },
      };
    }

    return baseConfig;
  };

  return (
    <ParticlesContainer>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={getConfig()}
      />
    </ParticlesContainer>
  );
};

export default ParticlesBackground;
