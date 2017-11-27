import actionTypes from '../constants/actionTypesConstants';
import { AsyncStorage } from 'react-native';

export function getStorage() {
  return {
    type: actionTypes.GET_STORAGE
  }
};

export function getStorageSuccess(response) {
  return {
    type: actionTypes.GET_STORAGE_SUCCESS,
    response,
  }
};

export function getStorageFailure(error) {
  return {
    type: actionTypes.GET_STORAGE_FAILURE,
    error
  }
};

export function onPictureAnimation() {
  return {
    type: actionTypes.ON_PICTURE_ANIMATION
  }
};

export const fetchStorage =
  async (key) => async (dispatch) => {
    // dispatch(getStorage())
    AsyncStorage.getItem(key).then( value => {
      dispatch(getStorageSuccess(JSON.parse(value)));

    }, error => {
      console.exception(`fetchStorage error at storageActions: ${error}!`);
      dispatch(getStorageFailure(error));
    });
  };
