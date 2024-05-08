import axios from 'axios';

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_USER = 'CLEAR_USER';
export const USER_INFO = 'USER_INFO';
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

export const setUserInfo = (userInfo) => ({
  type: USER_INFO,
  payload: userInfo,
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

    const paramsData = {
      "email": "psvdutt+test5@gmail.com",
      "auth0_id": "auth0|6634357975c4bd61c0d7eeaa",
    }
    try {
      const translations = await axios.get('https://mobile-app-thu-e036558309fd.herokuapp.com/mobile/translations', {
        params: paramsData,
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
