import React from 'react';
import PersonsList from './PersonsList';
import PersonMap from './PersonMap';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';
import ViewComponent from '../Components/ViewComponent/ViewComponent';
import EditComponent from '../Components/EditComponent/EditComponent';

const PersonWrapper = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Route exact path={url}>
        <PersonsList />
      </Route>
      <Route exact path={`${path}/:id`}>
        <ViewComponent map={PersonMap} />
      </Route>
      <Route exact path={`${path}/edit/:id`}>
        <EditComponent map={PersonMap} />
      </Route>
    </>
  );
}

export default PersonWrapper;