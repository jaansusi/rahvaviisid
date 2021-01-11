import React from 'react';
import TunesList from './TunesList';
import Tune from './TuneView';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';
import './TuneWrapper.css';
import 'abcjs/abcjs-audio.css';
import EditComponent from '../Components/EditComponent/EditComponent';
import TuneMap from './TuneMap';
import TunePlayer from './TunePlayer';

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
        <TunePlayer editable={true} />
      </Route>
    </>
  );
}

export default TuneWrapper;