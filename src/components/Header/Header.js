import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../../assets/images/bg.jpg';

const StyledHeader = styled.header`
  height: 65rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
      to bottom,
      rgba(18, 18, 22, 0.3),
      rgba(18, 18, 22, 1)
    ),
    url(${backgroundImage}) bottom / cover;
  position: relative;
`;

const StyledSubheader = styled.h2`
  color: #fff;
  margin-top: 7.5rem;
  font-size: 4rem;
  text-align: center;
`;

const StyledLogo = styled.h1`
  color: #eb4d4b;
`;

const StyledSpan = styled.span`
  color: #eb4d4b;
`;

const StyledButtonLink = styled.a`
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  background: #eb4d4b;
  border-radius: 5rem;
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin: 12rem auto;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.3);
`;

const Header = () => (
  <StyledHeader>
    <StyledLogo>.swchar</StyledLogo>
    <StyledSubheader>
      Learn more <br /> about your <br />
      <StyledSpan>favorite</StyledSpan> <br /> characters
    </StyledSubheader>
    <StyledButtonLink
      href="https://starwars.fandom.com/wiki/Star_Wars"
      target="_blank"
      rel="noopener"
    >
      fandom
    </StyledButtonLink>
  </StyledHeader>
);

export default Header;
