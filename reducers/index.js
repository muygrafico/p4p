import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../src/Navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('QueueList');
const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
        // NavigationActions.back(),
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
      break;
    case 'QueueList':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'QueueList' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

import appData from './dataReducer'

const rootReducer = combineReducers({
    appData,
    nav
})

export default rootReducer
