import React, { useState, useEffect } from 'react';
import config from '../config';
import ListDataFragment from '../Fragments/ListDataFragment';
import PersonMap from './PersonMap';

const PersonsList = () => {
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
    
    return (
        <ListDataFragment map={PersonMap} tableData={data} />
    );

}

export default PersonsList;