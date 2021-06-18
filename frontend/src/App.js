import React from 'react';
import { Helmet } from "react-helmet-async";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { Header, Footer } from './Components/Layout';
import AssetRouter from './AssetRouter';
import Login from './Components/Authentication/Login';
import UseLocalStorageState from './Components/Authentication/UseLocalStorageState';
import SearchComponent from './Components/Search/SearchComponent';
import PageComponent from './Components/PageComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocationHeader from './Components/Layout/LocationHeader';

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
        <Header authentication={authentication} setAuthentication={setAuthentication} />
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
          <Switch>
            <Route exact path="/">
              <PageComponent name='home' />
            </Route>
            <Route exact path="/otsing">
              <SearchComponent />
            </Route>
            <Route exact path="/otsinguabi">
              <SearchComponent />
            </Route>
            <Route exact path="/login">
              <Login setAuthentication={setAuthentication} />
            </Route>
            <Route path="/:asset">
              <AssetRouter />
            </Route>
          </Switch>
        </Grid>
        <Footer />
      </Router>
    </>
  );
}

export default App;
