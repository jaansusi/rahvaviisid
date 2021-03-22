import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import ViewDataFragment from '../Fragments/ViewDataFragment';
import axios from 'axios';

const ViewComponent = (({ model }) => {
    let { id } = useParams();
    let [data, setData] = useState({});
    useEffect(() => {
        axios.get(config.apiUrl + '/' + model.apiPath + '/' + id)
            .then(
                (result) => {
                    setData(result.data);
                    console.log(result);
                }
            );
    }, [id, model.apiPath]);

    return (
        <ViewDataFragment model={model} data={data}/>
    );
});

export default ViewComponent;