import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import config from '../config';
import EditDataFragment from '../Fragments/EditDataFragment';
import axios from 'axios';
import { createEmptyDataObject, mapResponseToModel } from './ComponentHelpers';
import Actions from './Buttons/Actions';

const EditComponent = ({ model, extraComponent, filter, newItem }) => {
    newItem = newItem === undefined ? false : newItem;
    const { t } = useTranslation('common');
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };
    let { id } = useParams();
    
    let [formData, setFormData] = useReducer(
        formReducer,
        createEmptyDataObject(model.fields)
    );

    let [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        // If there are any other requests to make based on the root model, then this is the place
        let modelPromises = model.fields
            .map((field, i) => {
                if (field.type === 'dropdown') {
                    return axios
                        .get(config.apiUrl + '/' + field.apiPath)
                        .then((result) => {
                            // Set the "values" field of the model as the result, this way, the choice input is passed on with the model
                            model.fields[i].values = result.data;
                        });
                }
                return undefined;
            })
            .filter((x) => x !== undefined);

        Promise.all(modelPromises).then(() => {
            if (newItem) {

            } else {
                // Retrieve the data
                axios
                    .get(config.apiUrl + '/' + model.apiPath + '/' + id + (filter !== undefined ? '?filter=' + filter : ''))
                    .then((result) => {
                        // Start the model mapping
                        mapResponseToModel(result.data, model, setFormData);
                    });
            }

        });
    }, [id, model, filter, newItem]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true);

        submitData(model, formData);
    };

    // Function for submitting form data to API
    let submitData = (currentModel, data) => {
        // Since loopback does not want us sending any extra data (nested objects),
        // let's collect all correctly cleaned objects in here and send them one by one
        // Note: we're currently assuming here that nesting only runs 1 level deep, to make it run deeper, recursion should be used
        let requestObjects = [];

        // Only work on a copy of data
        let tempData = Object.assign({}, data);

        // Null all the empty values, so we don't anger the APIs model detection with unnecessary strings
        // to-do: this needs a rework
        for (let key in tempData) {
            if (tempData[key] === '') {
                tempData[key] = undefined;
            }
        }

        // Find all the nested elements, we need to patch them one by one
        for (let modelKey in currentModel.fields) {
            let modelElem = currentModel.fields[modelKey];
            if (modelElem !== undefined && modelElem.nested !== undefined) {
                // Add them to an array for later use and then purge the data object of them
                requestObjects.push({
                    model: modelElem.nested,
                    dataElem: tempData[modelElem.field],
                });
                tempData[modelElem.field] = undefined;
            }
        }

        // Last, let's add the root object as well
        requestObjects.push({ model: currentModel, dataElem: tempData });

        requestObjects.forEach((obj) => {
            if (newItem) {
                // No DB entries exist, use post requests
                axios
                .post(
                    config.apiUrl + '/' + obj.model.apiPath,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj.dataElem),
                    }
                ) 
                .then((resData) => {
                    console.log(resData);
                });
            } else {
                // DB entries should already exist, use patch requests
                // to-do: new subelements (like a tune variation) needs to be handled with a post request instead
                axios
                .patch(
                    config.apiUrl + '/' + obj.model.apiPath + '/' + obj.dataElem.id,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj.dataElem),
                    }
                )
                .then((resData) => {
                    console.log(resData);
                });
            }
            
        });

        setTimeout(() => {
            setSubmitting(false);
        }, 3000);
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setFormData({
            name: name,
            // Numbers need to be sent as actual numeric values, not strings
            value: type === 'number' ? parseInt(value, 10) : value,
        });
    };

    return (
        <>
        { !newItem ? <Actions apiPath={model.apiPath} id={id} /> : null }
            <form onSubmit={handleSubmit}>
                <EditDataFragment
                    model={model}
                    formData={formData}
                    handleChange={handleChange}
                    extraComponent={extraComponent}
                />

                <Grid item xs className="form-edit-item">
                    <Button
                        type="submit"
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                    >
                        {t('edit.save')}
                    </Button>
                </Grid>
            </form>
        </>
    );
};

export default EditComponent;
