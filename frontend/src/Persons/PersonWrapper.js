import React from 'react';
import PersonsList from './PersonsList';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';
import PersonView from './PersonView';
import PersonEdit from './PersonEdit';

const PersonWrapper = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Route exact path={url}>
        <PersonsList />
      </Route>
      <Route exact path={`${path}/:id`}>
        <PersonView />
      </Route>
      <Route exact path={`${path}/:id/muuda`}>
        <PersonEdit />
      </Route>
    </>
  );
}

export default PersonWrapper;