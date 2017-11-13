import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constants';
import { actions as storageActions } from 'react-native-redux-storage-middleware';
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  localData: []
};

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case 'GET_ALL_KEYS_SUCCEEDED': {
      // const key = action.key
      // const value = action.value
      // const modifiedState = {...state}
      // if (value !== null) {
      //   modifiedState[key] = value
      // }
      // return modifiedState
      console.log(action);
      return {
        ...state,
        localData: ['GET_ALL_KEYS_SUCCEEDED_DEBUGIN']
      }
    }

    case 'GET_ITEM_SUCCEEDED': {
      // const key = action.key
      // const value = action.value
      // const modifiedState = {...state}
      // if (value !== null) {
      //   modifiedState[key] = value
      // }
      // return modifiedState
      console.log(action);
      return {
        ...state,
        localData: ['GET_ALL_KEYS_SUCCEEDED_DEBUGIN']
      }
    }



    default:
      return state
  }
};
