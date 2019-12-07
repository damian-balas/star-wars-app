import React from 'react';
import PropTypes from 'prop-types';
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

const CardGrid = ({ charactersArray }) => (
  <StyledMain>
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
};
export default CardGrid;
