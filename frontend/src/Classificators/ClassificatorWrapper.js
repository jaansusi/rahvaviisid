import React from 'react';
import Classificators from './Classificators';
import ClassificatorTypeList from './ClassificatorTypes/ClassificatorTypeList';
import ClassificatorTypeView from './ClassificatorTypes/ClassificatorTypeView';
import ClassificatorTypeEdit from './ClassificatorTypes/ClassificatorTypeEdit';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';

const ClassificatorWrapper = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <Classificators />
      </Route>
      
      <Route exact path={`${path}/:classificator`}>
        <ClassificatorTypeList />
      </Route>
      <Route exact path={`${path}/:classificator/:id`}>
        <ClassificatorTypeView />
      </Route>
      <Route exact path={`${path}/:classificator/:id/muuda`}>
        <ClassificatorTypeEdit />
      </Route>
    </>
  );
}

export default ClassificatorWrapper;