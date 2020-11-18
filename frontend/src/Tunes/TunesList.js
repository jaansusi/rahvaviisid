import React, { useEffect, useState } from 'react';
import {
  useRouteMatch
} from 'react-router-dom';
import SortableTable from '../Components/SortableTable';
import Actions from '../Components/Actions';
import config from '../config';
import { useTranslation } from "react-i18next";

const TunesList = (() => {
  const { t } = useTranslation('common');
  let { url } = useRouteMatch();
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

  let headers = [
    t('tune.tuneReference'),
    t('tune.textReference'),
    t('tune.soundReference'),
    t('tune.videoReference'),
    t('tune.catalogue'),
    t('tune.nation'),
    t('tune.language'),
    t('tune.country'),
    t('action.actions')
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

export default TunesList;