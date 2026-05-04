import React from 'react';
import { Helmet } from "react-helmet-async";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Header, Footer } from './Components/Layout';
import AssetRouter from './AssetRouter';
import HaldaRouter from './HaldaRouter';
import Login from './Components/Authentication/Login';
import useLocalStorageState from './Components/Authentication/useLocalStorageState';
import TuneSearchPage from './Components/Search/TuneSearch';
import PersonSearchPage from './Components/Search/PersonSearch';
import HomePage from './Components/HomePage';
import ErrorBoundary from './Components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationHeader from './Components/Layout/LocationHeader';
import { ThemeProvider } from '@mui/material/styles';
import noraTheme from './theme';

function PageContainer({ children }) {
  return (
    <Grid container item xs={12} justifyContent='center' style={{
      width: '100%',
      maxWidth: 1160,
      margin: '0 auto',
      padding: '24px 32px 64px',
    }}>
      {children}
    </Grid>
  );
}

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
          <ThemeProvider theme={noraTheme}>
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
                  <Grid container item xs={12} justifyContent='center' style={{ width: '100%' }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/otsing" element={<Navigate to="/otsi/viisid" replace />} />
                      <Route path="/otsi/viisid" element={<PageContainer><TuneSearchPage /></PageContainer>} />
                      <Route path="/otsi/isikud" element={<PageContainer><PersonSearchPage /></PageContainer>} />
                      <Route path="/halda/*" element={<PageContainer><HaldaRouter /></PageContainer>} />
                      <Route path="/login" element={<Login setAuthentication={setAuthentication} />} />
                      <Route path="/:asset/*" element={<PageContainer><AssetRouter /></PageContainer>} />
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
