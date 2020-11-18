import React from 'react';
import PersonWrapper from './Persons/PersonWrapper';
import TuneWrapper from './Tunes/TuneWrapper';
import Header from './Header/Header';
import Home from './Home/Home';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
