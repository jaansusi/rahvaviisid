import React from 'react';
import UsersList from './UsersList';
import {
  Route
} from 'react-router-dom';
import UserView from './UserView';
import UserEdit from './UserEdit';
import UserCreate from './UserCreate';
import { Grid } from '@material-ui/core';

const UserWrapper = () => {

  return (
    <Grid item xs={12}>
      <Route exact path={'/:asset'}>
        <UsersList />
      </Route>
      <Route exact path={`/:asset/uus`}>
        <UserCreate />
      </Route>
      <Route exact path={`/:asset/:id/vaata`}>
        <UserView />
      </Route>
      <Route exact path={`/:asset/:id/muuda`}>
        <UserEdit />
      </Route>
    </Grid>
  );
}

export default UserWrapper;