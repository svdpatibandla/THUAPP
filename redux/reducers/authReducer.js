// redux/reducers/authReducer.js
import { SET_USER, CLEAR_USER } from '../actions/authActions';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;