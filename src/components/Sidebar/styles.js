import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
    backgroundColor: theme.palette.mode === 'light' ? '#d4d6d5' : '#032541',
    backdropFilter: 'blur(10px)',
  },
  image: {
    width: '58.5%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
  },
}));
