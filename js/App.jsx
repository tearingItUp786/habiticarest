// @flow

import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';
import { AnimatedSwitch } from 'react-router-transition';

import 'normalize-css';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Login';
import Dashboard from './Dashboard';
import { defaultTheme } from './styling/styled';

/* Router styling */
export const StyledAnimatedSwitch = styled(AnimatedSwitch)`
  position: relative;
  min-height: 100%;
  min-width: 100%;
  background: #111;

  > div {
    position: absolute;
    width: 100%;
  }
`;

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <Fragment>
      <BrowserRouter>
        <StyledAnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/" component={Login} />
        </StyledAnimatedSwitch>
      </BrowserRouter>
      <ToastContainer style={{ fontFamily: defaultTheme.baseFont, colorError: defaultTheme.errorColor }} />
    </Fragment>
  </ThemeProvider>
);

export default App;
