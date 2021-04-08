import { Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';


const ViewDataElement = (({ model, value }) => {
    const { t } = useTranslation('common');

    switch (model.type) {
        default:
            return (
                <Grid container spacing={2}>
                    <Grid item xs={6}
                        style={{ display: "flex", justifyContent: "flex-end" }}>
                        {t(model.headerName)}
                    </Grid>
                    <Grid item xs={6}>{value}</Grid>
                </Grid>
            );
    }

});

export default ViewDataElement;