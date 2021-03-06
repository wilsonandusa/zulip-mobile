import React, { Component } from 'react';
import { Provider } from 'react-redux';

import '../vendor/intl/intl';
import store, { restore } from './store';
import LoadingScreen from './start/LoadingScreen';
import Providers from './Providers';

require('./i18n/locale');

export default class ZulipMobile extends Component {

  state = {
    rehydrated: false,
  };

  componentWillMount() {
    restore(() => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return <LoadingScreen />;
    }

    return (
      <Provider store={store}>
        <Providers />
      </Provider>
    );
  }
}
