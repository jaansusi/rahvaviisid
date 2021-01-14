import React, { useEffect, useState } from 'react';
import config from '../config';
import ListDataFragment from '../Fragments/ListDataFragment';
import TuneMap from './TuneMap';

const TunesList = (() => {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + '/tunes')
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        }
      )
  }, []);

  return (
    <ListDataFragment map={TuneMap} tableData={data} />
  );
});

export default TunesList;