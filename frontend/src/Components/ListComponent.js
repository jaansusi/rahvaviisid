import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import ListDataFragment from '../Fragments/ListDataFragment';
import axios from 'axios';

const ListComponent = (({ model }) => {
    let { id } = useParams();
    let [data, setData] = useState([]);
    useEffect(() => {
        axios.get(config.apiUrl + '/' + model.apiPath)
            .then(
                (result) => {
                    setData(result.data);
                }
            );
    }, [id, model.apiPath]);
    return (
        <ListDataFragment model={model} apiPath={model.apiPath} tableData={data}/>
    );
});

export default ListComponent;