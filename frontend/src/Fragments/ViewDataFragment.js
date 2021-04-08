import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, Divider } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ViewDataElement from '../Elements/ViewDataElement';

const ViewDataFragment = (({ model, elementData, extraComponent }) => {
    const { t } = useTranslation('common');
    if (!elementData)
        return null;
    return (
        <>
            <Grid item><h2>{t(model.label)}</h2></Grid>
            <Divider />
            <Grid container direction='row' spacing={2}>
                {
                    model.fields.map((modelField, i) => {
                        if (modelField.hidden)
                            return null;
                        let dataInArray = modelField.array ?
                            elementData[modelField.field] :
                            [elementData[modelField.field]];

                        // Decide on the elements width, based on model type
                        let fieldWidth;
                        switch (modelField.type) {
                            case 'model':
                                fieldWidth = 12;
                                break;
                            default:
                                fieldWidth = 6;
                                break;
                        }
                        return (
                            <Grid item xs={fieldWidth} key={i}>
                                {
                                    dataInArray.map((singleData, j) => {
                                        if (!modelField.nested) {
                                            return (
                                                <ViewDataElement
                                                    key={j}
                                                    model={modelField}
                                                    value={
                                                        modelField.selector ?
                                                            singleData[modelField.selector] :
                                                            singleData
                                                    } />
                                            );
                                        } else {
                                            return (
                                                <ViewDataFragment
                                                    model={modelField.nested}
                                                    elementData={singleData}
                                                />
                                            );
                                        }
                                    })
                                }
                                {
                                    modelField.array ?
                                        <Pagination 
                                        count={dataInArray.length}
                                        /> :
                                        null
                                }
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
});

export default ViewDataFragment;