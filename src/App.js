import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import GlobalStyle from './theme/GlobalStyle';
import Header from './components/Header/Header';
import CardGrid from './components/CardGrid/CardGrid';
import Pagination from './components/Pagination/Pagination';
import Spinner from './components/Spinner/Spinner';

class App extends Component {
  state = {
    pageURLs: [],
    page: 1,
    characters: [],
    isLoading: true,
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
      characters: results,
      pageURLs,
      isLoading: false,
    });
  }

  getNewCharacters = async (url, page) => {
    const { isLoading } = this.state;

    if (!isLoading) {
      this.setState({
        isLoading: true,
      });
      const response = await axios.get(`${url}`);
      const characters = response.data.results;
      this.setState({
        characters,
        page,
        isLoading: false,
      });
    }
  };

  render() {
    const { characters, pageURLs, isLoading, page } = this.state;

    return (
      <>
        <GlobalStyle />
        <Header />
        <Pagination
          isLoading={isLoading}
          pageURLs={pageURLs}
          getNewCharacters={this.getNewCharacters}
          page={page}
        />
        <CardGrid heading="Star Wars characters" charactersArray={characters} />
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
