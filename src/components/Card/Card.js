import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import uuid from 'uuid/v4';
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
  display: flex;
  flex-direction: column;
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
  max-width: 68.5rem;
`;

const StyledButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: ${({ isFav }) => (isFav ? '#fff' : '#eb4d4b;')};
  color: ${({ isFav }) => (isFav ? '#eb4d4b' : '#fff;')};
  margin-top: auto;
  align-self: flex-start;
  font-size: 1.6rem;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: transform 0.3s ease;
  box-shadow: 0px 10px 30px -10px rgba(255, 255, 255, 0.3);

  :hover,
  :focus {
    transform: translateY(-0.5rem);
  }
`;

class Card extends Component {
  state = {
    isFlipped: false,
  };

  handleFlip = event => {
    if (
      event.target.type !== 'button' &&
      (event.keyCode === 13 || !event.keyCode)
    ) {
      this.setState(prevState => ({
        isFlipped: !prevState.isFlipped,
      }));
    }
  };

  handleClick = () => {
    const {
      handleFavButtonClicked,
      name,
      height,
      mass,
      skinColor,
      birthYear,
      gender,
      url,
      isFav,
    } = this.props;

    handleFavButtonClicked(
      {
        id: uuid(),
        name,
        height,
        mass,
        skin_color: skinColor,
        birth_year: birthYear,
        url,
        gender,
      },
      isFav,
    );
  };

  render() {
    const { isFlipped } = this.state;
    const {
      name,
      height,
      mass,
      skinColor,
      birthYear,
      gender,
      isFav,
    } = this.props;
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
            <StyledButton
              isFav={isFav}
              onClick={this.handleClick}
              type="button"
            >
              {!isFav ? 'ADD TO FAVS' : 'REMOVE'}
            </StyledButton>
          </StyledFront>

          <StyledBack>
            <p>
              <StyledBoldSpan>Born:</StyledBoldSpan> {birthYear}
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
              <StyledBoldSpan>Skin color:</StyledBoldSpan> {skinColor}
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
  skinColor: PropTypes.string.isRequired,
  birthYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  gender: PropTypes.string.isRequired,
  handleFavButtonClicked: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  isFav: PropTypes.bool.isRequired,
};

export default Card;
