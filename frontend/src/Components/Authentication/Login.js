import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AuthService } from '../../Services';
import { useNavigate } from 'react-router-dom';
import { tokens as C } from '../../theme';

const Login = ({ setAuthentication }) => {
    const { t } = useTranslation('common');
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [credentialsValid, setCredentialsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const tryLogin = (e) => {
        e.preventDefault();
        AuthService.Login(email, password, setAuthentication)
            .then(() => {
                setCredentialsValid(true);
                navigate('/');
            })
            .catch((err) => {
                setCredentialsValid(false);
                if (err.response?.data?.error?.statusCode === 401) {
                    setErrorMessage(err.response.data.error.message);
                } else {
                    setErrorMessage('authentication.invalidCredentials');
                }
            });
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ pt: 10, pb: 10 }}>
            <Box
                sx={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 2,
                    padding: '40px 36px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontFamily: "'EB Garamond', Georgia, serif",
                        fontSize: 32,
                        fontWeight: 500,
                        color: C.text,
                        mb: 0.5,
                    }}
                >
                    {t('login.signIn')}
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: C.muted, mb: 3 }}>
                    NORA — Eesti Rahvaviiside Andmebaas
                </Typography>
                <Box component="form" onSubmit={tryLogin} sx={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        size="small"
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
                        size="small"
                        required
                        fullWidth
                        label={t('login.password')}
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!credentialsValid && (
                        <Typography sx={{ color: C.danger, fontSize: 13, mt: 1 }}>
                            {t(errorMessage)}
                        </Typography>
                    )}
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 1, py: 1.2 }}
                    >
                        {t('login.signIn')}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
