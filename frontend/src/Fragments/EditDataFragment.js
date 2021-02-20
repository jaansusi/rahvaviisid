import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, TextField, Button } from '@material-ui/core';
import './EditDataFragment.css';
import TunePlayer from '../Tunes/TunePlayer';

const EditDataFragment = (({ mapping, formData, handleSubmit, handleChange, submitting, extraComponent }) => {
    const { t } = useTranslation('common');
    console.log(mapping);
    return (
        <>
            <input type='hidden' name='id' value={formData.id === null ? 1 : formData.id} />
            <Grid
                container
                direction='row'
            >
                {
                    mapping.map((valueMap, i) => {
                        if (valueMap.hidden)
                            return undefined;
                        if (valueMap.nested !== undefined) {
                            let handleNestedChange = event => {
                                const { name, value } = event.target;
                                let temp = formData[valueMap.field];
                                temp[name] = value;
                                handleChange({
                                    target: {
                                        name: valueMap.field,
                                        value: temp,
                                        type: 'object'
                                    }
                                });
                            };
                            return <EditDataFragment
                                mapping={valueMap.nested}
                                formData={formData[valueMap.field]}
                                handleChange={handleNestedChange} />;
                        }

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
                        // extraComponent.includes('TunePlayer') ? 
                        //     <TunePlayer editable={true} formData={formData} handleChange={handleChange} /> : 
                        //     undefined
                    }
                </Grid>
            </Grid>
        </>
    );
});

export default EditDataFragment;