import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

axios.defaults.baseURL = 'https://swapi.dev/api/people';
ReactDOM.render(<App />, document.getElementById('root'));
