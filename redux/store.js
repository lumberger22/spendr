import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import user from './slices/user';
const store = configureStore({
  reducer: {
    user
  },
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;