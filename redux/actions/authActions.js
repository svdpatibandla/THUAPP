import axios from 'axios';

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_FIRST_NAME = 'SET_FIRST_NAME'; 
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_TRANSLATIONS = 'SET_TRANSLATIONS';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setFirstName = (firstName) => ({
  type: SET_FIRST_NAME,
  payload: firstName,
});

export const setLastName = (lastName) => ({
  type: SET_LAST_NAME,
  payload: lastName,
});

export const setTranslations = (translations) => ({
  type: SET_TRANSLATIONS,
  payload: translations,
});

export const fetchTranslations = () => {
  return async (dispatch) => {
    try {
      const translations = await axios.get('https://mobile-app-thu-e036558309fd.herokuapp.com/mobile/translations', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(setTranslations(translations.data));
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };
};
