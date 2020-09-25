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
  max-width: 140rem;
  margin: 0 auto;
  animation: ${fadeIn} 0.3s ease-out;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`;

const StyledHeading = styled.h2`
  color: #fff;
  font-size: 4rem;
  max-width: 140rem;
  margin: 5rem auto 3rem;
`;

const CardGrid = ({
  charactersArray,
  heading,
  handleFavButtonClicked,
  favCharacterUrls,
  loading,
}) => (
  <StyledMain>
    {charactersArray.length !== 0 ? (
      <StyledHeading>{!loading && heading}</StyledHeading>
    ) : (
      <StyledHeading>{!loading && 'There is nothing in here...'}</StyledHeading>
    )}
    {charactersArray.length !== 0 && (
      <StyledCardGrid>
        {charactersArray.map(
          ({ name, height, mass, skin_color, birth_year, gender, url }) => (
            <Card
              key={name}
              name={name}
              height={height}
              mass={mass}
              skinColor={skin_color}
              birthYear={birth_year}
              gender={gender}
              url={url}
              handleFavButtonClicked={handleFavButtonClicked}
              isFav={favCharacterUrls.includes(url)}
            />
          ),
        )}
      </StyledCardGrid>
    )}
  </StyledMain>
);

CardGrid.propTypes = {
  loading: PropTypes.bool.isRequired,
  charactersArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  heading: PropTypes.string.isRequired,
  handleFavButtonClicked: PropTypes.func.isRequired,
  favCharacterUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardGrid;
