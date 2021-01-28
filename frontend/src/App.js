import React from 'react';
import PersonWrapper from './Persons/PersonWrapper';
import TuneWrapper from './Tunes/TuneWrapper';
import Header from './Header/Header';
import ClassificatorWrapper from './Classificators/ClassificatorWrapper';
import Home from './Home/Home';
import { Helmet } from "react-helmet-async";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Footer from './Footer/Footer';

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rahvaviisid</title>
        <meta name="description" content="Rahvaviiside infosüsteem" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Helmet>
      <Router>
        <Header />
        <Grid
          container
          direction='column'
          alignItems='center'
          className='body-container'
        >
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/isikud">
              <PersonWrapper />
            </Route>
            <Route path="/viisid">
              <TuneWrapper />
            </Route>
            <Route path="/klassifikaatorid">
              <ClassificatorWrapper />
            </Route>
          </Switch>
        </Grid>
        <Footer />
      </Router>
    </>
  );
}

export default App;
