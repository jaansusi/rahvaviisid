import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import ListDataFragment from '../Fragments/ListDataFragment';

const ListComponent = ((props) => {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let objectMap = props.mapping;
    useEffect(() => {
        fetch(config.apiUrl + '/' + objectMap.apiPath)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                }
            );
    }, [id, objectMap.apiPath]);
    return (
        <ListDataFragment mapping={objectMap.list} tableData={data}/>
    );
});

export default ListComponent;