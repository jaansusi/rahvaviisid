import React, { useEffect, useState } from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';
import SortableTable from '../Components/SortableTable';
import Actions from '../Components/Actions';

const Tunes = (() => {
  let { url } = useRouteMatch();
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tunes")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        }
      )
  }, []);

  let headers = [
    'Viisiviide',
    'Tekstiviide',
    'Heliviide',
    'Videoviide',
    'Kartoteek',
    'Rahvas',
    'Keel',
    'Maa',
    'Tegevused'
  ];

  let getters = [
    x => x.tuneReference,
    x => x.catalogue,
    x => x.soundReference,
    x => x.videoReference,
    x => x.catalogue,
    x => x.nationId,
    x => x.languageId,
    x => x.countryId,
    x => <Actions url={url} id={x.id} />
  ];
  return (
    <SortableTable tableHeaders={headers} dataGetters={getters} url={url} tableData={data} />
  );
});

export default Tunes;