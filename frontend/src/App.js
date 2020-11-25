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

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rahvaviisid</title>
        <meta name="description" content="Rahvaviiside infosüsteem" />
      </Helmet>
      <Router>
          <Header />
          <div id="body">
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
          </div>
      </Router>
    </>
  );
}

export default App;
