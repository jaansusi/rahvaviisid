import React, { useEffect, useReducer } from 'react';
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { AuthService, DataService } from '../Services';
import { TuneModel } from '../Models';
import { useTranslation } from 'react-i18next';
import { PlayerViewComponent, TableViewComponent } from '../NewComponents';
import Actions from '../Components/Buttons/Actions';

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
        <Grid container item xs={9}>
            <Grid container>
                <Actions apiPath={TuneModel.apiPath} id={id} spacing={2} currentView='view'
                    additionalButtons={AuthService.CanAccess(['editor', 'admin']) ? <Grid item><Button href={'audit'} variant="outlined" color="primary">{t('common.audit')}</Button></Grid> : undefined}
                />
            </Grid>
            <Grid
                item
                container
                direction='column'
                spacing={3}
            >
                <Grid item xs={6}>
                    <Typography variant='h5'>{assetData.pid}</Typography>
                </Grid>
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
                    <AssetPropertyElement title={t('tune.verified')} value={assetData.verified} />
                    <AssetPropertyElement title={t('tune.verifiedBy')} value={assetData.verifiedBy} />
                    <AssetPropertyElement title={t('date.created')} value={assetData.created} />
                    <AssetPropertyElement title={t('date.modified')} value={assetData.modified} />
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
                                        <AssetPropertyElement title={t('transcription.source')} value={transcription.transcriptionSources?.title} />
                                        <Grid item xs={4} container direction='row'>
                                            <AssetPropertyElement size={6} title={t('date.created')} value={transcription.created} />
                                            <AssetPropertyElement size={6} title={t('date.modified')} value={transcription.modified} />
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
                                                            <AssetPropertyElement title={t('common.title')} value={melody.title} />
                                                            <AssetPropertyElement title={t('tune.author')} value={melody.author} />
                                                            <AssetPropertyElement title={t('tune.noteLength')} value={melody.noteLength} />
                                                            <AssetPropertyElement title={t('tune.alter')} value={melody.alter} />
                                                            <AssetPropertyElement title={t('tune.rhythmType')} value={melody.rhythmType} />
                                                        </Grid>
                                                        <Grid item container direction='column'>
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
        </Grid>
    );
};

const AssetPropertyElement = ({ title, value, size }) => {
    if (!size) size = 2;
    return (
        <Grid item xs={size} container direction='column'>
            <Grid item>{title}</Grid>
            <Grid item>{value}</Grid>
        </Grid>
    );
};

export default TuneView;