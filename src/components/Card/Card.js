import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 30px;
  background-color: #1f1f22;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 12px 40px -20px rgba(0, 0, 0, 0.4);
`;

const StyledName = styled.h3`
  font-size: 2.5rem;
`;

const StyledInfoWrapper = styled.div`
  margin-top: 2rem;
`;

const Card = () => (
  <StyledCard>
    <StyledName>LUKE SKYWALKER</StyledName>
    <StyledInfoWrapper>
      <p>Born: 19BBY</p>
      <p>Height: 172</p>
      <p>Weight: 77</p>
      <p>Specie: Human</p>
      <p>Language: Galactic Basic</p>
    </StyledInfoWrapper>
  </StyledCard>
);

export default Card;
