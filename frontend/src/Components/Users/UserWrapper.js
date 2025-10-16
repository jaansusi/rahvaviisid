import React from 'react';
import UsersList from './UsersList';
import {
  Routes,
  Route
} from 'react-router-dom';
import UserView from './UserView';
import UserEdit from './UserEdit';
import UserCreate from './UserCreate';
import { Grid } from '@mui/material';

const UserWrapper = () => {

  return (
    <Grid item xs={12}>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/uus" element={<UserCreate />} />
        <Route path="/:id/vaata" element={<UserView />} />
        <Route path="/:id/muuda" element={<UserEdit />} />
      </Routes>
    </Grid>
  );
}

export default UserWrapper;