import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import ViewDataFragment from '../Fragments/ViewDataFragment';

const ViewComponent = (({ model }) => {
    let { id } = useParams();
    let [data, setData] = useState({});
    useEffect(() => {
        fetch(config.apiUrl + '/' + model.apiPath + '/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                }
            );
    }, [id, model.apiPath]);

    return (
        <ViewDataFragment model={model} data={data}/>
    );
});

export default ViewComponent;