import React, { useState, useEffect } from 'react';
import {
    useParams
} from 'react-router-dom';
import config from '../config';
import { useTranslation } from 'react-i18next';
import TunePlayer from './TunePlayer';

const Tune = (() => {
    const { t } = useTranslation('common');
    let { id } = useParams();
    let [data, setData] = useState({})

    useEffect(() => {
        fetch(config.apiUrl + '/tunes/' + id)
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
            <table border="1">
                <tbody>
                    <tr>
                        <th>{t('tune.tuneReference')}</th>
                        <td>{data.tuneReference}</td>
                    </tr>
                    <tr>
                        <th>{t('tune.textReference')}</th>
                        <td>{data.textReference}</td>
                    </tr>
                    <tr>
                        <th>{t('tune.soundReference')}</th>
                        <td>{data.soundReference}</td>
                    </tr>
                    <tr>
                        <th>{t('tune.videoReference')}</th>
                        <td>{data.videoReference}</td>
                    </tr>
                    <tr>
                        <th>{t('tune.catalogue')}</th>
                        <td>{data.catalogue}</td>
                    </tr>
                    <tr>
                        <th>{t('date.created')}</th>
                        <td>{data.created}</td>
                    </tr>
                </tbody>
            </table>
            <TunePlayer />
        </>
    );
});

export default Tune;