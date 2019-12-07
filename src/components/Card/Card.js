import React, { Component } from 'react';
import styled, { css } from 'styled-components';

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

    return (
      <StyledWrapper>
        <StyledCard
          tabIndex="0"
          onKeyUp={this.handleFlip}
          onClick={this.handleFlip}
          isFlipped={isFlipped}
        >
          <StyledFront>
            <StyledName>LUKE SKYWALKER</StyledName>
          </StyledFront>

          <StyledBack>
            <p>Born: 19BBY</p>
            <p>Height: 172</p>
            <p>Weight: 77</p>
            <p>Specie: Human</p>
            <p>Language: Galactic Basic</p>
          </StyledBack>
        </StyledCard>
      </StyledWrapper>
    );
  }
}

export default Card;
