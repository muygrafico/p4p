import actionTypes from '../constants/actionTypesConstants';
import { AsyncStorage } from 'react-native';
import LocalStorage from '../lib/Categories/LocalStorage';
import { fetchStorage } from '../actions/storageActions';
import TimerMixin from 'react-timer-mixin';


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
    query === undefined ?
      // if key 'photos' is not set, it will initialize it
      LocalStorage.setItem('photos', [photo])
      :
      // if key 'photos' is set, add the new key to photos
      LocalStorage.setItem('photos', [...query, photo]);

    dispatch(fetchStorage('app-data'))
    .then((response) => {
       dispatch( onPictureAnimation() )
    })
    .catch((err) => {
      console.log(err);
    });


    // debugging: check updated status
    // console.log(LocalStorage.getItem('photos'));

  };

  export function startPictureAnimation() {
    // dispatch(onPictureAnimation())
    return {
      type: actionTypes.START_PICTURE_ANIMATION
    }
  };

  export function onPictureAnimation() {
    return {
      type: actionTypes.ON_PICTURE_ANIMATION
    }
  };

  export function endPictureAnimation() {
    return {
      type: actionTypes.END_PICTURE_ANIMATION
    }
  };
