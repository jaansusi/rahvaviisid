import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../../Services';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let Login = ({ setAuthentication }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const navigate = useNavigate();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [credentialsValid, setCredentialsValid] = useState(true);
  let [errorMessage, setErrorMessage] = useState('');

  let tryLogin = (e) => {
    e.preventDefault();
    AuthService.Login(email, password, setAuthentication)
      .then(() => {
        setCredentialsValid(true);
        navigate('/');
      }
      )
      .catch(err => {
        let response = err.response.data;
        setCredentialsValid(false);
        if (response.error.statusCode === 401)
          setErrorMessage(response.error.message);
        else
          setErrorMessage('authentication.invalidCredentials');
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('login.signIn')}
        </Typography>
        <form
          onSubmit={(e) => tryLogin(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('login.email')}
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('login.password')}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            !credentialsValid &&
            <Typography color='error'>
              {t(errorMessage)}
            </Typography>
          }
          <Button
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {t('login.signIn')}
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link to="#" variant="body2">
              {t('login.forgotPassword')}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Login;