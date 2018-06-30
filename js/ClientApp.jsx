// @flow

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootEl = document.getElementById('app');

if (!(rootEl instanceof Element)) {
  throw new Error('invalid type');
}

const renderApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootEl
  );
};
renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
