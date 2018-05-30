// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App';

const rootEl = document.getElementById('app');

if (!(rootEl instanceof Element)) {
  throw new Error('invalid type');
}

const renderApp = () => {
  render(<App />, rootEl);
};
renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
