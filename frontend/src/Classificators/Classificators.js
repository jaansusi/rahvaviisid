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
            <Link className='action-link' to={`${path}/viisi-seisund`}>{t('tune.state')}</Link>
            <Link className='action-link' to={`${path}/viisi-liik`}>{t('tune.genre')}</Link>
            <h3>{t('person.person')}</h3>
            <Link className='action-link' to={`${path}/viisi-tegija-roll`}>{t('person.role')}</Link>
            <Link className='action-link' to={`${path}/kasutaja-roll`}>{t('user.role')}</Link>
            <Link className='action-link' to={`${path}/sugu`}>{t('person.sex')}</Link>
            <h3>{t('place.place')}</h3>
            <Link className='action-link' to={`${path}/koha-liik`}>{t('place.type')}</Link>
            <Link className='action-link' to={`${path}/kihelkond`}>{t('place.parish')}</Link>
            <Link className='action-link' to={`${path}/vald`}>{t('place.municipality')}</Link>
            <Link className='action-link' to={`${path}/kyla`}>{t('place.village')}</Link>
            <h3>{t('performance.performance')}</h3>
            <Link className='action-link' to={`${path}/tegeliku-esituse-liik`}>{t('performance.actual.type')}</Link>
            <Link className='action-link' to={`${path}/traditsioonilise-esituse-liik`}>{t('performance.traditional.type')}</Link>
            <Link className='action-link' to={`${path}/tegeliku-tegevuse-liik`}>{t('performance.actual.action')}</Link>
            <Link className='action-link' to={`${path}/traditsioonilise-tegevuse-liik`}>{t('performance.traditional.action')}</Link>
            <h3>{t('song.song')}</h3>
            <Link className='action-link' to={`${path}/laulu-liik`}>{t('song.genre')}</Link>
            <Link className='action-link' to={`${path}/laulu-teema`}>{t('song.topic')}</Link>
            <Link className='action-link' to={`${path}/varsivorm`}>{t('song.verse')}</Link>
            <h3>{t('attribute.attribute')}</h3>
            <Link className='action-link' to={`${path}/teksti-vorm`}>{t('attribute.text-form')}</Link>
            <Link className='action-link' to={`${path}/viisi-vorm`}>{t('attribute.tune-form')}</Link>
            <Link className='action-link' to={`${path}/heliulatus`}>{t('attribute.sound-range')}</Link>
            <Link className='action-link' to={`${path}/rytmityyp`}>{t('attribute.rhythm-type')}</Link>
            <h3>{t('transcription.transcription')}</h3>
            <Link className='action-link' to={`${path}/noodistuse-alus`}>{t('transcription.source')}</Link>
            <Link className='action-link' to={`${path}/noodistuse-tegija-roll`}>{t('transcription.person-role')}</Link>
            <h3>{t('coding.coding')}</h3>
            <Link className='action-link' to={`${path}/votmemark`}>{t('coding.key-signature')}</Link>
            <Link className='action-link' to={`${path}/tugiheli`}>{t('coding.support-sound')}</Link>
            <Link className='action-link' to={`${path}/korgus`}>{t('coding.pitch')}</Link>
            <Link className='action-link' to={`${path}/taktimoot`}>{t('coding.measure')}</Link>
        </>
    );
});

export default Classificators;