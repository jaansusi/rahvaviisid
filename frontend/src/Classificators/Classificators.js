import React from 'react';
import {
    Link,
    useRouteMatch
} from "react-router-dom";
import { useTranslation } from "react-i18next";

const Classificators = (() => {
    let { path } = useRouteMatch();
    const { t } = useTranslation('common');
    return (
        <>
            <h3>{t('tune.tune')}</h3>
            <Link className='action-link' to={`${path}/rahvas`}>{t('tune.nation')}</Link>
            <Link className='action-link' to={`${path}/keel`}>{t('tune.language')}</Link>
            <Link className='action-link' to={`${path}/riik`}>{t('tune.country')}</Link>
            <Link className='action-link' to={`${path}/viisiseisund`}>{t('tune.state')}</Link>
            <Link className='action-link' to={`${path}/viisiliik`}>{t('tune.genre')}</Link>
            <h3>{t('person.person')}</h3>
            <Link className='action-link' to={`${path}/`}>{t('person.role')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('user.role')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('person.sex')}</Link>
            <h3>{t('place.place')}</h3>
            <Link className='action-link' to={`${path}/`}>{t('place.type')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('place.parish')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('place.municipality')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('place.village')}</Link>
            <h3>{t('performance.performance')}</h3>
            <Link className='action-link' to={`${path}/`}>{t('performance.actual.type')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('performance.traditional.type')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('performance.actual.action')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('performance.traditional.action')}</Link>
            <h3>{t('song.song')}</h3>
            <Link className='action-link' to={`${path}/`}>{t('song.genre')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('song.topic')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('song.verse')}</Link>
            <h3>{t('attribute.attribute')}</h3>
            <Link className='action-link' to={`${path}/`}>{t('attribute.text-form')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('attribute.tune-form')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('attribute.sound-range')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('attribute.rhythm-type')}</Link>
            <h3>{t('transcription.transcription')}</h3>
            <Link className='action-link' to={`${path}/`}>{t('transcription.source')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('transcription.person-role')}</Link>
            <h3>{t('coding.coding')}</h3>
            <Link className='action-link' to={`${path}/`}>{t('coding.key-signature')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('coding.support-sound')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('coding.pitch')}</Link>
            <Link className='action-link' to={`${path}/`}>{t('coding.measure')}</Link>
        </>
    );
});

export default Classificators;