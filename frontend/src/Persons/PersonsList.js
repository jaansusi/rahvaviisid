import React, { useState, useEffect } from 'react';
import {
    useRouteMatch
} from 'react-router-dom';
import config from '../config';
import SortableTable from '../Components/SortableTable';
import { useTranslation } from "react-i18next";

const PersonsList = () => {
    const { t } = useTranslation('common');
    let { url } = useRouteMatch();
    let [data, setData] = useState([]);
    useEffect(() => {
        fetch(config.apiUrl + '/persons')
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);
    let headers = [
        t('person.pid'),
        t('person.surname'),
        t('person.givenName'),
        t('person.nickname'),
        t('person.birthYear'),
        t('person.deathYear'),
        t('person.sex')
    ];
    let getters = [
        x => x.pid,
        x => x.surname,
        x => x.givenName,
        x => x.nickname,
        x => x.birthYear,
        x => x.deathYear,
        x => x.sexId
    ];
    return (
        <SortableTable tableHeaders={headers} dataGetters={getters} url={url} tableData={data}  />
    );

}

export default PersonsList;