import React from 'react';
import { createIncludeFilter } from '../Components/ComponentHelpers';
import ListComponent from '../Components/ListComponent';
import TuneModel from '../Models/TuneModel';

const TunesList = () => {
  return (
    <ListComponent model={TuneModel.list}
    filter={createIncludeFilter(TuneModel.list)} />
  );
};

export default TunesList;