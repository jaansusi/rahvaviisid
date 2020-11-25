import React from 'react';
import Classificators from './Classificators';
import ClassificatorTypeList from './ClassificatorTypes/ClassificatorTypeList';
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
      {/* <Route exact path={`${path}/:id`}>
        <Person />
      </Route>
      <Route exact path={`${path}/edit/:id`}>
        <PersonEdit />
      </Route> */}
    </>
  );
}

export default ClassificatorWrapper;