import { configureStore } from '@reduxjs/toolkit'; // Correct import from Redux Toolkit
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* your custom middleware here */),
});

export default store;
// redux//store.js
