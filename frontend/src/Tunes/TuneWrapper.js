import React from 'react';
import TunesList from './TunesList';
import Tune from './Tune';
// import TuneEdit from './TuneEdit';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';
import './TuneWrapper.css';
import 'abcjs/abcjs-audio.css';

const TuneWrapper = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Route exact path={url}>
        <TunesList />
      </Route>

      <Route exact path={`${path}/:id`}>
        <Tune />
      </Route>
      {/* <Route exact path={`${path}/edit/:id`}>
        <TuneEdit />
      </Route> */}
    </>
  );
}

export default TuneWrapper;