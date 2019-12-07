import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Card from '../Card/Card';

const fadeIn = keyframes`
  from {
    transform: translateY(3rem);
    opacity: 0;
  } to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledMain = styled.main`
  padding: 0 3rem 5rem;
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-gap: 3rem;
  max-width: 120rem;
  margin: 0 auto;
  animation: ${fadeIn} 0.3s ease-out;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`;

const StyledHeading = styled.h2`
  color: #fff;
  font-size: 4rem;
  margin: 5rem 0 3rem;
`;

const CardGrid = ({ charactersArray, heading }) => (
  <StyledMain>
    {charactersArray.length !== 0 && <StyledHeading>{heading}</StyledHeading>}
    <StyledCardGrid>
      {charactersArray &&
        charactersArray.map(
          ({ name, height, mass, skin_color, birth_year, gender, url }) => (
            <Card
              key={url}
              name={name}
              height={height}
              mass={mass}
              skinColor={skin_color}
              birthYear={birth_year}
              gender={gender}
            />
          ),
        )}
    </StyledCardGrid>
  </StyledMain>
);

CardGrid.propTypes = {
  charactersArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  heading: PropTypes.string.isRequired,
};

export default CardGrid;
