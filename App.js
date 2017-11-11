import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { WithAPI } from './lib/Categories/API/Components';
import { WithAuth } from './lib/Categories/Auth/Components';
import { WithStorage } from './lib/Categories/Storage/Components';
import Home from './src/Screens/Home';
import Splash from './src/Screens/Splash';

const App = DrawerNavigator({
  Home: {
    screen: props => <Home rootNavigator={props.navigation} {...props.screenProps } />,
  },
  Splash: {
    screen: props => <Splash navigation={props.navigation} { ...props.screenProps } />,
    navigationOptions: {
      drawerLabel: ' ',
    },
  },
}, { initialRouteName: 'Splash' });

const AppContainer = props => <App screenProps={{ ...props }} />;

export default WithStorage(WithAPI(WithAuth(AppContainer)));
