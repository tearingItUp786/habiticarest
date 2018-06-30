// @flow

import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';
import { AnimatedSwitch } from 'react-router-transition';

// import 'normalize-css';
// import 'react-toastify/dist/ReactToastify.css';
import AsyncRoute from './AsyncRoute';
// import Login from './Login';
// import Dashboard from './Dashboard';
import { defaultTheme } from './styling/styled';

if (typeof require.ensure !== 'function')
  require.ensure = (d, c) => {
    c(require);
  };
if (typeof require.include !== 'function') require.include = () => {};

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
      <StyledAnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }}>
        <Route
          exact
          path="/login"
          component={props => <AsyncRoute props={props} loadingPromise={import('./Login')} />}
        />
        <Route
          exact
          path="/dashboard"
          component={props => <AsyncRoute props={props} loadingPromise={import('./Dashboard')} />}
        />
        <Route path="/" component={props => <AsyncRoute props={props} loadingPromise={import('./Login')} />} />
      </StyledAnimatedSwitch>
      <ToastContainer style={{ fontFamily: defaultTheme.baseFont, colorError: defaultTheme.errorColor }} />
    </Fragment>
  </ThemeProvider>
);

export default App;
