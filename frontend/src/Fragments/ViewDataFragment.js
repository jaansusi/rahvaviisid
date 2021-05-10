import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, Divider } from '@material-ui/core';
import ViewDataElement from '../Elements/ViewDataElement';

const ViewDataFragment = (({ model, elementData }) => {
    const { t } = useTranslation('common');
    if (!elementData)
        return null;
    return (
        <>
            <Grid item><h2>{t(model.label)}</h2></Grid>
            <Divider />
            <Grid item xs={9} container direction='row' spacing={2}>
                {
                    model.fields.map((modelField, i) => {
                        if (modelField.hidden)
                            return null;
                        // Decide on the elements width, based on model type
                        let fieldWidth;
                        switch (modelField.type) {
                            case 'model':
                                fieldWidth = 12;
                                break;
                            case 'table':
                                fieldWidth = 12;
                                break;
                            case 'player':
                                fieldWidth = 12;
                                break;
                            default:
                                fieldWidth = 6;
                                break;
                        }
                        return (
                            <Grid item xs={fieldWidth} key={i}>
                                {
                                    <ViewDataElement
                                        model={modelField}
                                        value={elementData[modelField.field]
                                        } />

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