import React from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';

const StyledMain = styled.main`
  padding: 0 3rem 5rem;
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-gap: 3rem;
  max-width: 120rem;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`;

const CardGrid = () => (
  <StyledMain>
    <StyledCardGrid>
      <Card />
      <Card />
      <Card />
    </StyledCardGrid>
  </StyledMain>
);

export default CardGrid;
