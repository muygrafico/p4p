import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import HomeScreen from '../Screens/Home';
import QueueListScreen from '../Screens/QueueList';
import AutoLoginScreen from '../Screens/AutoLogin';
import SplashScreen from '../Screens/Splash';
import { WithAPI } from '../lib/Categories/API/Components';
import { WithAuth } from '../lib/Categories/Auth/Components';
import { WithStorage } from '../lib/Categories/Storage/Components';

export const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {header: null}
    },
    QueueList: {
      screen: QueueListScreen,
      navigationOptions: {header: null}
    },
    Autologin: {
      screen: AutoLoginScreen,
      navigationOptions: {header: null}
    },
    Splash: {
      screen: SplashScreen,
      navigationOptions: {header: null}
    },
  },{
    header: { visible: false }
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
