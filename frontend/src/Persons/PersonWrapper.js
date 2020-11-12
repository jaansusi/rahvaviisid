import React from 'react';
import PersonsList from './PersonsList';
import Person from './Person';
import PersonEdit from './PersonEdit';
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
      <Route exact path={`${path}/edit/:id`}>
        <PersonEdit />
      </Route>
    </>
  );
}

export default PersonWrapper;