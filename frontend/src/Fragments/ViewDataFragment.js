import React from 'react';
import { useTranslation } from "react-i18next";
import { Grid, TableContainer, Table, TableRow, TableCell } from '@material-ui/core';

const ViewEntityDataComponent = ((props) => {
    const { t } = useTranslation('common');

    return (
        <Grid
            item
            xs>
            <TableContainer>
                <Table>
                    {
                        props.mapping.view.map((map, i) => {
                            return (
                                <TableRow>
                                    <TableCell align="left">{t(map.headerName)}</TableCell>
                                    <TableCell align="left">{props.tableData[map.field]}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </Table>
            </TableContainer>
        </Grid>
    );
});

export default ViewEntityDataComponent;