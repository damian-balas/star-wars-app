import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import GlobalStyle from './theme/GlobalStyle';
import Header from './components/Header/Header';
import CardGrid from './components/CardGrid/CardGrid';
import Pagination from './components/Pagination/Pagination';
import Spinner from './components/Spinner/Spinner';
import RadioGroup from './components/RadioGroup/RadioGroup';

class App extends Component {
  state = {
    pageURLs: [],
    page: 1,
    characters: [],
    isLoading: true,
    favCharacters: [],
    displayFavs: false,
  };

  async componentDidMount() {
    const { baseUrl } = this.props;

    const response = await axios.get(`${baseUrl}`);
    const {
      data,
      data: { results },
    } = response;

    const pagesCount = Math.ceil(data.count / 10);
    const pageURLs = [...Array(pagesCount).keys()].map(
      number => `${baseUrl}/?page=${number + 1}`,
    );

    this.setState({
      characters: results.map(char => ({
        ...char,
        id: uuid(),
      })),
      pageURLs,
      isLoading: false,
    });
  }

  addCharacterToFav = characterObj => {
    this.setState(prevState => ({
      favCharacters: [...prevState.favCharacters, characterObj],
    }));
  };

  removeCharacterFromFav = name => {
    this.setState(prevState => {
      const newFavs = prevState.favCharacters.filter(
        favCharacter => favCharacter.name !== name,
      );

      return {
        favCharacters: newFavs,
      };
    });
  };

  handleFavButtonClicked = (characterObj, isFav) => {
    const { name } = characterObj;
    const { addCharacterToFav, removeCharacterFromFav } = this;
    !isFav ? addCharacterToFav(characterObj) : removeCharacterFromFav(name);
  };

  getNewCharacters = async (url, page) => {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({
        isLoading: true,
      });
      const response = await axios.get(`${url}`);
      const characters = response.data.results.map(char => ({
        ...char,
        id: uuid(),
      }));
      this.setState({
        characters,
        page,
        isLoading: false,
      });
    }
  };

  handleDisplayFavs = displayFavs => {
    this.setState({
      displayFavs,
    });
  };

  render() {
    const {
      characters,
      pageURLs,
      isLoading,
      page,
      favCharacters,
      displayFavs,
    } = this.state;
    const favCharacterUrls = favCharacters.map(character => character.url);
    return (
      <>
        <GlobalStyle />
        <Header />
        <RadioGroup handleDisplayFavs={this.handleDisplayFavs} />

        {displayFavs ? (
          <CardGrid
            handleFavButtonClicked={this.handleFavButtonClicked}
            heading="Favorite characters"
            charactersArray={favCharacters}
            favCharacterUrls={favCharacterUrls}
          />
        ) : (
          <>
            <Pagination
              isLoading={isLoading}
              pageURLs={pageURLs}
              getNewCharacters={this.getNewCharacters}
              page={page}
            />
            <CardGrid
              handleFavButtonClicked={this.handleFavButtonClicked}
              heading="Star Wars characters"
              charactersArray={characters}
              favCharacterUrls={favCharacterUrls}
            />
          </>
        )}

        {isLoading && <Spinner />}
      </>
    );
  }
}

App.propTypes = {
  baseUrl: PropTypes.string,
};

App.defaultProps = {
  baseUrl: 'https://swapi.co/api/people',
};

export default App;
