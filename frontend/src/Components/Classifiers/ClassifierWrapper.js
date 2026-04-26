import React from 'react';
import Classifiers from './Classifiers';
import ClassifierTypeList from './ClassifierTypes/ClassifierTypeList';
import ClassifierTypeView from './ClassifierTypes/ClassifierTypeView';
import ClassifierTypeEdit from './ClassifierTypes/ClassifierTypeEdit';
import {
  Routes,
  Route
} from 'react-router-dom';
import { Grid } from '@mui/material';

const ClassifierWrapper = () => {

  return (
    <Grid item xs={12}>
      <Routes>
        <Route path="/" element={<Classifiers />} />
        <Route path="/:classifier" element={<ClassifierTypeList />} />
        <Route path="/:classifier/uus" element={<ClassifierTypeEdit newItem={true} />} />
        <Route path="/:classifier/:id/vaata" element={<ClassifierTypeView />} />
        <Route path="/:classifier/:id/muuda" element={<ClassifierTypeEdit />} />
      </Routes>
    </Grid>
  );
}

export default ClassifierWrapper;