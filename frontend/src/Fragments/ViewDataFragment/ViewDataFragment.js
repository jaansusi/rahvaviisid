import React from 'react';
import { useTranslation } from "react-i18next";
import './ViewDataFragment.css';
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
                                <TableCell align="left">{t(map.header)}</TableCell>
                                <TableCell align="left">{map.getter(props.tableData)}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </Table>
        </TableContainer>
    );
});

export default ViewEntityDataComponent;