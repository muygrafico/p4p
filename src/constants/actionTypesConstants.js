import keyMirror from 'keymirror';
const actionTypes = keyMirror({
  FETCHING_DATA: null,
  FETCHING_DATA_SUCCESS: null,
  FETCHING_DATA_FAILURE: null,

  GET_STORAGE: null,
  GET_STORAGE_SUCCESS: null,
  GET_STORAGE_FAILURE: null,

  START_SAVE_PHOTO_LOCAL_URL: null,
  SAVE_PHOTO_LOCAL_URL_SUCCESS: null,
  SAVE_PHOTO_LOCAL_URL_FAILURE: null,

  START_PICTURE_ANIMATION: null,
  ON_PICTURE_ANIMATION: null,
  END_PICTURE_ANIMATION: null,
});

export default actionTypes;
