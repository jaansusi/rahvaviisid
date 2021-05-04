import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import AuthService from './AuthService';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [credentialsValid, setCredentialsValid] = useState(true);

  let tryLogin = (e) => {
    e.preventDefault();
    AuthService.login(email, password, setAuthentication)
      .then((res) => {
        setCredentialsValid(res);
        if (res)
          history.push('/');
      }
      );
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
          <FormControlLabel
            control={<Checkbox disabled value="remember" color="primary" />}
            label={t('login.rememberMe')}
          />
          {
            !credentialsValid &&
            <Typography color='error'>
              {t('login.invalidCredentials')}
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