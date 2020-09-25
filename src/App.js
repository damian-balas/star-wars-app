import axios from 'axios';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import GlobalStyle from './theme/GlobalStyle';
import Header from './components/Header/Header';
import CardGrid from './components/CardGrid/CardGrid';
import Pagination from './components/Pagination/Pagination';
import Spinner from './components/Spinner/Spinner';
import RadioGroup from './components/RadioGroup/RadioGroup';

function disableScroll(e) {
  if (e.keyCode === 32 && e.target.tagName.toLowerCase() === 'div') {
    e.preventDefault();
  }
}

const StyledErrorMessage = styled.h3`
  color: #fff;
  font-size: 3rem;
  padding: 2rem 3rem;
`;

const App = () => {
  const [page, setPage] = useState(1);
  const [displayFavs, setDisplayFavs] = useState(false);
  const [favCharacters, setFavCharacters] = useState([]);
  const favCharacterUrls = favCharacters.map(character => character.url);

  const fetcher = async (...args) => {
    const { data } = await axios.get(...args);
    return data;
  };
  const { data, error } = useSWR(`/?page=${page}`, fetcher);

  useEffect(() => {
    if (window.localStorage?.favCharacters) {
      const favCharactersFromLS = JSON.parse(window.localStorage.favCharacters);
      if (favCharactersFromLS.length) {
        setFavCharacters(favCharactersFromLS);
      }
    }

    window.addEventListener('keydown', disableScroll);
    return () => {
      window.removeEventListener('keydown', disableScroll);
    };
  }, []);

  useEffect(() => {
    if (favCharacters.length) {
      window.localStorage.favCharacters = JSON.stringify(favCharacters);
    }
  }, [favCharacters]);

  const addCharacterToFav = characterObj => {
    setFavCharacters(prevState => [...prevState, characterObj]);
  };

  const removeCharacterFromFav = name => {
    setFavCharacters(prevState => {
      const newFavs = prevState.filter(
        favCharacter => favCharacter.name !== name,
      );

      return newFavs;
    });
  };

  const handleFavButtonClicked = (characterObj, isFav) => {
    const { name } = characterObj;
    !isFav ? addCharacterToFav(characterObj) : removeCharacterFromFav(name);
  };

  const handleDisplayFavs = shouldDisplayFavs => {
    setDisplayFavs(shouldDisplayFavs);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <RadioGroup handleDisplayFavs={handleDisplayFavs} />
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
      {!error &&
        (displayFavs ? (
          <CardGrid
            handleFavButtonClicked={handleFavButtonClicked}
            heading="Favorite characters"
            charactersArray={favCharacters}
            favCharacterUrls={favCharacterUrls}
          />
        ) : (
          <>
            <Pagination
              isLoading={!data}
              setPage={setPage}
              count={data?.count || 0}
              page={page}
            />
            <CardGrid
              loading={!data}
              handleFavButtonClicked={handleFavButtonClicked}
              heading="Star Wars characters"
              charactersArray={data?.results || []}
              favCharacterUrls={favCharacterUrls}
            />
          </>
        ))}

      {!data && <Spinner />}
    </>
  );
};

export default App;
