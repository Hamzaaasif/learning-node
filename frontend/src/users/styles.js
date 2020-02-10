import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  //sign in styles
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url("./elevation.JPG")`,  //"url(" + "./elevation.JPG" + ")"
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  paper: {
    marginTop: theme.spacing(6 ,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(6, 0, 4),
  },
}));