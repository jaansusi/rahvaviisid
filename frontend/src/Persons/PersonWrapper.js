import React from 'react';
import PersonsList from './PersonsList';
import Person from './Person';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';

const PersonWrapper = () => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Route exact path={url}>
        <PersonsList />
      </Route>

      <Route exact path={`${path}/:id`}>
        <Person />
      </Route>
    </>
  );
}

export default PersonWrapper;