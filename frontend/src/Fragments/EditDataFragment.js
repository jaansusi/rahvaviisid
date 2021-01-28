import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, TextField, Button } from '@material-ui/core';
import './EditDataFragment.css';

const EditDataFragment = (({ mapping, formData, handleSubmit, handleChange, submitting, extraComponent }) => {
    const { t } = useTranslation('common');

    return (
        <Grid
            item
            xs={6}>
            <form onSubmit={handleSubmit}>
                <input type='hidden' name='id' value={formData.id === null ? 1 : formData.id} />
                <Grid
                    container
                    direction='row'
                >
                    {
                        mapping.edit.map((valueMap, i) => {
                            return (
                                <Grid
                                    item
                                    xs={4}
                                    className='form-edit-item'
                                >
                                    <TextField name={valueMap.field} label={t(valueMap.headerName)} value={formData[valueMap.field]} onChange={handleChange} variant='outlined' />
                                </Grid>
                            )
                        })
                    }
                    <Grid item xs>
                        {
                            extraComponent
                        }
                    </Grid>
                    <Grid item xs className='form-edit-item'>
                        <Button type="submit" disabled={submitting} variant='contained' color='primary'>{t('edit.save')}</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
});

export default EditDataFragment;