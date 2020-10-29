import React from 'react';
import PersonWrapper from './Persons/PersonWrapper';
import Tunes from './Tunes/Tunes';
import Header from './Header/Header';
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
              <div>Home</div>
            </Route>
            <Route exact path="/persons">
              <PersonWrapper />
            </Route>
            <Route path="/tunes">
              <Tunes />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
