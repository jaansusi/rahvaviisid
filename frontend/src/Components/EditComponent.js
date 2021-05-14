import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import config from '../config';
import EditDataFragment from '../Fragments/EditDataFragment';
import axios from 'axios';
import Actions from './Buttons/Actions';
import { DataService } from '../Services';

const EditComponent = ({ model, newItem }) => {
    newItem = newItem === undefined ? false : newItem;
    const { t } = useTranslation('common');
    const history = useHistory();
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };
    let { id } = useParams();

    let [elementData, setElementData] = useReducer(
        formReducer,
        DataService.CreateEmptyDataObject(model.fields)
    );

    let [submitting, setSubmitting] = useState(false);
    let [updatedModel, setUpdatedModel ] = useState(model);
    useEffect(() => {
        let retrievedValues = [];
        let getDropdowns = (currentModel) => {
            return currentModel.fields
            .map((field, i) => {
                if (field.type === 'dropdown' && !retrievedValues.includes(field.apiPath)) {
                    retrievedValues.push(field.apiPath);
                    return axios
                        .get(config.apiUrl + '/' + field.apiPath)
                        .then((result) => {
                            // Set the "values" field of the model as the result, this way, the choice input is passed on with the model
                            return {name: field.field, data: result.data};
                        });
                        
                }
                let selection = [];
                if (field.edit) {
                    selection.push(getDropdowns(field.edit));
                }
                if (field.nested) {
                    selection.push(getDropdowns(field.nested));
                }
                return selection !== [] ? selection : undefined;
            });
        }
        let modelPromises = getDropdowns(model).flat(100);
        console.log(retrievedValues);
        Promise.all(modelPromises).then((x) => {
            x = x.filter((x) => x !== undefined);
            console.log(x);
            
            setUpdatedModel(recurseModelValues(model, x));
            if (newItem) {
                setElementData(DataService.CreateEmptyDataObject(model.fields));
            } else {
                // Retrieve the data
                axios
                    .get(config.apiUrl + '/' + model.apiPath + '/' + id + '?filter=' + encodeURIComponent(JSON.stringify(DataService.CreateIncludeFilter(model))))
                    .then((result) => {
                        // Start the model mapping
                        DataService.MapResponseToModel(result.data, model, setElementData);
                    });
            }

        });
    }, [id, model, newItem]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true);

        submitData(model, elementData);

        setSubmitting(false);
    };

    // Function for submitting form data to API
    let submitData = (currentModel, data) => {
        let recurse = (recursedModel, recursedData) => {
            let requestObject = {};
            for (let modelKey in recursedModel.fields) {
                let modelElem = recursedModel.fields[modelKey];
                if (modelElem !== undefined) {
                    if (modelElem.edit !== undefined) {
                        if (Array.isArray(recursedData[modelElem.field])) {
                            requestObject[modelElem.field] = [];
                            recursedData[modelElem.field].forEach((dataArrayElem, i) => {
                                requestObject[modelElem.field].push(recurse(modelElem.edit, dataArrayElem));
                            });
                        }
                        else
                            requestObject[modelElem.field] = recurse(modelElem.edit, recursedData[modelElem.field]);
                    } else if (recursedData[modelElem.field] !== '') {
                        switch (modelElem.type) {
                            case 'number':
                                requestObject[modelElem.field] = parseInt(recursedData[modelElem.field], 10);
                                break;
                            default:
                                requestObject[modelElem.field] = recursedData[modelElem.field]
                                break;
                        }
                    }
                }
            }
            console.log(requestObject);
            return requestObject;
        }
        let objToSend = recurse(currentModel, Object.assign({}, data));
        if (newItem) {
            // No DB entry exists, use post request
            axios
                .post(
                    config.apiUrl + '/' + currentModel.apiPath,
                    objToSend,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                .then((resData) => {
                    console.log(resData);
                    history.push('.');
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                });
        } else {
            // DB entry already exists, use patch request
            axios
                .patch(
                    config.apiUrl + '/' + currentModel.apiPath + '/' + objToSend.id,
                    objToSend,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                .then((resData) => {
                    // console.log(resData);
                });
        }

    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setElementData({
            name: name,
            // Numbers need to be sent as actual numeric values, not strings
            value: type === 'number' ? parseInt(value, 10) : value,
        });
    };

    return (
        <>
            { !newItem ? <Actions apiPath={model.apiPath} id={id} spacing={2} currentView='edit' /> : null}
            <form onSubmit={handleSubmit}>
                <EditDataFragment
                    model={updatedModel}
                    elementData={elementData}
                    handleChange={handleChange}
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

const recurseModelValues = (currentModel, options) => {
    currentModel.fields = currentModel.fields
    .map((field, i) => {
        console.log(field.type);
        if (field.nested) {
            field.nested = recurseModelValues(field.nested, options);
        }
        if (field.edit) {
            field.edit = recurseModelValues(field.edit, options);
        }
        if (field.type === 'dropdown') {
            console.log(options);
            console.log(field.field);
            field.values = options.filter((y) => y.name === field.field)[0].data;
        }
        return field;
    });
    return currentModel;
}

export default EditComponent;
