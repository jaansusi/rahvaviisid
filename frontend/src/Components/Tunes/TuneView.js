import React, { useEffect, useReducer, useState } from 'react';
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { AuthService, DataService } from '../../Services';
import { ExternalReferenceModel, TuneEncodingModel, TuneModel, TunePerformancesModel, TunePersonsModel, TunePlaceModel, TuneSongsModel, TuneTranscriptionModel } from '../../Models';
import { useTranslation } from 'react-i18next';
import { PlayerViewComponent, TableViewComponent } from '../NewComponents';
import Actions from '../Buttons/Actions';
import { MusicalCharacteristicsModel } from '../../Models/MusicalCharacteristicsModel';
import BarLoader from 'react-spinners/BarLoader';

const TuneView = () => {
    const { t } = useTranslation('common');
    let { id } = useParams();
    const assetReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value,
        };
    };
    let [assetData, setAssetData] = useReducer(assetReducer, {});
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        DataService.RequestAsset(TuneModel.view, id, setAssetData, setIsLoading);
    }, [id]);

    if (isLoading)
        return (
            <Grid item>
                <BarLoader css='display: block; margin: 50px auto;' />
            </Grid>
        );
    return (
        <Grid container item lg={9} md={11}>
            <Grid container>
                <Actions apiPath={TuneModel.apiPath} id={id} spacing={2} currentView='view'
                    additionalButtons=
                    {
                        AuthService.CanAccess(['editor', 'admin']) ?
                            <>
                                <Grid item>
                                    <Button href={'audit'} variant="outlined" color="primary">{t('common.audit')}</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => alert('Varsti tuleb')} variant="outlined" color="primary">{t('tune.duplicate')}</Button>
                                </Grid>
                            </> :
                            undefined
                    }
                />
            </Grid>
            <Grid
                item
                container
                direction='column'
                spacing={3}
            >
                <Grid item container direction='row'>
                    <Grid item xs={2}>
                        <Typography variant='h5'>{t('tune.references')}</Typography>
                    </Grid>
                    <AssetPropertyElement title={t('tune.tuneReference')} value={assetData.tuneReference} />
                    <AssetPropertyElement title={t('tune.soundReference')} value={assetData.soundReference} />
                    <AssetPropertyElement title={t('tune.videoReference')} value={assetData.videoReference} />
                    <AssetPropertyElement title={t('tune.textReference')} value={assetData.textReference} />
                </Grid>

                <Divider />

                <Grid item container direction='row'>
                    <Grid item xs={2}>
                    </Grid>
                    <AssetPropertyElement title={t('tune.nation')} value={assetData.nations?.title} />
                    <AssetPropertyElement title={t('tune.language')} value={assetData.languages?.title} />
                    <AssetPropertyElement title={t('tune.country')} value={assetData.countries?.title} />
                </Grid>

                <AssetPropertyTableElement label={t(ExternalReferenceModel.table.label)} model={ExternalReferenceModel.table} data={assetData['externalReferences']} />
                <Divider />



                <Divider />
                {AuthService.CanAccess(['editor', 'admin']) &&
                    <>
                        <Grid item container direction='row'>
                            <Grid item xs={2}>
                                <Typography variant='h5'>{t('tune.verification')}</Typography>
                            </Grid>
                            <AssetPropertyElement title={t('tune.verified')} value={assetData.verified} />
                            <AssetPropertyElement title={t('tune.verifiedBy')} value={assetData.verifiedBy} />
                            <AssetPropertyDateElement title={t('date.created')} value={assetData.created} />
                            <AssetPropertyDateElement title={t('date.modified')} value={assetData.modified} />
                        </Grid>
                        <Grid item container direction='row'>
                            <Grid item xs={2}></Grid>
                            <AssetPropertyElement title={t('tune.remarks')} value={assetData.remarks} size={8} />
                        </Grid>
                    </>
                }


                <Divider />
                <Grid item container spacing={2}>
                    <Grid item>
                        <Typography variant='h5'>{t('tune.encodings')}</Typography>
                    </Grid>
                    {
                        assetData.tuneEncodings?.map((encoding, i) => {
                            return (
                                <Grid key={i} item container direction='column' spacing={2}>
                                    <Grid item>
                                        <Typography variant='h5'>{t('tune.coding')} {i + 1}</Typography>
                                    </Grid>
                                    <Grid item container direction='row'>
                                        <AssetPropertyElement title={t('encoding.keySignature')} value={encoding.keySignatures?.title} />
                                        <AssetPropertyElement title={t('encoding.supportSound')} value={encoding.supportSounds?.title} />
                                        <AssetPropertyElement title={t('encoding.pitch')} value={encoding.pitches?.title} />
                                        <AssetPropertyElement title={t('encoding.measure')} value={encoding.measures?.title} />
                                        <AssetPropertyElement title={t('encoding.rhythmType')} value={encoding.rhythmType} />
                                        <AssetPropertyElement title={t('encoding.tempo')} value={encoding.tempo} />
                                        <AssetPropertyElement title={t('common.remarks')} value={encoding.remarks} size={8} />
                                        {
                                            AuthService.CanAccess(['editor', 'admin']) &&
                                            <Grid item xs={4} container direction='row'>
                                                <AssetPropertyDateElement size={6} title={t('date.created')} value={encoding.created} />
                                                <AssetPropertyDateElement size={6} title={t('date.modified')} value={encoding.modified} />
                                            </Grid>
                                        }
                                    </Grid>
                                    <Divider />
                                    <Grid item container direction='column' spacing={2}>
                                        {
                                            encoding.tuneMelodies?.map((melody, j) => {
                                                return (
                                                    <Grid key={j} item container direction='column' spacing={2}>
                                                        <Grid item container direction='row' spacing={5}>
                                                            <Grid item><Typography variant='h6'>{t('tune.variant')} {j + 1}</Typography></Grid>
                                                            <Grid item><Button onClick={() => alert('Varsti tuleb')} variant='outlined'>{t('melody.export')}</Button></Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <PlayerViewComponent elementData={melody} index={i.toString() + j.toString()} />
                                                        </Grid>
                                                        <Divider />
                                                    </Grid>
                                                );
                                            })
                                        }
                                    </Grid>
                                    <Divider />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid item container spacing={2}>
                    <Grid item>
                        <Typography variant='h5'>{t('tune.transcriptions')}</Typography>
                    </Grid>
                    {
                        assetData.tuneTranscriptions?.map((transcription, i) => {
                            return (
                                <Grid key={i} item container direction='column' spacing={2}>
                                    <Grid item>
                                        <Typography variant='h5'>{t('tune.transcription')} {i + 1}</Typography>
                                    </Grid>
                                    <Grid item container direction='row'>
                                        <AssetPropertyElement title={t('transcription.source')} value={transcription.transcriptionSources.title} />
                                        <AssetPropertyElement title={t('transcription.fileReference')} value={transcription.fileReference} />
                                        {
                                            AuthService.CanAccess(['editor', 'admin']) &&
                                            <Grid item xs={4} container direction='row'>
                                                <AssetPropertyDateElement size={6} title={t('date.created')} value={transcription.created} />
                                                <AssetPropertyDateElement size={6} title={t('date.modified')} value={transcription.modified} />
                                            </Grid>
                                        } 
                                    </Grid>
                                        <Divider />
                                        <Grid item>
                                            <Typography variant='h5'>{t('transcription.transcriptionPersons')} {i + 1}</Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item container direction='column' spacing={2}>
                                        {
                                            
                                            transcription.transcriptionsPersonsRoles?.map((personRoles, j) => {
                                                return (
                                                    <Grid key={j} item container direction='column' spacing={2}>
                                                        <Grid item container direction='row' spacing={5}>
                                                           <AssetPropertyElement title={t('person.givenName')} value={personRoles.persons.givenName} />
                                                           <AssetPropertyElement title={t('person.surname')} value={personRoles.persons.surname} />
                                                           <AssetPropertyElement title={t('transcription.actionYear')} value={personRoles.actionYear} />
                                                           <AssetPropertyElement title={t('transcription.personRole')} value={personRoles.transcriptionPersonRoleTypes.title} />
                                                           <AssetPropertyElement title={t('common.remarks')} value={personRoles.remarks} />
                                                            
                                                        </Grid>
                                                        <Divider />
                                                    </Grid>
                                                );
                                            })
                                        }
                                        </Grid>

                                    </Grid>
                                
                            )
                        })
                    }
                </Grid>

                <AssetPropertyTableElement label={t(TunePersonsModel.table.label)} model={TunePersonsModel.table} data={assetData['tunesPersonsRoles']} />
                <AssetPropertyTableElement label={t(TunePlaceModel.table.label)} model={TunePlaceModel.table} data={assetData['tunePlaces']} />
                <AssetPropertyTableElement label={t(TuneSongsModel.table.label)} model={TuneSongsModel.table} data={assetData['tuneSongs']} />
                <AssetPropertyTableElement label={t(TunePerformancesModel.table.label)} model={TunePerformancesModel.table} data={assetData['tunePerformances']} />
                <AssetPropertyTableElement label={t(MusicalCharacteristicsModel.table.label)} model={MusicalCharacteristicsModel.table} data={assetData['musicalCharacteristics']} />
                <Divider />
                <Grid item container direction='row'>
                    <Grid item xs={2}>
                        <Typography variant='h5'>{t('tune.archive')}</Typography>
                    </Grid>
                    <AssetPropertyElement title={t('tune.publications')} value={assetData.publications} />
                    <AssetPropertyElement title={t('tune.catalogue')} value={assetData.catalogue} />

                </Grid>
            </Grid>
        </Grid >
    );
};

const AssetPropertyElement = ({ title, value, size }) => {
    if (!size) size = 2;
    return (
        <Grid item xs={size} container wrap='nowrap' direction='column'>
            <Grid item><i>{title}</i></Grid>
            <Grid item><Typography>{value !== '' ? value : '---'}</Typography></Grid>
        </Grid>
    );
};
const AssetPropertyDateElement = ({ title, value, size }) => {
    return (
        <AssetPropertyElement title={title} value={DataService.ParseDate(value)} size={size} />
    );
};
const AssetPropertyTableElement = ({ label, model, data }) => {
    return (<Grid item>
        <Divider />
        <Typography variant='h5'>{label}</Typography>
        <TableViewComponent model={model} value={data} />
    </Grid>);
}

export default TuneView;