// redux/reducers/authReducer.js
import { SET_USER, SET_TOKEN, CLEAR_USER } from '../actions/authActions';
import { SET_FIRST_NAME, SET_LAST_NAME } from '../actions/authActions';


const initialState = {
  user: null,
  token: '',
  isAuthenticated: false,
  firstName: '',
  lastName: '',
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
    default:
      return state;
  }
};

export default authReducer;