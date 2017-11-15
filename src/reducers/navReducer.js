import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: Autologin, with the Splash screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Autologin');
const secondAction = AppNavigator.router.getActionForPathAndParams('Splash');
const tempNavState = AppNavigator.router.getStateForAction(secondAction);
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction,
  tempNavState
);

export default function navReducer (state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
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
    case 'Autologin':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Autologin' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  };

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
