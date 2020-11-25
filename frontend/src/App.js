import React from 'react';
import PersonWrapper from './Persons/PersonWrapper';
import TuneWrapper from './Tunes/TuneWrapper';
import Header from './Header/Header';
import Classificators from './Classificators/Classificators';
import Home from './Home/Home';
import { Helmet } from "react-helmet";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rahvaviisid</title>
        <meta name="description" content="Rahvaviiside infosüsteem" />
      </Helmet>
      <Router>
        <div>
          <Header />
          <div id="body">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/persons">
                <PersonWrapper />
              </Route>
              <Route path="/tunes">
                <TuneWrapper />
              </Route>
              <Route path="/classificators">
                <Classificators />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
