import React from 'react';
import {
    useRouteMatch
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Grid } from '@material-ui/core';
import ClassificatorsMap from './ClassificatorTypes/ClassificatorTypeMap';

const Classificators = (() => {
    let { path } = useRouteMatch();
    const { t } = useTranslation('common');
    return (
        <Grid container direction='column'>
            {
                ClassificatorsMap.groups.map((group, i) => {
                    return (
                        <Grid item key={i}>
                            <h3>{t(group.name)}</h3>
                            <Grid container direction='row'>
                            {
                                group.classificators.map((classificator, j) => {
                                    return (<Button key={j} className='classificator-link' href={`${path}/${classificator.url}`}>{t(classificator.name)}</Button>)
                                })
                            }
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
        // <h3>{t('tune.tune')}</h3>
        // <Button className='action-link' href={`${path}/rahvas`}>{t('tune.nation')}</Button>
        // <Button className='action-link' href={`${path}/keel`}>{t('tune.language')}</Button>
        // <Button className='action-link' href={`${path}/riik`}>{t('tune.country')}</Button>
        // <Button className='action-link' href={`${path}/viisi-seisund`}>{t('tune.state')}</Button>
        // <Button className='action-link' href={`${path}/viisi-liik`}>{t('tune.genre')}</Button>
        // <h3>{t('person.person')}</h3>
        // <Button className='action-link' href={`${path}/viisi-tegija-roll`}>{t('person.role')}</Button>
        // <Button className='action-link' href={`${path}/kasutaja-roll`}>{t('user.role')}</Button>
        // <Button className='action-link' href={`${path}/sugu`}>{t('person.sex')}</Button>
        // <h3>{t('place.place')}</h3>
        // <Button className='action-link' href={`${path}/koha-liik`}>{t('place.type')}</Button>
        // <Button className='action-link' href={`${path}/kihelkond`}>{t('place.parish')}</Button>
        // <Button className='action-link' href={`${path}/vald`}>{t('place.municipality')}</Button>
        // <Button className='action-link' href={`${path}/kyla`}>{t('place.village')}</Button>
        // <h3>{t('performance.performance')}</h3>
        // <Button className='action-link' href={`${path}/tegeliku-esituse-liik`}>{t('performance.actual.type')}</Button>
        // <Button className='action-link' href={`${path}/traditsioonilise-esituse-liik`}>{t('performance.traditional.type')}</Button>
        // <Button className='action-link' href={`${path}/tegeliku-tegevuse-liik`}>{t('performance.actual.action')}</Button>
        // <Button className='action-link' href={`${path}/traditsioonilise-tegevuse-liik`}>{t('performance.traditional.action')}</Button>
        // <h3>{t('song.song')}</h3>
        // <Button className='action-link' href={`${path}/laulu-liik`}>{t('song.genre')}</Button>
        // <Button className='action-link' href={`${path}/laulu-teema`}>{t('song.topic')}</Button>
        // <Button className='action-link' href={`${path}/varsivorm`}>{t('song.verse')}</Button>
        // <h3>{t('attribute.attribute')}</h3>
        // <Button className='action-link' href={`${path}/teksti-vorm`}>{t('attribute.textForm')}</Button>
        // <Button className='action-link' href={`${path}/viisi-vorm`}>{t('attribute.tuneForm')}</Button>
        // <Button className='action-link' href={`${path}/heliulatus`}>{t('attribute.soundRange')}</Button>
        // <Button className='action-link' href={`${path}/rytmityyp`}>{t('attribute.rhythmType')}</Button>
        // <h3>{t('transcription.transcription')}</h3>
        // <Button className='action-link' href={`${path}/noodistuse-alus`}>{t('transcription.source')}</Button>
        // <Button className='action-link' href={`${path}/noodistuse-tegija-roll`}>{t('transcription.personRole')}</Button>
        // <h3>{t('coding.coding')}</h3>
        // <Button className='action-link' href={`${path}/votmemark`}>{t('coding.keySignature')}</Button>
        // <Button className='action-link' href={`${path}/tugiheli`}>{t('coding.supportSound')}</Button>
        // <Button className='action-link' href={`${path}/korgus`}>{t('coding.pitch')}</Button>
        // <Button className='action-link' href={`${path}/taktimoot`}>{t('coding.measure')}</Button>
        // </>
    );
});

export default Classificators;