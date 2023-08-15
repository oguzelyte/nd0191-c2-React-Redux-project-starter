import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import { middleware } from './middleware';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});
