import actionTypes from '../constants/actionTypesConstants';

const initialState = {
  picturePreview: {
    animationStart: false,
    animationOngoin: false,
    animationEnd: true,
  }
};

export default function uiReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_PICTURE_ANIMATION:
      return {
        ...state,
        picturePreview: {
          animationStart: true,
          animationOngoin: false,
          animationEnd: false,
        }
      }
    case actionTypes.ON_PICTURE_ANIMATION:
      return {
        ...state,
        picturePreview: {
          animationStart: true,
          animationOngoin: true,
          animationEnd: false,
        }
      }
    case actionTypes.END_PICTURE_ANIMATION:
      return {
        ...state,
        picturePreview: {
          animationStart: false,
          animationOngoin: false,
          animationEnd: true,
        }
      }

    default:
      return state
  }
};
