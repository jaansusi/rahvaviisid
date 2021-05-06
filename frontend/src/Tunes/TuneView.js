import React, { useEffect, useReducer } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { DataService } from '../Services';
import { TuneModel } from '../Models';
import ViewComponent from '../Components/ViewComponent';
import { useTranslation } from 'react-i18next';
import { PlayerViewComponent, TableViewComponent } from '../NewComponents';

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

    useEffect(() => {
        DataService.RequestAsset(TuneModel.view, id, setAssetData);
    }, [id]);

    return (
        <Grid
            item
            xs={9}
            container
            direction='column'
            spacing={3}
        >

            <Grid item container direction='row'>
                <Grid item xs={2}>
                    <Typography variant='h5'>{t('tune.references')}</Typography>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.tuneReference')}</Grid>
                    <Grid item>{assetData.tuneReference}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.soundReference')}</Grid>
                    <Grid item>{assetData.soundReference}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.videoReference')}</Grid>
                    <Grid item>{assetData.videoReference}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.textReference')}</Grid>
                    <Grid item>{assetData.textReference}</Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item container direction='row'>
                <Grid item xs={2}>
                    <Typography variant='h5'>{t('tune.location')}</Typography>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.nation')}</Grid>
                    <Grid item>{assetData.nations?.title}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.language')}</Grid>
                    <Grid item>{assetData.languages?.title}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.country')}</Grid>
                    <Grid item>{assetData.countries?.title}</Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item container direction='row'>
                <Grid item xs={2}>
                    <Typography variant='h5'>{t('tune.archive')}</Typography>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.publications')}</Grid>
                    <Grid item>{assetData.publications}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.catalogue')}</Grid>
                    <Grid item>{assetData.catalogue}</Grid>
                </Grid>
                <Grid item xs={4} container direction='column'>
                    <Grid item>{t('tune.remarks')}</Grid>
                    <Grid item>{assetData.remarks}</Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item container direction='row'>
                <Grid item xs={2}>
                    <Typography variant='h5'>{t('tune.verification')}</Typography>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.verified')}</Grid>
                    <Grid item>{assetData.verified}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('tune.verifiedBy')}</Grid>
                    <Grid item>{assetData.verifiedBy}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('date.created')}</Grid>
                    <Grid item>{assetData.created}</Grid>
                </Grid>
                <Grid item xs={2} container direction='column'>
                    <Grid item>{t('date.modified')}</Grid>
                    <Grid item>{assetData.modified}</Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item container spacing={2}>
                <Grid item>
                    <Typography variant='h5'>{t('tune.transcriptions')}</Typography>
                </Grid>
                {
                    assetData.tuneTranscriptions?.map((transcription, i) => {
                        return (
                            <Grid item container direction='column' spacing={2}>
                                <Grid item>
                                    <Typography variant='h5'>{t('tune.transcription')} {i + 1}</Typography>
                                </Grid>
                                <Grid item container direction='row'>
                                    <Grid item xs={2} container direction='column'>
                                        <Grid item>{t('transcription.source')}</Grid>
                                        <Grid item>{transcription.transcriptionSources?.title}</Grid>
                                    </Grid>
                                    <Grid item xs={4} container direction='row'>
                                        <Grid item xs={6} container direction='column'>
                                            <Grid item>{t('date.created')}</Grid>
                                            <Grid item>{transcription.created}</Grid>
                                        </Grid>
                                        <Grid item xs={6} container direction='column'>
                                            <Grid item>{t('date.modified')}</Grid>
                                            <Grid item>{transcription.modified}</Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid item container direction='column' spacing={2}>
                                    {
                                        transcription.tuneMelodies?.map((melody, j) => {
                                            return (
                                                <Grid item container direction='column' spacing={2}>
                                                    <Grid item>
                                                        <Typography variant='h6'>{t('tune.melody')} {j + 1}</Typography>
                                                    </Grid>
                                                    <Grid item container direction='row'>
                                                        <Grid item xs={2} container direction='column'>
                                                            <Grid item>{t('common.title')}</Grid>
                                                            <Grid item>{melody.title}</Grid>
                                                        </Grid>
                                                        <Grid item xs={2} container direction='column'>
                                                            <Grid item>{t('tune.author')}</Grid>
                                                            <Grid item>{melody.author}</Grid>
                                                        </Grid>
                                                        <Grid item xs={2} container direction='column'>
                                                            <Grid item>{t('tune.noteLength')}</Grid>
                                                            <Grid item>{melody.noteLength}</Grid>
                                                        </Grid>
                                                        <Grid item xs={2} container direction='column'>
                                                            <Grid item>{t('tune.alter')}</Grid>
                                                            <Grid item>{melody.alter}</Grid>
                                                        </Grid>
                                                        <Grid item xs={2} container direction='column'>
                                                            <Grid item>{t('tune.rhythmType')}</Grid>
                                                            <Grid item>{melody.rhythmType}</Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item container direction='column'>
                                                        <Grid item container direction='row'>
                                                            <Grid item xs={4} container direction='column'>
                                                                <Grid item>{t('melody.abc')}</Grid>
                                                                <Grid item>{melody.melody}</Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <PlayerViewComponent elementData={melody} index={i.toString() + j.toString()} />
                                                        </Grid>
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

            {
                TuneModel.view.fields.filter(x => x.type === 'table').map((fieldElem, i) => {
                    console.log(fieldElem);
                    return (
                        <Grid key={i} item>
                            <Divider />
                            <Typography variant='h5'>{t(fieldElem.nested.label)}</Typography>
                            <TableViewComponent model={fieldElem} value={assetData[fieldElem.field]} />
                        </Grid>
                    );
                })
            }
            < Divider />

            {/* { JSON.stringify(assetData)}
            < ViewComponent
                model={TuneModel.view}
            /> */}
        </Grid>
    );
};

export default TuneView;