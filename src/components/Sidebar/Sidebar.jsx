import React from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { selectGenreIdOrCategory } from '../../features/currentGenreIdOrCategory';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import darkIcon from '../../assets/images/dark.png';
import whiteIcon from '../../assets/images/white.png';

const cat = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo = whiteIcon;
const blueLogo = darkIcon;

function Sidebar() {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="FilmpireLogo"
        />
      </Link>
      <List>
        <ListSubheader> Categories</ListSubheader>
        {cat.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreIdOrCategory(value))}>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader> Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <Link key={name} className={classes.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreIdOrCategory(id))} button>
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
