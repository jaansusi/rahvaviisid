import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../config';
import { useTranslation } from "react-i18next";

const PersonView = (() => {
    const { t } = useTranslation('common');
    let { id } = useParams();
    let [data, setData] = useState({})

    useEffect(() => {
        fetch(config.apiUrl + '/persons/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                }
            )
    }, [id]);

    return (
        <table border="1">
            <tbody>
                <tr>
                    <th>{t('person.pid')}</th>
                    <td>{data.pid}</td>
                </tr>
                <tr>
                    <th>{t('person.givenName')}</th>
                    <td>{data.givenName}</td>
                </tr>
                <tr>
                    <th>{t('person.surname')}</th>
                    <td>{data.surname}</td>
                </tr>
                <tr>
                    <th>{t('date.created')}</th>
                    <td>{data.created}</td>
                </tr>
            </tbody>
        </table>
    );
});

export default PersonView;