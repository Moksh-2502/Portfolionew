import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #0a192f;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #233554;
`;

const Copyright = styled.p`
  color: #8892b0;
  font-size: 0.9rem;
  
  a {
    color: #64ffda;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Copyright>
        © {currentYear} Portfolio. Designed & Built with ❤️ by
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"> Moksh</a>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
