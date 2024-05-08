import { SET_USER, SET_TOKEN, CLEAR_USER, SET_TRANSLATIONS, SET_FIRST_NAME, SET_LAST_NAME, USER_INFO, SET_UPLOADEDFILES } from '../actions/authActions';

const initialState = {
  user: null,
  userInfo: null,
  token: '',
  isAuthenticated: false,
  firstName: '',
  lastName: '',
  translations: null,
  uploadedFiles: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_UPLOADEDFILES:
      return {
        ...state,
        uploadedFiles: action.payload,
      };
    case SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
      };
    case SET_TRANSLATIONS:
      return {
        ...state,
        translations: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
