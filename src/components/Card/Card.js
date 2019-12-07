import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import cardBg from '../../assets/images/cardBg.jpg';

const styledFrontAndBack = css`
  height: 100%;
  width: 100%;
  box-shadow: 0 12px 40px -20px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  position: absolute;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: transform ease-out 0.5s;
  background-color: #1f1f22;
  padding: 30px;
`;

const StyledFront = styled.div`
  ${styledFrontAndBack};
  z-index: 2;
  transform: rotateY(0deg);
  background: linear-gradient(310deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
    linear-gradient(310deg, rgba(235, 77, 75, 0.2), rgba(0, 0, 0, 0.3)),
    url(${cardBg}) center / cover;
`;

const StyledBack = styled.div`
  ${styledFrontAndBack};
  transform: rotateY(-180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;

  p:not(:first-of-type) {
    margin-top: 1rem;
  }
`;

const StyledBoldSpan = styled.span`
  font-weight: 600;
  color: #eb4d4b;
`;

const StyledCard = styled.div`
  height: 30rem;
  color: white;
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  outline: none;
  transition: transform 0.3s ease;
  :focus ${StyledFront}, :focus ${StyledBack} {
    box-shadow: 0 12px 40px -20px rgba(255, 255, 255, 0.3);
  }

  ${({ isFlipped }) =>
    isFlipped &&
    css`
      ${StyledFront} {
        transform: rotateY(180deg);
      }

      ${StyledBack} {
        transform: rotateY(0deg);
      }
    `}
`;

const StyledName = styled.h3`
  font-size: 3rem;
`;

const StyledWrapper = styled.div`
  position: relative;
  perspective: 120rem;
`;

class Card extends Component {
  state = {
    isFlipped: false,
  };

  handleFlip = event => {
    if (event.keyCode === 13 || event.keyCode === undefined) {
      this.setState(prevState => ({
        isFlipped: !prevState.isFlipped,
      }));
    }
  };

  render() {
    const { isFlipped } = this.state;
    const { name, height, mass, skin_color, birth_year, gender } = this.props;
    return (
      <StyledWrapper>
        <StyledCard
          tabIndex="0"
          onKeyUp={this.handleFlip}
          onClick={this.handleFlip}
          isFlipped={isFlipped}
        >
          <StyledFront>
            <StyledName>{name}</StyledName>
          </StyledFront>

          <StyledBack>
            <p>
              <StyledBoldSpan>Born:</StyledBoldSpan> {birth_year}
            </p>
            <p>
              <StyledBoldSpan>Height:</StyledBoldSpan> {height} cm
            </p>
            <p>
              <StyledBoldSpan>Weight:</StyledBoldSpan> {mass} kg
            </p>
            <p>
              <StyledBoldSpan>Gender:</StyledBoldSpan> {gender}
            </p>
            <p>
              <StyledBoldSpan>Skin color:</StyledBoldSpan> {skin_color}
            </p>
          </StyledBack>
        </StyledCard>
      </StyledWrapper>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  skin_color: PropTypes.string.isRequired,
  birth_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  gender: PropTypes.string.isRequired,
};

export default Card;
