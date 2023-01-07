/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import MovieIcon from '@mui/icons-material/Movie';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import genreIcons from '../../assets/genres';

import { selectGenreIdOrCategory } from '../../features/currentGenreIdOrCategory';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import useStyles from './styles.js';
import MovieList from '../MovieList/MovieList';
import { userSelector } from '../../features/auth';

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { dat: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, session_id: localStorage.getItem('session_id'), page: 1 });
  const { dat: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, session_id: localStorage.getItem('session_id'), page: 1 });
  const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavourites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMBD_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMBD_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchListed,
    });
    setIsMovieWatchListed((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/"> Something has gone wrong go back</Link>
      </Box>
    );
  }

  return (
    <>
      <Grid className={classes.containerSpaceAround}>
        <Grid item sm={12} lg={4} style={{ display: 'flex', marginbottom: '30px' }}>
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h3" align="center">
            {data?.title}({data.release_date.split('-')[0]})
          </Typography>
          <Typography variant="h5" align="center">
            {data?.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Rating readOnly value={data.vote_average / 2} />
              <Typography variant="subtitle1" gutterBottom styles={{ marginLeft: '10px' }}>
                {data?.vote_average}/10
              </Typography>
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime}min | Language: {data?.spoken_languages[0].name}
            </Typography>
          </Grid>
          <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre, i) => (
              <Link key={i + 1} className={classes.links} to="/" onClick={() => dispatch(selectGenreIdOrCategory(genre.id))}>
                <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
                <Typography variant="subtitle1" color="textPrimary">
                  {genre?.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
            Overview
          </Typography>
          <Typography style={{ marginBottom: '2rem' }}>
            {data?.overview}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Top Casts
          </Typography>
          <Grid item container spacing={2}>
            {data && data.credits.cast.map((character, i) => (
              character.profile_path && (
              <Grid key={i} style={{ textDecoration: 'none' }} item cs={4} md={2} component={Link} to={`/actors/${character.id}`}>
                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                <Typography color="textPrimary">
                  {character?.name}
                </Typography>
                <Typography color="textSecondary">
                  {character.character}
                </Typography>
              </Grid>
              )
            )).slice(0, 6)}
          </Grid>
          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}> Website </Button>
                  <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}> Imdb </Button>
                  <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button onClick={addToFavourites} href="#" endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                    {isMovieFavorited ? 'Unfavorite' : 'Favourite' }
                  </Button>
                  <Button onClick={addToWatchlist} href="#" endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}>
                    Watchlist
                  </Button>
                  <Button endIcon={<ArrowBack />} sc={{ borderColor: 'primary.main' }}>
                    <Typography component={Link} to="/" color="inherit" variant="subtitle" style={{ textDecoration: 'none' }}>
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>

        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : (
            <Box>
              Sorry nothing was found
            </Box>
          )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}

      >
        <iframe
          autoPlay
          className={classes.video}
          frameBorder="0"
          title="Trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[0]}`}
          allow="autoplay"
        />
      </Modal>

    </>
  );
};

export default MovieInformation;
