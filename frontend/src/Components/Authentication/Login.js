import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../../Services';
import { useNavigate } from 'react-router-dom';

let Login = ({ setAuthentication }) => {
  const { t } = useTranslation('common');
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
        setCredentialsValid(false);
        if (err.response?.data?.error?.statusCode === 401)
          setErrorMessage(err.response.data.error.message);
        else
          setErrorMessage('authentication.invalidCredentials');
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: 'secondary.main',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('login.signIn')}
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => tryLogin(e)}
          sx={{
            width: '100%', // Fix IE 11 issue.
            marginTop: 1,
          }}
        >
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
            sx={{
              margin: '24px 0 16px',
            }}
          >
            {t('login.signIn')}
          </Button>
        </Box>
        <Grid container>
          <Grid item xs>
            <Link to="#" variant="body2">
              {t('login.forgotPassword')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;