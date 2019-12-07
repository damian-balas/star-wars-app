import React, { Component } from 'react';
import axios from 'axios';

import GlobalStyle from './theme/GlobalStyle';
import Header from './components/Header/Header';
import CardGrid from './components/CardGrid/CardGrid';

class App extends Component {
  state = {
    pageURLs: [],
    page: null,
    characters: [],
  };

  async componentDidMount() {
    const response = await axios.get('https://swapi.co/api/people');
    const {
      data,
      data: { results },
    } = response;

    const pagesCount = Math.ceil(data.count / 10);
    const pageURLs = [...Array(pagesCount).keys()].map(
      number => `https://swapi.co/api/people/?page=${number + 1}`,
    );

    this.setState({
      characters: results,
      pageURLs,
    });
  }

  render() {
    const { characters } = this.state;

    return (
      <>
        <GlobalStyle />
        <Header />
        <CardGrid charactersArray={characters} />
      </>
    );
  }
}

export default App;
