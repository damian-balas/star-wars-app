import React, { Component } from 'react';
import GlobalStyle from './theme/GlobalStyle';

import Header from './components/Header/Header';
import CardGrid from './components/CardGrid/CardGrid';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
        <CardGrid />
      </>
    );
  }
}

export default App;
