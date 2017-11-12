import React from 'react';
import {
  AppRegistry
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';
import AppWithNavigationState from './src/Navigators/AppNavigator';

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    {/* <App /> */}
    <AppWithNavigationState />
  </Provider>
);

AppRegistry.registerComponent('pushforphotoapp', () => ReduxApp);
