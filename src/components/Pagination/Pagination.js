import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  background: #eb4d4b;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  margin: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  outline: none;

  :hover,
  :focus {
    transform: translateY(-0.5rem);
    background: #fc6260;
  }

  :disabled,
  :disabled:hover,
  :disabled:focus {
    opacity: 0.7;
    transform: none;
    cursor: not-allowed;
  }
`;

const StyledPagination = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 30px;
`;

const Pagination = ({ count, setPage, isLoading, page }) => {
  const handleClick = pageNumber => {
    setPage(pageNumber);
  };
  const pagesCount = Math.ceil(count / 10);
  const pageURLs = [...Array(pagesCount).keys()].map(
    number => `/?page=${number + 1}`,
  );
  return (
    <StyledPagination>
      {pageURLs.length &&
        pageURLs.map((url, index) => (
          <StyledButton
            disabled={isLoading || index + 1 === page}
            key={url}
            type="button"
            onClick={() => handleClick(index + 1, url)}
          >
            {index + 1}
          </StyledButton>
        ))}
    </StyledPagination>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

export default Pagination;
