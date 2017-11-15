import React from 'react';
import {
  AppRegistry
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
import AppWithNavigationState from './src/navigators/AppNavigator';

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

AppRegistry.registerComponent('pushforphotoapp', () => ReduxApp);
