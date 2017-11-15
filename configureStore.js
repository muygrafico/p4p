import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import app from './src/reducers';
import thunk from 'redux-thunk';
import { middleware as storageMiddleware } from 'react-native-redux-storage-middleware';


const middleware = [
  thunk,
  promise,
  storageMiddleware,
]

export default function configureStore() {
  let store = createStore(
    app,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
  )
  return store
};
