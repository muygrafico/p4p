import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import appData from './dataReducer';
import nav from './navReducer';

const rootReducer = combineReducers({
    appData,
    nav
});

export default rootReducer;
