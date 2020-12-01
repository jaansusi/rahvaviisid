import React, { useState, useEffect, useReducer } from 'react';
import {
    useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import config from '../config';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
};

const PersonEdit = (() => {
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
    let [submitting, setSubmitting] = useState(false);
    const { t } = useTranslation('common');

    useEffect(() => {
        fetch(config.apiUrl + '/persons/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setFormData({
                        name: 'pid',
                        value: result.pid === null ? '' : result.pid,
                    });
                    setFormData({
                        name: 'givenName',
                        value: result.givenName === null ? '' : result.givenName,
                    });
                    setFormData({
                        name: 'surname',
                        value: result.surname === null ? '' : result.surname,
                    });
                    setFormData({
                        name: 'nickname',
                        value: result.nickname === null ? '' : result.nickname,
                    });
                    setFormData({
                        name: 'birthYear',
                        value: result.birthYear === null ? 1 : result.birthYear,
                    });
                    setFormData({
                        name: 'deathYear',
                        value: result.deathYear === null ? 1 : result.deathYear,
                    });
                    setFormData({
                        name: 'sexId',
                        value: result.sexId === null ? 1 : result.sexId,
                    });
                    setFormData({
                        name: 'remarks',
                        value: result.remarks === null ? '' : result.remarks,
                    });
                    
                    console.log(result);
                }
            )
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        fetch(config.apiUrl + '/persons/' + id,
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
            {submitting &&
                <div>
                    You are submitting the following:
                <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                        ))}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <input type='hidden' name='id' value={formData.id === null ? 1 : formData.id} />
                <table>
                    <tbody>
                        <tr>
                            <td><span>{t('person.pid')}</span></td>
                            <td><input type='text' onChange={handleChange} name='pid' value={formData.pid} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.givenName')}</span></td>
                            <td><input type='text' onChange={handleChange} name='givenName' value={formData.givenName} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.surname')}</span></td>
                            <td><input type='text' onChange={handleChange} name='surname' value={formData.surname} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.nickname')}</span></td>
                            <td><input type='text' onChange={handleChange} name='nickname' value={formData.nickname} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.birthYear')}</span></td>
                            <td><input type='number' onChange={handleChange} name='birthYear' value={formData.birthYear} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.deathYear')}</span></td>
                            <td><input type='number' onChange={handleChange} name='deathYear' value={formData.deathYear} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.sex')}</span></td>
                            <td><input type='number' onChange={handleChange} name='sexId' value={formData.sexId} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('common.remarks')}</span></td>
                            <td><input type='text' onChange={handleChange} name='remarks' value={formData.remarks} /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" disabled={submitting}>Submit</button>
            </form>
        </>
    );
});

export default PersonEdit;