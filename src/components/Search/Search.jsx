import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { searchMovie } from '../../features/currentGenreIdOrCategory';
import useStyles from './styles';

function Search() {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(event.target.value));
    }
  };

  if (location.pathName !== '/') return null;

  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        variant="standard"
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Search;
