import axios from 'axios';

export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_TRANSLATIONS = 'SET_TRANSLATIONS';
export const SET_UPLOADEDFILES = 'SET_UPLOADEDFILES';

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
  type: SET_USERINFO,
  payload: userInfo,
});

export const setTranslations = (translations) => ({
  type: SET_TRANSLATIONS,
  payload: translations,
});

export const setUploadedFiles = (uploadedFiles) => ({
  type: SET_UPLOADEDFILES,
  payload: uploadedFiles,
});

export const storeUploadedFiles = (uploadedFiles) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const currentPrevUploadedFiles = auth.uploadedFiles || []; 
    console.log('Current prev uploaded files at dispatch:', currentPrevUploadedFiles);
    const newPrevUploadedFiles = [...uploadedFiles, ...currentPrevUploadedFiles ]; 
    console.log('New prev uploaded files at dispatch:', newPrevUploadedFiles);
    dispatch(setUploadedFiles(newPrevUploadedFiles)); 
  };
};

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
