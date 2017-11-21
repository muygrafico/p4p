import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import appData from './dataReducer';
import nav from './navReducer';
import ui from './uiReducer';

const rootReducer = combineReducers({
    appData,
    nav,
    ui
});

export default rootReducer;
