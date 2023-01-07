import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';
import genreIdOrCategoryReducer from '../features/currentGenreIdOrCategory';
import userReducer from '../features/auth';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreIdOrCategory: genreIdOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
