import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, TextField, Button } from '@material-ui/core';

const ListDataFragment = (({ mapping, formData, handleSubmit, handleChange, submitting }) => {
    const { t } = useTranslation('common');

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='hidden' name='id' value={formData.id === null ? 1 : formData.id} />
                <Grid
                    container
                    direction='column'
                >
                    {
                        mapping.edit.map((valueMap, i) => {
                            return (
                                <Grid
                                    item
                                    xs={6}
                                    key={i}
                                >
                                    <TextField name={valueMap.field} label={t(valueMap.headerName)} value={formData[valueMap.field]} onChange={handleChange} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Button type="submit" disabled={submitting}>{t('edit.save')}</Button>
            </form>
        </>
    );
});

export default ListDataFragment;