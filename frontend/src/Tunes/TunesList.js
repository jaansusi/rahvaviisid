import React from 'react';
import ListComponent from '../Components/ListComponent';
import TuneModel from '../Models/TuneModel';

const TunesList = () => {
  return (
    <ListComponent model={TuneModel.list} />
  );
};

export default TunesList;