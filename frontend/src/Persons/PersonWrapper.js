import React from 'react';
import PersonsList from './PersonsList';
import Person from './Person';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';

const PersonWrapper = () => {
  let { path, url } = useRouteMatch();
  console.log(path);
  // to-do: There must be a better way to do this
  if (path === '/persons')
    return (
      <PersonsList url={url} />
    );
  return (
    <>
      <Route exact path={`${path}/:id`}>
        <Person />
      </Route>
    </>
  );
}

export default PersonWrapper;