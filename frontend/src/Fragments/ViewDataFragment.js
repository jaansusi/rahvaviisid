import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, TableContainer, Table, TableRow, TableCell } from '@material-ui/core';
import TunePlayer from '../Tunes/TunePlayer';

const ViewEntityDataComponent = (({ model, data, extraComponent }) => {
    const { t } = useTranslation('common');
    console.log(model);
    return (
        <Grid
            item
            xs>
            <TableContainer>
                <Table>
                    <tbody>
                        {
                            model.fields.map((model, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align="left">{t(model.headerName)}</TableCell>
                                        <TableCell align="left">{data[model.field]}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </TableContainer>
            <Grid item xs={12}>
                {
                    //to-do: Find a better alternative for inserting components here.
                    extraComponent !== undefined && extraComponent.includes('TunePlayer')
                        ? <TunePlayer editable={false} formData={data} />
                        : undefined
                }
            </Grid>
        </Grid>
    );
});

export default ViewEntityDataComponent;