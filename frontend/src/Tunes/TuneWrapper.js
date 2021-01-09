import React from 'react';
import TunesList from './TunesList';
import Tune from './TuneView';
// import TuneEdit from './TuneEdit';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';
import './TuneWrapper.css';
import 'abcjs/abcjs-audio.css';
import EditComponent from '../Components/EditComponent/EditComponent';
import TuneMap from './TuneMap';

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
      <Route exact path={`${path}/edit/:id`}>
        <EditComponent map={TuneMap} />
      </Route>
    </>
  );
}

export default TuneWrapper;