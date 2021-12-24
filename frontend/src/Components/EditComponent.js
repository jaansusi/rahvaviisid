import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import config from '../config';
import EditDataFragment from './Fragments/EditDataFragment';
import axios from 'axios';
import Actions from './Buttons/Actions';
import { DataService, TuneService } from '../Services';
import { toast } from 'react-toastify';
import BarLoader from 'react-spinners/BarLoader';
import './EditComponent.css';

const EditComponent = ({ model, newItem, copyItem, validateTune }) => {
    newItem = newItem === undefined ? false : newItem;
    copyItem = copyItem === undefined ? false : copyItem;
    const { t } = useTranslation('common');
    const history = useHistory();
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };
    let { id } = useParams();

    const [assetData, setAssetData] = useReducer(formReducer, {});

    const [submitting, setSubmitting] = useState(false);
    const [updatedModel, setUpdatedModel] = useState(model);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let retrievedValues = [];
        let getDropdowns = (currentModel) => {
            return currentModel.fields
                .map((field) => {
                    if (field.apiPath && (field.type === 'dropdown' || field.type === 'multiselect') && !retrievedValues.includes(field.field)) {
                        retrievedValues.push(field.field);
                        return axios
                            .get(config.apiUrl + '/' + field.apiPath)
                            .then((result) => {
                                // Set the "values" field of the model as the result, this way, the choice input is passed on with the model
                                return { name: field.field, data: result.data };
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
        Promise.all(modelPromises).then((options) => {
            options = options.filter((x) => x !== undefined);
            setUpdatedModel(recurseModelValues(model, options));
            if (newItem || copyItem) {
                let assetPromise = id ?
                    DataService.RequestAsset(model, id) :
                    DataService.CreateEmptyDataObject(model.fields);
                assetPromise
                    .then(asset => {
                        for (const key in asset) {
                            setAssetData({
                                'name': key,
                                'value': asset[key]
                            });
                        }
                    })
                    .then(() => setIsLoading(false));
            } else {
                // Retrieve the data
                DataService.RequestAsset(model, id)
                    .then(asset => {
                        for (const key in asset) {
                            setAssetData({
                                'name': key,
                                'value': asset[key]
                            });
                        }
                    })
                    .then(() => { setIsLoading(false) });
            }
        });
    }, [id, model, newItem, copyItem]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true);
        submitData(model, assetData);
        setSubmitting(false);
    };

    // Function for submitting form data to API
    let submitData = (currentModel, data) => {
        let recurse = (recursedModel, recursedData) => {
            if (recursedData === undefined)
                return undefined;
            let requestObject = {};
            // Iterate over each property in the current MODEL
            for (let modelKey in recursedModel.fields) {
                // Get the current element in MODEL
                let modelElem = recursedModel.fields[modelKey];
                // Get the DATA value
                const value = recursedData[modelElem.field];
                // If the value is empty and the model type is dropdown then ignore this value
                if (modelElem.type === 'dropdown') {
                    if (!value) {
                        continue;
                    } else {
                        requestObject[modelElem.field] = value;
                    }
                }

                // Ignore values we don't need to send
                if (modelElem.type === 'label' || modelElem.type === 'view' || modelElem.type === 'player')
                    continue;

                // If the value is empty, check if there is a default in the model
                if (value === '' && modelElem.default) {
                    requestObject[modelElem.field] = modelElem.default;
                    continue;
                }

                // If the value is nullable and an empty string, send null
                if (value === '' && modelElem.nullable) {
                    requestObject[modelElem.field] = null;
                    continue;
                }

                // If there is a MODEL defined for this field..
                if (modelElem?.edit !== undefined) {
                    // If DATA object is an array
                    if (Array.isArray(value)) {
                        // Map over each of the array elements by recursing with this function
                        requestObject[modelElem.field] = value.map(dataArrayElem => {
                            return recurse(modelElem.edit, dataArrayElem);
                        });
                    }
                    // If not, recurse normally
                    else
                        requestObject[modelElem.field] = recurse(modelElem.edit, value);
                }
                else if (modelElem?.nested !== undefined) {
                    // If DATA object is an array
                    if (Array.isArray(value)) {
                        // Map over each of the array elements by recursing with this function
                        requestObject[modelElem.field] = value.map(dataArrayElem => {
                            return recurse(modelElem.nested, dataArrayElem);
                        });
                    }
                    // If not, recurse normally
                    else {
                        requestObject[modelElem.field] = recurse(modelElem.nested, value);
                    }
                }
                // Otherwise, check if DATA is actually there
                else if (recursedData) {
                    // And then modify it based on the MODEL type
                    switch (modelElem.type) {
                        // Can't send a number as a string
                        case 'number':
                            requestObject[modelElem.field] = parseInt(value, 10);
                            break;
                        // Most dropdowns are integers with one exception, users, hence this check.
                        case 'dropdown':
                            // This is a regex for an uuid
                            const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                            let arr = regex.exec(value);
                            if (arr !== null)
                                requestObject[modelElem.field] = value;
                            else
                                requestObject[modelElem.field] = parseInt(value, 10);
                            break;
                        case 'date':
                            if (value === '')
                                requestObject[modelElem.field] = null;
                            else
                                requestObject[modelElem.field] = value;
                            break;
                        default:
                            requestObject[modelElem.field] = value;
                            break;
                    }
                }
            }
            return requestObject;
        }
        console.log(currentModel);
        //First let's make sure that all the necessary models are using the correct data type
        let objToSend = recurse(currentModel, Object.assign({}, data));
        
        if (validateTune && !TuneService.Validate(objToSend, t))
            return;
        if (newItem || copyItem) {
            let createAsset = Object.assign({}, objToSend);
            delete createAsset.id;
            Object.keys(createAsset).forEach((key) => {
                if (typeof createAsset[key] === 'object' || Array.isArray(createAsset[key]))
                    delete createAsset[key];
            });
            // No DB entry exists, use post request
            axios
                .post(
                    config.apiUrl + '/' + currentModel.apiPath,
                    createAsset,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                .then((resData) => {
                    if (copyItem)
                        objToSend = removeObjectIds(objToSend, true);
                    //Hacky way to get around LBs "no ids in create function" problem
                    objToSend.id = resData.data.id;
                    axios
                        .patch(
                            config.apiUrl + '/' + currentModel.apiPath + '/' + objToSend.id,
                            removeObjectIds(objToSend, false),
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }
                        )
                        .then(() => {
                            toast.success(t('notification.saved'));
                            if (copyItem)
                                history.push('../' + resData.data.id + '/vaata');
                            if (newItem)
                                history.push('./' + resData.data.id + '/vaata');
                        })
                        .catch((error) => {
                            if (error.response.status === 422) {
                                if (!error.response.data.error.details)
                                    toast.error(t(error.response.data.error.message), {
                                        closeButton: true,
                                        autoClose: false
                                    });
                                else
                                    error.response.data.error.details.forEach(x => handleErrors(t, x));
                            }
                            else
                                toast.error(t('notification.failed'));
                        });
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        let errors = error.response.data.error.details;
                        if (!errors)
                            toast.error(t(error.response.data.error.message), {
                                closeButton: true,
                                autoClose: false
                            })
                        else {
                            if (Array.isArray(errors))
                                error.response.data.error.details.forEach(x => {
                                    handleErrors(t, x);
                                });
                            else
                                handleErrors(t, errors);
                        }

                    }
                    else
                        toast.error(t('notification.failed'));
                });
        } else {
            console.log(objToSend);
            let id = objToSend.id;
            objToSend = removeObjectIds(objToSend, false);
            // DB entry already exists, use patch request
            axios
                .patch(
                    config.apiUrl + '/' + currentModel.apiPath + '/' + id,
                    objToSend,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                .then(() => {
                    toast.success(t('notification.saved'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        if (!error.response.data.error.details)
                            toast.error(t(error.response.data.error.message), {
                                closeButton: true,
                                autoClose: false
                            })
                        else
                            error.response.data.error.details.forEach(x => handleErrors(t, x));
                    }
                    else
                        toast.error(t('notification.failed'));
                });
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setAssetData({
            name: name,
            // Numbers need to be sent as actual numeric values, not strings
            value: type === 'number' ? parseInt(value, 10) : value,
        });
    };

    if (isLoading)
        return (
            <Grid item>
                <BarLoader css='display: block; margin: 50px auto;' />
            </Grid>
        );

    return (
        <>
            {!newItem ? <Actions apiPath={model.apiPath} id={id} currentView='edit' justify='flex-end' spacing={2} /> : null}
            <form onSubmit={handleSubmit}>
                <EditDataFragment
                    model={updatedModel}
                    elementData={assetData}
                    handleChange={handleChange}
                />
                <Grid item xs className="form-edit-item">
                    <Button
                        type="submit"
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        className="save-button"
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
            if (field.nested)
                field.nested = recurseModelValues(field.nested, options);

            if (field.edit)
                field.edit = recurseModelValues(field.edit, options);
            if (field.type === 'dropdown' || field.type === 'multiselect') {
                if (field.apiPath)
                    field.values = options.filter((y) => y.name === field.field)[0].data;
            }

            return field;
        });
    return currentModel;
}

const removeObjectIds = (obj, removeAll) => {
    for (var key in obj) {
        if (key.includes('Id') && obj[key] === '') {
            delete obj[key];
        }
        if (!obj.hasOwnProperty(key)) continue;
        if (typeof obj[key] == 'object' || Array.isArray(obj[key])) {
            obj[key] = removeObjectIds(obj[key], removeAll);
        } else if (key === 'id') {
            if (removeAll || obj.id === '')
                delete obj.id;
        }
    }
    return obj;
}

const handleErrors = ((t, x) => {
    let message = x.message;
    if (message === undefined) {
        toast.error('Something went wrong', {
            closeButton: true,
            autoClose: false,
        });
        return;
    }
    console.log(message);
    message = message.replace('should be', t('notification.shouldBe'));
    let path = x.path.split('/');
    path.shift();
    path = path.map(x => isNaN(x) ? t('validation.' + x) : parseInt(x) + 1).join(' > ');
    toast.warning(path + ' ' + message, {
        closeButton: true,
        autoClose: false,
    })
});

export default EditComponent;
