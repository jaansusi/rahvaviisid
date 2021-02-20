import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import EditDataFragment from '../Fragments/EditDataFragment';


const EditComponent = (({ mapping, extraComponent, filter }) => {
    const { t } = useTranslation('common');
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value
        }
    };
    let { id } = useParams();
    let createEmptyDataObject = currentMapping => Object.fromEntries(new Map(currentMapping.map((elem) => [elem.field, elem.nested === undefined ? '' : createEmptyDataObject(elem.nested)])));
    let [formData, setFormData] = useReducer(formReducer, createEmptyDataObject(mapping.edit));

    let [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        fetch(config.apiUrl + '/' + mapping.apiPath + '/' + id + filter)
            .then(res => res.json())
            .then(
                (result) => {
                    mapping.edit.forEach((map) => {
                        setFormData({
                            name: map.field,
                            value: result[map.field] === null ? '' : result[map.field],
                        });
                    })
                }
            )
    }, [id, mapping.apiPath, mapping.edit, filter]);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        let dataToSubmit = formData;
        for (let key in dataToSubmit) {
            if (dataToSubmit[key] === "") {
                dataToSubmit[key] = undefined;
            }
        }
        fetch(config.apiUrl + '/' + mapping.apiPath + '/' + id,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        setTimeout(() => {
            setSubmitting(false);
        }, 3000);
    };


    const handleChange = event => {
        const { name, value, type } = event.target;
        setFormData({
            name: name,
            value: type === 'number' ? parseInt(value, 10) : value,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <EditDataFragment mapping={mapping.edit} formData={formData} handleSubmit={handleSubmit} submitting={submitting} handleChange={handleChange} extraComponent={extraComponent} />
                {JSON.stringify(formData)}
                
                <Grid item xs className='form-edit-item'>
                    <Button type="submit" disabled={submitting} variant='contained' color='primary'>{t('edit.save')}</Button>
                </Grid>
            </form>
        </>
    )
});

export default EditComponent;