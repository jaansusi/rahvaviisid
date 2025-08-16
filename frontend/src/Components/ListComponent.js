import React, { useState, useEffect } from 'react';
import config from '../config';
import ListDataFragment from './Fragments/ListDataFragment';
import axios from 'axios';
import { Grid } from '@mui/material';

const ListComponent = (({ model, filter, currentView, additionalButtons, actionsWidth, values, viewOnly, actionUrlOverride }) => {
    let [data, setData] = useState([]);
    let [rowCount, setRowCount] = useState(0);

    const updateTable = ((offset) => {
        if (values) {
            setData(values);
            return;
        }
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
        if (values !== undefined)
            setRowCount(values.length);
        else
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
                actionsWidth={actionsWidth}
                viewOnly={viewOnly}
                actionUrlOverride={actionUrlOverride} />
        </Grid>
    );
});

export default ListComponent;