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
    let [ offset, setOffset ] = useState(0);
    let [ rowCount, setRowCount ] = useState(0);
    useEffect(() => {
        axios.get(config.apiUrl + '/' + model.apiPath + '?filter={"offset":'+offset+', "limit": 10}')
            .then(
                (result) => {
                    setData(result.data);
                }
            );
        if (rowCount === 0)
            axios.get(config.apiUrl + '/' + model.apiPath + '/count')
            .then(
                (result) => {
                    setRowCount(result.data.count);
                }
            )
    }, [id, model.apiPath, offset, rowCount]);
    return (
        <ListDataFragment 
        model={model} 
        apiPath={model.apiPath} 
        tableData={data}
        rowCount={rowCount}
        setOffset={setOffset}/>
    );
});

export default ListComponent;