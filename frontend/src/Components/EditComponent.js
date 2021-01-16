import React, { useState, useEffect, useReducer } from 'react';
import {
    useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import config from '../config';
import { Grid, TextField, Button } from '@material-ui/core';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
};

const EditComponent = ((props) => {
    let objectMap = props.mapping;
    let { id } = useParams();
    let emptyDataObject = {}
    objectMap.edit.forEach((x) => {emptyDataObject[x.field] = ''});
    let [formData, setFormData] = useReducer(formReducer, emptyDataObject);
    let [submitting, setSubmitting] = useState(false);
    const { t } = useTranslation('common');
    useEffect(() => {
        fetch(config.apiUrl + '/' + objectMap.apiPath + '/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    objectMap.edit.forEach((map) => {
                        setFormData({
                            name: map.field,
                            value: result[map.field] === null ? '' : result[map.field],
                        });
                    })
                }
            )
    }, [id, objectMap.apiPath, objectMap.edit]);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        let dataToSubmit = formData;
        for (let key in dataToSubmit) {
            if (dataToSubmit[key] === "") {
                dataToSubmit[key] = undefined;
            }
        }
        fetch(config.apiUrl + '/' + objectMap.apiPath + '/' + id,
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
    }

    const handleChange = event => {
        const { name, value, type } = event.target;
        setFormData({
            name: name,
            value: type === 'number' ? parseInt(value, 10) : value,
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='hidden' name='id' value={formData.id === null ? 1 : formData.id} />
                <Grid
                    container
                    direction='column'
                >
                    {
                        objectMap.edit.map((valueMap, i) => {
                            return (
                                <Grid
                                    item
                                    xs={6}
                                    key={i}
                                >
                                    <TextField name={valueMap.field} label={t(valueMap.headerName)} value={formData[valueMap.field]} onChange={handleChange} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Button type="submit" disabled={submitting}>{t('edit.save')}</Button>
            </form>
        </>
    );
});

export default EditComponent;