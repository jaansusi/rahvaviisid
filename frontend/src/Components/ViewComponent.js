import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import ViewDataFragment from '../Fragments/ViewDataFragment';

const ViewComponent = ((props) => {
    let { id } = useParams();
    let [data, setData] = useState({});
    let objectMap = props.mapping;
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
        <ViewDataFragment mapping={objectMap} tableData={data}/>
    );
});

export default ViewComponent;