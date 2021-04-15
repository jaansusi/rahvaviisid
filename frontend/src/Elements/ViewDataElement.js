import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ViewDataFragment from '../Fragments/ViewDataFragment';

const ViewDataElement = (({ model, value }) => {
    const { t } = useTranslation('common');
    if (value === undefined)
        return null;
    switch (model.type) {
        case 'table':
            return (
                <>
                    <h2>{t(model.nested.label)}</h2>
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
        default:
            return (
                <Grid container>
                    <Grid item xs={3}>
                        {t(model.headerName)}
                    </Grid>
                    { value !== undefined ?
                        <Grid item xs={3}>{model.selector ? value[model.selector] : value}</Grid>
                        : null
                    }

                </Grid>
            );
    }

});

export default ViewDataElement;