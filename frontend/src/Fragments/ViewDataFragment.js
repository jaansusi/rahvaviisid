import React from 'react';
import { useTranslation } from "react-i18next";
import { TableContainer, Table, TableRow, TableCell } from '@material-ui/core';

const ViewEntityDataComponent = ((props) => {
    const { t } = useTranslation('common');

    return (
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
    );
});

export default ViewEntityDataComponent;