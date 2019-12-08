import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledRadioGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25rem;
  margin: 0 auto 2rem;
`;

const StyledFakeRadio = styled.span`
  position: relative;
  cursor: pointer;
  margin-right: 1rem;
  border-radius: 50%;

  ::before,
  ::after {
    content: '';
    box-sizing: border-box;
    display: block;
    transform-origin: top left;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ::before {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    border: 0.3rem solid #eb4d4b;
  }

  ::after {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    transform-origin: 50%, 50%;
    transform: scale(0, 0) translate(-50%, -50%);
    background: #eb4d4b;
  }
`;

const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;

  :checked + ${StyledFakeRadio} {
    ::after {
      transform: scale(1) translate(-50%, -50%);
    }
  }

  :focus + ${StyledFakeRadio}, :hover + ${StyledFakeRadio} {
    box-shadow: 0px 5px 15px -5px rgba(255, 255, 255, 0.3);
  }
`;

const RadioGroup = ({ handleDisplayFavs }) => {
  const handleChange = event => {
    handleDisplayFavs(!!event.target.value);
  };

  return (
    <StyledRadioGroup>
      <StyledLabel htmlFor="all">
        <StyledInput
          onChange={handleChange}
          defaultChecked
          type="radio"
          name="display"
          id="all"
          value=""
        />
        <StyledFakeRadio />
        all cards
      </StyledLabel>

      <StyledLabel htmlFor="favs">
        <StyledInput
          onChange={handleChange}
          type="radio"
          name="display"
          id="favs"
          value
        />
        <StyledFakeRadio />
        favs
      </StyledLabel>
    </StyledRadioGroup>
  );
};

RadioGroup.propTypes = {
  handleDisplayFavs: PropTypes.func.isRequired,
};

export default RadioGroup;
