import React from 'react';
import ListComponent from '../Components/ListComponent';
import TuneModel from './TuneModel';

const TunesList = () => {
  return (
    <ListComponent mapping={TuneModel} />
  );
};

export default TunesList;