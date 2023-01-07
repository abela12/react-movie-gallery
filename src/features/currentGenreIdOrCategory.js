/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const genreIdOrCategory = createSlice({
  name: 'genreIdOrCategory',
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreIdOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreIdOrCategory, searchMovie } = genreIdOrCategory.actions;
export default genreIdOrCategory.reducer;
