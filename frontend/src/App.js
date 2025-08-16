import React from 'react';
import { Helmet } from "react-helmet-async";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Grid from '@mui/material/Grid';

import { Header, Footer } from './Components/Layout';
import AssetRouter from './AssetRouter';
import Login from './Components/Authentication/Login';
import UseLocalStorageState from './Components/Authentication/UseLocalStorageState';
import SearchComponent from './Components/Search/SearchComponent';
import PageComponent from './Components/PageComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationHeader from './Components/Layout/LocationHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [authentication, setAuthentication] = UseLocalStorageState('user');
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rahvaviisid</title>
        <meta name="description" content="Rahvaviiside infosüsteem" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Helmet>
      <Router>
        <ThemeProvider theme={createTheme({ typography: { fontSize: 15, }, })}>
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
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
