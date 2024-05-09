import { SET_USER, SET_TOKEN, CLEAR_USER, SET_TRANSLATIONS, SET_USERINFO, SET_UPLOADEDFILES } from '../actions/authActions';

const initialState = {
  user: null,
  userInfo: null,
  token: '',
  isAuthenticated: false,
  firstName: '',
  lastName: '',
  translations: null,
  uploadedFiles: [],
  isAuthenticated: true,
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
    case SET_USERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_UPLOADEDFILES:
      return {
        ...state,
        uploadedFiles: action.payload,
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
