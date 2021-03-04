import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './FormInputComponent.css';


const FormInputComponent = (({ model, value, handleChange, selectOptions }) => {
    const { t } = useTranslation('common');
    switch (model.type) {
        case 'textbox':
            return (
                <Grid
                    item
                    xs={12}
                    className='form-edit-item'
                >
                    <FormControl className='form-input-element' variant='outlined'>
                        <TextField name={model.field} label={t(model.headerName)} value={value} onChange={handleChange} multiline fullWidth rows='2' variant='outlined' />
                    </FormControl>
                </Grid>
            );
        case 'dropdown':
            if (model.values === undefined) {
                model.values = [];
            }
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <FormControl className='form-input-element' variant='outlined'>
                        <InputLabel id={model.headerName}>{t(model.headerName)}</InputLabel>
                        <Select name={model.field} labelId={model.headerName} label={t(model.headerName)} variant="outlined" value={value} onChange={handleChange}>
                            <MenuItem value=''>{t('common.missing')}</MenuItem>
                            {
                                model.values.map((elem, i) => <MenuItem key={i} value={elem.id}>{t(elem.title)}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
            );
        default:
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >

                    <FormControl className='form-input-element' variant='outlined'>
                        <TextField name={model.field} label={t(model.headerName)} value={value} onChange={handleChange} variant='outlined' />
                    </FormControl>
                </Grid>
            );
    }

});

export default FormInputComponent;