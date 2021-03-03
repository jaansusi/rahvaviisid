import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import ListDataFragment from '../Fragments/ListDataFragment';

const ListComponent = (({ model }) => {
    let { id } = useParams();
    let [data, setData] = useState([]);
    useEffect(() => {
        fetch(config.apiUrl + '/' + model.list.apiPath)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                }
            );
    }, [id, model.list.apiPath]);
    return (
        <ListDataFragment model={model.list} apiPath={model.apiPath} tableData={data}/>
    );
});

export default ListComponent;