import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactSection = styled.section`
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
  margin-bottom: 1rem;
  text-align: center;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ContactSubtitle = styled.p`
  color: #8892b0;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 1.5rem auto;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 1rem auto;
    padding: 0 0.5rem;
  }
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const ContactInfo = styled.div`
  color: #8892b0;
`;

const ContactInfoItem = styled(motion.div)`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #64ffda;
`;

const ContactText = styled.div`
  h3 {
    font-size: 1.2rem;
    color: #e6f1ff;
    margin-bottom: 0.5rem;
  }
  
  p, a {
    color: #8892b0;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #64ffda;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  background-color: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #64ffda;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.2);
    transform: translateY(-5px);
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    gap: 0.375rem;
  }
`;

const FormInput = styled.input`
  padding: 1rem;
  background-color: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  color: #e6f1ff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.1);
  }
  
  &::placeholder {
    color: #8892b0;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

const FormTextarea = styled.textarea`
  padding: 1rem;
  background-color: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  color: #e6f1ff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.1);
  }
  
  &::placeholder {
    color: #8892b0;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.95rem;
    min-height: 100px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 90px;
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: #64ffda;
  color: #0a192f;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: #4ecdc4;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #8892b0;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    width: 100%;
  }
`;

const StatusMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 4px;
  color: ${props => props.success ? '#64ffda' : '#ff6b6b'};
  background-color: ${props => props.success ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 107, 107, 0.1)'};
  margin-top: 1rem;
`;

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [formStatus, setFormStatus] = useState({ message: '', success: false, visible: false });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Initialize animation controls when the component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: 'Please fill in all required fields.',
        success: false,
        visible: true
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        message: 'Please enter a valid email address.',
        success: false,
        visible: true
      });
      return;
    }
    
    // Start loading
    setIsLoading(true);
    
    try {
      // Send email using EmailJS
      // You'll need to sign up for EmailJS, create a service and template
      // Then replace these IDs with your own
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: `Portfolio Contact: ${formData.subject || 'New Message'} - From: ${formData.email}`,
        message: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || 'No subject'}\n\nMessage:\n${formData.message}\n\n---\nSent from Portfolio Contact Form`,
        reply_to: formData.email
      };
      
      // Check if EmailJS is properly configured
      const serviceId = 'service_1e1lv2o';
      const templateId = 'template_j768m8l'; // Replace with your actual template ID
      const publicKey = 'cysbKnbi4TBc8-Nvv'; // Replace with your actual public key
      
      if (templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        // EmailJS not configured - simulate success for demo
        console.log('EmailJS not configured. Form data:', templateParams);
        throw new Error('EmailJS configuration incomplete');
      }
      
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      // Success message
      setFormStatus({
        message: 'Your message has been sent successfully!',
        success: true,
        visible: true
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email send failed:', error);
      
      // Handle different error types
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.message === 'EmailJS configuration incomplete') {
        errorMessage = 'Contact form is in demo mode. Please configure EmailJS to enable email sending.';
      } else if (error.status === 412) {
        errorMessage = 'Email service authentication error. Please contact the administrator.';
      }
      
      setFormStatus({
        message: errorMessage,
        success: false,
        visible: true
      });
    } finally {
      // Stop loading regardless of outcome
      setIsLoading(false);
      
      // Hide status message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, visible: false }));
      }, 5000);
    }
  };
  
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
    <ContactSection id="contact" ref={ref}>
      <TitleContainer>
        <SectionTitle>Get In Touch</SectionTitle>
        <ContactSubtitle>
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </ContactSubtitle>
      </TitleContainer>
      
      <ContactContainer>
        <ContactInfo
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <ContactInfoItem variants={itemVariants}>
            <ContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </ContactIcon>
            <ContactText>
              <h3>Phone</h3>
              <p>+91 62802 53587</p>
            </ContactText>
          </ContactInfoItem>
          
          <ContactInfoItem variants={itemVariants}>
            <ContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </ContactIcon>
            <ContactText>
              <h3>Email</h3>
              <p>mokshmdg40@gmail.com</p>
            </ContactText>
          </ContactInfoItem>
          
          <ContactInfoItem variants={itemVariants}>
            <ContactIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </ContactIcon>
            <ContactText>
              <h3>Location</h3>
              <p>India</p>
            </ContactText>
          </ContactInfoItem>

          <SocialLinks>
            <SocialLink
              href="https://github.com/Moksh-2502"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: [0, 10, -10, 0], transition: { repeat: 0, duration: 1.5 } }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </SocialLink>

            <SocialLink
              href="https://www.linkedin.com/in/moksh-mehndiratta-a70989297/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: [0, -10, 10, 0], transition: { repeat: 0, duration: 1.5, delay: 0.2 } }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </SocialLink>

            <SocialLink
              href="https://portfolio-56hk.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: [0, 10, -10, 0], transition: { repeat: 0, duration: 1.5, delay: 0.4 } }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
              </svg>
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
        
        <ContactForm
          as={motion.form}
          ref={formRef}
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <FormGroup variants={itemVariants}>
            <FormInput 
              type="text" 
              name="name" 
              placeholder="Your Name *" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup variants={itemVariants}>
            <FormInput 
              type="email" 
              name="email" 
              placeholder="Your Email *" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup variants={itemVariants}>
            <FormInput 
              type="text" 
              name="subject" 
              placeholder="Subject" 
              value={formData.subject}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup variants={itemVariants}>
            <FormTextarea 
              name="message" 
              placeholder="Your Message *" 
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            variants={itemVariants}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </SubmitButton>
          
          {formStatus.visible && (
            <StatusMessage 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              success={formStatus.success}
            >
              {formStatus.message}
            </StatusMessage>
          )}
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
