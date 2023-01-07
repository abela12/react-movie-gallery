import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      curor: 'pointer',
      textDecoration: 'none',
    },
  },
  image: {
    borderRadius: '20px',
    height: '300px',
    marginBottom: '10px',
    '&:hover': {
      transform: 'Scale(1.05)',
      transition: '0.5s',
    },
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: '0',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '75px',
    },
  },
  tooltip: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
