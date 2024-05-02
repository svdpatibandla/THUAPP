export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_FIRST_NAME = 'SET_FIRST_NAME'; 
export const SET_LAST_NAME = 'SET_LAST_NAME';

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
  });

export const clearUser = () => ({
    type: 'CLEAR_USER',
});

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

export const setFirstName = (firstName) => ({
    type: 'SET_FIRST_NAME',
    payload: firstName,
});

export const setLastName = (lastName) => ({
    type: 'SET_LAST_NAME',
    payload: lastName,
});
