import React from 'react';
import Classificators from './Classificators';
import ClassificatorTypeList from './ClassificatorTypes/ClassificatorTypeList';
import ClassificatorTypeView from './ClassificatorTypes/ClassificatorTypeView';
import ClassificatorTypeEdit from './ClassificatorTypes/ClassificatorTypeEdit';
import {
  Routes,
  Route
} from 'react-router-dom';
import { Grid } from '@mui/material';

const ClassificatorWrapper = () => {

  return (
    <Grid item xs={12}>
      <Routes>
        <Route path="/" element={<Classificators />} />
        <Route path="/:classificator" element={<ClassificatorTypeList />} />
        <Route path="/:classificator/uus" element={<ClassificatorTypeEdit newItem={true} />} />
        <Route path="/:classificator/:id/vaata" element={<ClassificatorTypeView />} />
        <Route path="/:classificator/:id/muuda" element={<ClassificatorTypeEdit />} />
      </Routes>
    </Grid>
  );
}

export default ClassificatorWrapper;