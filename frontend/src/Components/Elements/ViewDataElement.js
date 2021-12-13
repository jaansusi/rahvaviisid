import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataService } from '../../Services';
import ViewDataFragment from '../Fragments/ViewDataFragment';
import ListComponent from '../ListComponent';
import { TuneModel } from '../../Models';

const ViewDataElement = (({ model, value }) => {
    const { t } = useTranslation('common');
    switch (model.type) {
        case 'table':
            return (
                <>
                    <Typography variant='h2'>{t(model.nested.label)}</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {
                                        model.nested.fields.map((field, i) => {
                                            return (<TableCell align={i === 0 ? 'left' : 'right'} key={i}>{t(field.headerName)}</TableCell>);
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    value.map((row, i) => {
                                        return (
                                            <TableRow key={i}>
                                                {
                                                    model.nested.fields.map((field, j) => {
                                                        return (
                                                            <TableCell align={j === 0 ? 'left' : 'right'} key={j}>
                                                                {
                                                                    field.type === 'url' ?
                                                                        <a
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            href={field.format.replace('%url%', row[field.field])}
                                                                        >
                                                                            {t('action.kivike')}
                                                                        </a>
                                                                        :
                                                                        field.selector ?
                                                                            Array.isArray(field.selector) ?
                                                                                field.selector.map(x => row[field.field][x]).join(' ') :
                                                                                row[field.field][field.selector] :
                                                                            row[field.field]
                                                                }
                                                            </TableCell>
                                                        );
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            );
        case 'model':
            if (model.array)
                return value.map((elemValue, i) =>
                    <ViewDataFragment
                        model={model.nested}
                        elementData={elemValue}
                        key={i}
                    />
                );
            else
                return <ViewDataFragment
                    model={model.nested}
                    elementData={value}
                />
        case 'timestamp':
            return (
                <Grid item xs={2} container direction='column'>
                    <Grid item><Typography>{t(model.headerName)}</Typography></Grid>
                    <Grid item><Typography>{DataService.ParseDate(value)}</Typography></Grid>
                </Grid>
            );
        case 'associatedAssets':
        case 'customAssociatedAssets':
            return (
                <Grid item xs={12} container direction='column' spacing={2}>
                    <Grid item><Typography variant='h5'>{t(model.headerName)}</Typography></Grid>
                    <Grid item>
                        <ListComponent
                            model={TuneModel.list}
                            values={value}
                            viewOnly
                            actionUrlOverride='/viisid'
                        />

                    </Grid>
                </Grid>
            );
        default:
            return (
                <Grid item xs={12} container direction='row'>
                    <Grid item xs={6}><Typography>{t(model.headerName)}</Typography></Grid>
                    <Grid item xs={6}><Typography>{model.selector ? value[model.selector] : value}</Typography></Grid>
                </Grid>
            );
    }

});

export default ViewDataElement;