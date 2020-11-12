import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import { useTranslation } from "react-i18next";

const PersonEdit = (() => {
    let { id } = useParams();
    let [data, setData] = useState({})
    const { t, i18n } = useTranslation('common');

    useEffect(() => {
        fetch("http://localhost:3000/persons/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                }
            )
    }, [id]);

    return (
        <>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><span>{t('person.pid')}</span></td>
                            <td><input type='text' name='pid' value={data.pid == undefined ? '' : data.pid} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.givenName')}</span></td>
                            <td><input type='text' name='givenName' value={data.givenName} /></td>
                        </tr>
                        <tr>
                            <td><span>{t('person.surname')}</span></td>
                            <td><input type='text' name='surname' value={data.surname} /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
});

export default PersonEdit;