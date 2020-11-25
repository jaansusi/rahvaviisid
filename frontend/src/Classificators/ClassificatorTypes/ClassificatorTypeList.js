import React, { useState, useEffect } from 'react';
import {
    useRouteMatch,
    useParams,
    Link
} from 'react-router-dom';
import config from '../../config';
import SortableTable from '../../Components/SortableTable';
import { useTranslation } from "react-i18next";
import typeMapper from './ClassificatorTypeMap';

const ClassificatorTypeList = (() => {
    const { t } = useTranslation('common');
    
    let { url } = useRouteMatch();
    let [data, setData] = useState([]);
    let { classificator } = useParams();
    let typeMap = typeMapper(t);
    let currentClassificator = typeMap[classificator];
    useEffect(() => {
        fetch(config.apiUrl + '/' + currentClassificator.apiPath)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setData(result);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, [currentClassificator.apiPath]);
    return (
        <>
            <Link className='action-link' to={`.`}>{t('common.back')}</Link>
            <SortableTable tableHeaders={currentClassificator.headers} dataGetters={currentClassificator.getters} url={url} tableData={data} />
        </>
    );
});


export default ClassificatorTypeList;