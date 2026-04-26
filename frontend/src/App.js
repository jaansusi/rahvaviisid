import React from 'react';
import { Helmet } from "react-helmet-async";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Header, Footer } from './Components/Layout';
import AssetRouter from './AssetRouter';
import Login from './Components/Authentication/Login';
import useLocalStorageState from './Components/Authentication/useLocalStorageState';
import SearchComponent from './Components/Search/SearchComponent';
import PageComponent from './Components/PageComponent';
import ErrorBoundary from './Components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationHeader from './Components/Layout/LocationHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [authentication, setAuthentication] = useLocalStorageState('user');
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rahvaviisid</title>
        <meta name="description" content="Rahvaviiside infosüsteem" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Helmet>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <ThemeProvider theme={createTheme({ typography: { fontSize: 15, }, })}>
            <ErrorBoundary>
            <Grid container direction='column'>
              <Grid item>
                <Header authentication={authentication} setAuthentication={setAuthentication} />
              </Grid>
                <Grid
                  id='content-container'
                  item
                  xs={12}
                  container
                  direction='column'
                  alignItems='center'
                  className='body-container'
                >
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  <LocationHeader />
                  <Grid container item xs={11} justifyContent='center'>
                    <Routes>
                      <Route path="/" element={<PageComponent name='home' />} />
                      <Route path="/otsing" element={<SearchComponent />} />
                      <Route path="/otsinguabi" element={<SearchComponent />} />
                      <Route path="/login" element={<Login setAuthentication={setAuthentication} />} />
                      <Route path="/:asset/*" element={<AssetRouter />} />
                    </Routes>
                  </Grid>
                </Grid>
                <Grid item>
                  <Footer />
                </Grid>
              </Grid>
            </ErrorBoundary>
          </ThemeProvider>
        </Router>
      </LocalizationProvider>
    </>
  );
}

export default App;
