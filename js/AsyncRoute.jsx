// @flow

import React, { Component } from 'react';
import { SpinnerContainer, DonutSpinner } from './styling/styled';

class AsyncRoute extends Component {
  state = {
    loaded: false
  };
  componentDidMount() {
    this.props.loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }
  props: {
    props: mixed,
    loadingPromise: Promise<{ default: Class<React.Component<*, *, *>> }>
  };
  component = null;
  render() {
    if (this.state.loaded) {
      return <this.component {...this.props.props} />;
    }
    return (
      <SpinnerContainer initial>
        <DonutSpinner />
      </SpinnerContainer>
    );
  }
}

export default AsyncRoute;
