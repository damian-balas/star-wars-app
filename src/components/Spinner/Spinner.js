import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ripple = keyframes`
  from{
    box-shadow: 0 0 0 0 rgba(255,255,255, 0.3), 0 0 0 10px rgba(255,255,255, 0.3), 0 0 0 30px rgba(255,255,255, 0.3), 0 0 0 60px rgba(255,255,255, 0.3);
  }

  to{
    box-shadow: 0 0 0 10px rgba(255,255,255, 0.3), 0 0 0 30px rgba(255,255,255, 0.3), 0 0 0 60px rgba(255,255,255, 0.3), 0 0 0 90px rgba(255,255,255, 0);
  }
`;

const StyledSpinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  margin: 5rem auto;
  border-radius: 50%;
  animation: ${ripple} 0.7s linear infinite;
  margin-top: 10rem;
  background-color: #fff;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(18, 18, 22, 0.95);
`;

const Spinner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const sleep = setTimeout(() => {
      setShow(true);
    }, 200);

    return () => {
      clearTimeout(sleep);
    };
  }, []);
  if (show) {
    return (
      <StyledWrapper>
        <StyledSpinner />
      </StyledWrapper>
    );
  }
  return null;
};

export default Spinner;
