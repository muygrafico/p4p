import actionTypes from '../constants/actionTypesConstants';
import { actions as storageActions } from 'react-native-redux-storage-middleware';

const initialState = {
  awsData: [],
  isLoggedIn: null,
  storage: null,
  storageFetched: null,
  storageFetching: null,
  storageFetchingError: null
};

export default function Reducer (state = initialState, action) {
  switch (action.type) {
    // case actionTypes.FETCHING_DATA:
    //   return Object.assign({}, state, { serverFetching: true });
    //
    // case actionTypes.FETCHING_DATA_SUCCESS:
    //   console.log(action.data);
    //   return Object.assign({}, state, {
    //     serverData: action.data,
    //     serverFetched: true,
    //     serverResponseError: false
    //   });
    // case actionTypes.FETCHING_DATA_FAILURE:
    //   return Object.assign({}, state, {
    //     serverFetched: false,
    //     serverResponseError: true
    //   });

    case actionTypes.GET_STORAGE:
      return Object.assign({}, state, { storageFetching: true });

    case actionTypes.GET_STORAGE_SUCCESS:
    console.log(action.key);
    console.log(action.payload);
      switch (action.key) {
        case 'app-data':
           action.payload.awsCredentials = action.payload.awsCredentials ?
           JSON.parse(action.payload.awsCredentials) :
              action.payload.awsCredentials;

          return Object.assign({}, state, {
            isLoggedIn: action.payload.isLoggedIn,
            storage: {
              photos: action.payload.photos,
              isLoggedIn: action.payload.isLoggedIn,
              awsCredentials: action.payload.awsCredentials,
            },
            storageFetched: true,
            storageFetching: false,
            storageFetchingError: false
          });

        case 'photos':
        return Object.assign({}, state, {
          photos: action.payload
        });

        default:
        return Object.assign({}, state, {
          [action.key]: action.payload
        });

      }

    case actionTypes.GET_STORAGE_FAILURE:
      return Object.assign({}, state, {
        storageFetching: false,
        storageFetchingError: true
      });

    default:
      return state
  }
};
