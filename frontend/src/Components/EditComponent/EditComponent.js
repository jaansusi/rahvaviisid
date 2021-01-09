import React, { useState, useEffect, useReducer } from 'react';
import {
    useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import config from '../../config';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
};

const EditComponent = ((props) => {
    let { id } = useParams();
    let [formData, setFormData] = useReducer(formReducer, {
        id: 1,
        pid: '',
        givenName: '',
        surname: '',
        nickname: '',
        birthYear: 1,
        deathYear: 1,
        sexId: '',
        remarks: ''
    });
    let objectMap = props.map;
    let [submitting, setSubmitting] = useState(false);
    const { t } = useTranslation('common');

    useEffect(() => {
        fetch(config.apiUrl + '/' + objectMap.apiPath + '/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    objectMap.edit.forEach((map) => {
                        setFormData({
                            name: map.name,
                            value: result[map.name] === null ? '' : result[map.name],
                        });
                    })
                    console.log(result);
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
                <table>
                    <tbody>
                        {
                            objectMap.edit.map((valueMap, i) => {
                                return (
                                    <tr>
                                        <td><span>{t(valueMap.header)}</span></td>
                                        <td><input type='text' onChange={handleChange} name={valueMap.name} value={valueMap.getter(formData)} /></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <button type="submit" disabled={submitting}>{t('edit.save')}</button>
            </form>
        </>
    );
});

export default EditComponent;