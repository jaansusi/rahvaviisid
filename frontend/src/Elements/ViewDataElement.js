import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ViewDataFragment from '../Fragments/ViewDataFragment';


const ViewDataElement = (({ model, value }) => {
    const { t } = useTranslation('common');

    switch (model.type) {
        case 'table':
            return (
                <>
                    <h2>{t(model.nested.label)}</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    model.nested.fields.map((field) => {
                                        return (<TableCell>{t(field.headerName)}</TableCell>);
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                value.map((row) => {
                                    return (
                                        <TableRow>
                                            {
                                                model.nested.fields.map((field) => {
                                                    return (
                                                        <TableCell>
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
                </>
            );
        case 'model':
            return (
                <ViewDataFragment
                    model={model.nested}
                    elementData={value[model.field]}
                />
            );
        default:
            return (
                <Grid container spacing={2}>
                    <Grid item xs={6}
                        style={{ display: "flex", justifyContent: "flex-end" }}>
                        {t(model.headerName)}
                    </Grid>
                    <Grid item xs={6}>{model.selector ? value[model.selector] : value}</Grid>
                </Grid>
            );
    }

});

export default ViewDataElement;