import React from 'react';
import {
    Link,
    useRouteMatch
} from "react-router-dom";
import { useTranslation } from "react-i18next";

const Classificators = (() => {
    let { path, url } = useRouteMatch();
    const { t } = useTranslation('common');
    return (
        <>
            <h3>{t('tune.tune')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('tune.nation')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('tune.language')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('tune.country')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('tune.state')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('tune.genre')}</Link>
            <h3>{t('person.person')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('person.role')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('user.role')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('person.sex')}</Link>
            <h3>{t('place.place')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('place.type')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('place.parish')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('place.municipality')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('place.village')}</Link>
            <h3>{t('performance.performance')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('performance.actual.type')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('performance.traditional.type')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('performance.actual.action')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('performance.traditional.action')}</Link>
            <h3>{t('song.song')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('song.genre')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('song.topic')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('song.verse')}</Link>
            <h3>{t('attribute.attribute')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('attribute.text-form')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('attribute.tune-form')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('attribute.sound-range')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('attribute.rhythm-type')}</Link>
            <h3>{t('transcription.transcription')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('transcription.source')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('transcription.person-role')}</Link>
            <h3>{t('coding.coding')}</h3>
            <Link className='action-link' to={`${url}/`}>{t('coding.key-signature')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('coding.support-sound')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('coding.pitch')}</Link>
            <Link className='action-link' to={`${url}/`}>{t('coding.measure')}</Link>
        </>
    );
});

export default Classificators;