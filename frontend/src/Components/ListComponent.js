import React, { useState, useEffect } from 'react';
import config from '../config';
import ListDataFragment from './Fragments/ListDataFragment';
import axios from 'axios';
import { Grid } from '@material-ui/core';

const ListComponent = (({ model, filter, currentView, additionalButtons, actionsWidth }) => {
    let [data, setData] = useState([]);
    let [rowCount, setRowCount] = useState(0);

    const updateTable = ((offset) => {
        let filterObj = {
            offset: offset,
            limit: 10
        };
        if (filter !== undefined) {
            filterObj = { ...filterObj, ...filter };
        }
        axios.get(config.apiUrl + '/' + model.apiPath + '?filter=' + encodeURIComponent(JSON.stringify(filterObj)))
            .then(
                (result) => {
                    setData(result.data);
                }
            );
    });

    useEffect(() => {
        axios.get(config.apiUrl + '/' + model.apiPath + '/count')
            .then(
                (result) => {
                    setRowCount(result.data.count);
                }
            );
    }, [filter, model.apiPath, rowCount]);
    return (
        <Grid container alignItems='center'>
            <ListDataFragment
                model={model}
                apiPath={model.apiPath}
                data={data}
                rowCount={rowCount}
                updateTable={updateTable}
                currentView={currentView}
                additionalButtons={additionalButtons}
                actionsWidth={actionsWidth} />
        </Grid>
    );
});

export default ListComponent;