import React from 'react';
import { useTranslation } from "react-i18next";
import { TableRow, TableCell, Grid, Divider } from '@material-ui/core';
import TunePlayer from '../Tunes/TunePlayer';

const ViewDataFragment = (({ model, elementData, extraComponent }) => {
    const { t } = useTranslation('common');
    return (
        <>
            <Grid item><h2>{t(model.label)}</h2></Grid>
            <Divider />
            <Grid container direction='row' spacing={2}>
            {
                model.fields.map((modelField, i) => {
                    if (modelField.type === 'array') {
                        let data =
                            modelField.sortBy === undefined
                                ? elementData[modelField.field]
                                : elementData[modelField.field].sort((a, b) => a[modelField.sortBy] - b[modelField.sortBy]);
                        
                        return (
                            data.map((elem, j) => (
                                <ViewDataFragment
                                    model={modelField.nested}
                                    elementData={elem}
                                    key={'viewfragment' + i + j}
                                    title={t(modelField.nested.headerName) + (j + 1)}
                                    extraComponent={
                                        modelField.extraComponent === 'TunePlayer' ?
                                            <TunePlayer
                                                formData={elementData}
                                                index={j}
                                            />
                                            : undefined
                                    }
                                />
                            ))
                        );
                    }
                    return modelField.hidden !== undefined && modelField.hidden ? null :
                        <Grid container item xs={6} spacing={2} key={'row' + i}>
                            <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>{t(modelField.headerName)}</Grid>
                            <Grid item xs={6}>{elementData[modelField.field]}</Grid>
                        </Grid>
                        ;
                })
            }
            {
                extraComponent !== undefined ?
                    <TableRow>
                        <TableCell>
                            {extraComponent}
                        </TableCell>
                    </TableRow> :
                    null
            }
            </Grid>
        </>
    );
});

export default ViewDataFragment;