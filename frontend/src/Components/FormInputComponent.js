import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';


const FormInputComponent = (({ model, value, handleChange }) => {
    const { t } = useTranslation('common');
    switch (model.type) {
        case 'textbox':
            return (
                <Grid
                    item
                    xs={12}
                    className='form-edit-item'
                >
                    <TextField name={model.field} label={t(model.headerName)} value={value} onChange={handleChange} multiline fullWidth rows='2' variant='outlined' />
                </Grid>
            );
        default:
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <TextField name={model.field} label={t(model.headerName)} value={value} onChange={handleChange} variant='outlined' />
                </Grid>
            );
    }

});

export default FormInputComponent;