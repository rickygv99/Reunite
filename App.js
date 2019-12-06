import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppNavigator from './AppNavigator';
import FlashMessage from "react-native-flash-message";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
        <FlashMessage position="top" />
      </Provider>
    );
  }
}
