import React, { useState, useEffect } from 'react';
import config from '../config';
import ListDataFragment from '../Fragments/ListDataFragment';
import axios from 'axios';

const ListComponent = (({ model, filter, currentView, additionalButtons, actionsWidth }) => {
    let [data, setData] = useState([]);
    let [offset, setOffset] = useState(0);
    let [rowCount, setRowCount] = useState(0);

    useEffect(() => {
        
        if (rowCount === 0)
            axios.get(config.apiUrl + '/' + model.apiPath + '/count')
                .then(
                    (result) => {
                        setRowCount(result.data.count);
                    }
                ).then(() => {
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
                })
    }, [filter, model.apiPath, offset, rowCount]);
    return (
        <ListDataFragment
            model={model}
            apiPath={model.apiPath}
            data={data}
            rowCount={rowCount}
            setOffset={setOffset}
            currentView={currentView}
            additionalButtons={additionalButtons}
            actionsWidth={actionsWidth} />
    );
});

export default ListComponent;