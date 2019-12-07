import React, { Component } from 'react';
import GlobalStyle from './theme/GlobalStyle';

import Header from './components/Header/Header';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
      </>
    );
  }
}

export default App;
