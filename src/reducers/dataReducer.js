import actionTypes from '../constants/actionTypesConstants';
import { actions as storageActions } from 'react-native-redux-storage-middleware';

const initialState = {
  serverData: {
    data: [],
    fetched: false,
    fetching: false,
    error: false
  },
  storage: {
    data: [
      {photos: []}
    ],
    fetched: false,
    fetching: false,
    error: false
  }
};

export default function Reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCHING_DATA:
      return {
        ...state,
        serverData: {
          data: [],
          fetched: false,
          fetching: true,
          error: false
        }
      }
    case actionTypes.FETCHING_DATA_SUCCESS:
      return {
        ...state,
        serverData: {
          data: action.data,
          fetched: true,
          fetching: false,
          error: false
        }
      }
    case actionTypes.FETCHING_DATA_FAILURE:
      return {
        ...state,
        serverData: {
          data: action.data,
          fetched: false,
          fetching: false,
          error: true
        }
      }
    case actionTypes.GET_STORAGE:
      return {
        ...state,
        storage: {
          data: [
            {photos: []}
          ],
          fetched: false,
          fetching: true,
          error: false
        }
      }
    case actionTypes.GET_STORAGE_SUCCESS:
      return {
        ...state,
        storage: {
          data: action.response,
          fetched: true,
          fetching: false,
          error: false
        }
      }
    case actionTypes.GET_STORAGE_FAILURE:
      return {
        ...state,
        storage: {
          data: [
            {photos: []}
          ],
          fetched: false,
          fetching: false,
          error: true
        }
      }

    default:
      return state
  }
};
