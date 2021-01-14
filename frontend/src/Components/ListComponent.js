import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';

const ListComponent = ((props) => {
    let { id } = useParams();
    let [data, setData] = useState({});
    let objectMap = props.map;
    useEffect(() => {
        fetch(config.apiUrl + '/' + objectMap.apiPath + '/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                }
            );
    }, [id, objectMap.apiPath]);

    return (
        <ListDataFragment mapping={objectMap} tableData={data}/>
    );
});

export default ListComponent;