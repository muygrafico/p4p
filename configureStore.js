import { createStore, applyMiddleware } from 'redux';
import app from './reducers';
import thunk from 'redux-thunk';
import { middleware as storageMiddleware } from 'react-native-redux-storage-middleware';

const middleware = [
  thunk,
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
