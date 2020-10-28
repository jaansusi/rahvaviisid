import React from 'react';
import Persons from './Persons/Persons';
import Tunes from './Tunes/Tunes';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/persons">Isikud</Link>
          </li>
          <li>
            <Link to="/tunes">Viisid</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route path="/persons">
            <Persons />
          </Route>
          <Route path="/tunes">
            <Tunes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
