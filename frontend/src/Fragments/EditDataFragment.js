import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, TextField, Button } from '@material-ui/core';
import './EditDataFragment.css';
import TunePlayer from '../Tunes/TunePlayer';

const EditDataFragment = (({ mapping, formData, handleSubmit, handleChange, submitting, extraComponent }) => {
    const { t } = useTranslation('common');

    return (
        <form onSubmit={handleSubmit}>
            <input type='hidden' name='id' value={formData.id === null ? 1 : formData.id} />
            <Grid
                container
                direction='row'
            >
                {
                    mapping.edit.map((valueMap, i) => {
                        if (valueMap.abstract)
                            return undefined;
                        return (
                            <Grid
                                item
                                xs={4}
                                key={i}
                                className='form-edit-item'
                            >
                                <TextField name={valueMap.field} label={t(valueMap.headerName)} value={formData[valueMap.field]} onChange={handleChange} variant='outlined' />
                            </Grid>
                        )
                    })
                }
                <Grid item xs={12}>
                    {
                        //to-do: Find a better alternative for inserting components here.
                        extraComponent.includes('TunePlayer') ? 
                            <TunePlayer editable={true} data={formData.tuneMelodies} onChange={handleChange} /> : 
                            undefined
                    }
                </Grid>
                <Grid item xs className='form-edit-item'>
                    <Button type="submit" disabled={submitting} variant='contained' color='primary'>{t('edit.save')}</Button>
                </Grid>
            </Grid>
        </form>
    );
});

export default EditDataFragment;