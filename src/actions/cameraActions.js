import actionTypes from '../constants/actionTypesConstants';
import { AsyncStorage } from 'react-native';
import LocalStorage from '../lib/Categories/LocalStorage';
import { fetchStorage } from '../actions/storageActions';

export function startSavePhotoUrl() {
  return {
    type: actionTypes.START_SAVE_PHOTO_LOCAL_URL
  }
};

export function savePhotoUrlSuccess(response) {
  return {
    type: actionTypes.SAVE_PHOTO_LOCAL_URL_SUCCESS,
    response,
  }
};

export function savePhotoUrlFailure(error) {
  return {
    type: actionTypes.SAVE_PHOTO_LOCAL_URL_FAILURE,
    error
  }
};

function Photo(url) {
    this.url = url;
    this.uploaded = false;
    this.date = new Date();
}

export const savePhotoUrl =
  async (value) => async (dispatch) => {
    dispatch(startSavePhotoUrl())
    // get current key
    let query = LocalStorage.getItem('photos');
    // create new Photo object
    let photo = new Photo(value);
    // if key 'photos' is not set, it will initialize it
    query === undefined ? LocalStorage.setItem('photos', []) : null;
    // add the new key to photos
    newArray = [...query, photo];
    // set new array with new photo into storage
    LocalStorage.setItem('photos', newArray);

    dispatch(fetchStorage('app-data'))
    // debugging: check updated status
    console.log(LocalStorage.getItem('photos'));

  };
