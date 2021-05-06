import React from 'react';
import ListComponent from '../Components/ListComponent';
import { TuneModel } from '../Models';
import { DataService } from '../Services';

const TunesList = () => {
  return (
    <ListComponent model={TuneModel.list}
    filter={DataService.CreateIncludeFilter(TuneModel.list)} />
  );
};

export default TunesList;