import React, { useEffect, useReducer } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import ViewDataFragment from '../Fragments/ViewDataFragment';
import axios from 'axios';
import { createEmptyDataObject, mapResponseToModel } from './ComponentHelpers';
import { Grid } from '@material-ui/core';
import Actions from './Buttons/Actions';

const ViewComponent = (({ model, filter, extraComponent }) => {
    let { id } = useParams();
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };
    let [formData, setFormData] = useReducer(
        formReducer,
        createEmptyDataObject(model)
    );
    console.log(createEmptyDataObject(model));
    useEffect(() => {
        axios
            .get(config.apiUrl + '/' + model.apiPath + '/' + id + (filter !== undefined ? '?filter=' + encodeURIComponent(JSON.stringify(filter)) : ''))
            .then((result) => {
                // Start the model mapping
                mapResponseToModel(result.data, model, setFormData);
                model.fields
                    .map((field, i) => {
                        if (field.type === 'external' && result[field.field] !== undefined) {
                            return axios
                                .get(config.apiUrl + '/' + field.apiPath + '/' + result[field.field])
                                .then((result) => {
                                    // Set the "values" field of the model as the result, this way, the choice input is passed on with the model
                                    model.fields[i].values = result.data;
                                });
                        }
                        return undefined;
                    })
                    .filter((x) => x !== undefined);

            });
    }, [id, model, filter]);
    return (
        <>
            <Actions apiPath={model.apiPath} id={id} />
            <Grid
                item
                xs>
                <ViewDataFragment model={model} elementData={formData} />        
            </Grid>
        </>
    );
});

export default ViewComponent;