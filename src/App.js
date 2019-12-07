import React, { Component } from 'react';
import GlobalStyle from './theme/GlobalStyle';

import Header from './components/Header/Header';
import Card from './components/Card/Card';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
        <Card />
      </>
    );
  }
}

export default App;
