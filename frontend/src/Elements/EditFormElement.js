import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Css/EditFormElement.css';


const EditFormElement = (({ model, value, handleChange, index }) => {
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
                        <TextField name={model.field} label={t(model.headerName)} value={value} onChange={(e) => handleChange(e, index)} multiline fullWidth rows='2' variant='outlined' />
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
                        <Select name={model.field} labelId={model.headerName} label={t(model.headerName)} variant="outlined" value={value} onChange={(e) => handleChange(e, index)}>
                            <MenuItem value=''>{t('common.missing')}</MenuItem>
                            {
                                model.values.map((elem, i) => <MenuItem key={i} value={elem.id}>{t(elem.title)}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
            );
        case 'view':
            return (
                <Grid
                    item
                    xs={4}
                    className='form-edit-item'
                >
                    <FormControl className='form-input-element' variant='outlined'>
                        <TextField disabled name={model.field} label={t(model.headerName)} value={value} onChange={(e) => handleChange(e, index)} variant='outlined' />
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
                        <TextField name={model.field} label={t(model.headerName)} value={value} onChange={(e) => handleChange(e, index)} variant='outlined' />
                    </FormControl>
                </Grid>
            );
    }

});

export default EditFormElement;