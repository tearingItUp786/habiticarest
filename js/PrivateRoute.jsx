// @flow
// TODO: Set up proper conditional check to see if user logged in

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isSignedIn } from './config';

type Props = {
  component: any
};

type InnerProps = {
  location: any
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props: InnerProps) =>
      isSignedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
