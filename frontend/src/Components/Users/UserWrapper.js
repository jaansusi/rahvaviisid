import React from 'react';
import UsersList from './UsersList';
import {
  Route
} from 'react-router-dom';
import UserView from './UserView';
import UserEdit from './UserEdit';

const UserWrapper = () => {

  return (
    <>
      <Route exact path={'/:asset'}>
        <UsersList />
      </Route>
      <Route exact path={`/:asset/uus`}>
        <UserEdit newItem={true} />
      </Route>
      <Route exact path={`/:asset/:id/vaata`}>
        <UserView />
      </Route>
      <Route exact path={`/:asset/:id/muuda`}>
        <UserEdit />
      </Route>
    </>
  );
}

export default UserWrapper;