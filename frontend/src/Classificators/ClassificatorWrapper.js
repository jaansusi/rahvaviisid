import React from 'react';
import Classificators from './Classificators';
import ClassificatorTypeList from './ClassificatorTypes/ClassificatorTypeList';
import ClassificatorTypeView from './ClassificatorTypes/ClassificatorTypeView';
import ClassificatorTypeEdit from './ClassificatorTypes/ClassificatorTypeEdit';
import {
  Route
} from 'react-router-dom';

const ClassificatorWrapper = () => {

  return (
    <>
      <Route exact path={'/:asset'}>
        <Classificators />
      </Route>
      
      <Route exact path={`/:asset/:classificator`}>
        <ClassificatorTypeList />
      </Route>
      <Route exact path={`/:asset/:classificator/:id/vaata`}>
        <ClassificatorTypeView />
      </Route>
      <Route exact path={`/:asset/:classificator/:id/muuda`}>
        <ClassificatorTypeEdit />
      </Route>
    </>
  );
}

export default ClassificatorWrapper;