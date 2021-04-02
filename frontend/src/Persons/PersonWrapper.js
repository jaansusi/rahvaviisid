import React from 'react';
import PersonsList from './PersonsList';
import {
  Route
} from 'react-router-dom';
import PersonView from './PersonView';
import PersonEdit from './PersonEdit';

const PersonWrapper = () => {

  return (
    <>
      <Route exact path={'/:asset'}>
        <PersonsList />
      </Route>
      <Route exact path={`/:asset/:id/vaata`}>
        <PersonView />
      </Route>
      <Route exact path={`/:asset/:id/muuda`}>
        <PersonEdit />
      </Route>
    </>
  );
}

export default PersonWrapper;