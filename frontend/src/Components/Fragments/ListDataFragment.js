import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { DataGrid } from '@material-ui/data-grid';
import Actions from '../Buttons/Actions';
import CreateButton from '../Buttons/CreateButton';
import { AuthService } from '../../Services';
import { GetDataGridLocale } from '../../translations/DataGridLocale';
import { Grid } from '@material-ui/core';

const ListDataFragment = (({ model, data, rowCount, updateTable, currentView, additionalButtons, viewOnly, actionUrlOverride }) => {
    const { t } = useTranslation('common');

    if (!additionalButtons)
        additionalButtons = [];

    let columns = model.fields.map((x) => {
        x.headerName = t(x.headerName);
        x.sortable = false;
        if (x.type === 'number') {
            x.valueFormatter = (params) => {
                return params.value.toString()
            }
        }
        return x;
    });
    let canAccess = AuthService.CanAccess(['editor', 'admin']);
    let actionButtonCount = canAccess && !viewOnly ? (currentView !== undefined ? 2 : 3) : 1 + additionalButtons.length;
    let actionsWidth = actionButtonCount === 1 ? 150 : actionButtonCount * 130;
    columns.push({
        field: '', headerName: t('action.actions'), sortable: false, width: actionsWidth,
        renderCell: (params) =>
            <Actions
                auth={canAccess && !viewOnly}
                apiPath={model.apiPath}
                id={params.row.id}
                currentView={currentView}
                additionalButtons={additionalButtons}
                pathOverride={actionUrlOverride}
            />
    });

    let tableData = [];
    if (data !== undefined)
        tableData = data.map((row) => {
            for (let field in row) {
                let modelField = model.fields.find((x) => field === x.field);
                if (modelField === undefined)
                    continue;
                // I don't know why this undefined check is necessary
                // but for some reason, the data.map is triggered twice and it would end up undefined otherwise
                if (modelField.selector && row[field][modelField.selector] !== undefined) {
                    row[field] = row[field][modelField.selector];
                }
            }
            return row;
        });

    useEffect(() => { updateTable(0) }, []);

    let tableWidth = columns.map(x => x.width ? x.width : 130).reduce((x, y) => x + y, 0) + 2;
    return (
        <Grid item
            container
            alignItems='center'
            direction='column'
            spacing={2}
        >
            {
                canAccess &&
                !viewOnly &&
                <Grid item>
                    <CreateButton />
                </Grid>
            }
            <div style={{ width: tableWidth, height: '80vh' }}>
                <DataGrid
                    paginationMode={viewOnly ? 'client' : 'server'}
                    rowCount={rowCount}
                    rows={tableData}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    sortingOrder={[]}
                    onPageChange={(x) => updateTable((x.page) * x.pageSize)}
                    localeText={GetDataGridLocale(t)}
                    componentsProps={{
                        pagination: {
                            labelRowsPerPage: t('datagrid.labelRowsPerPage'),
                            labelDisplayedRows:
                                ({ from, to, count }) => {
                                    return '' + from + '-' + to + t('datagrid.of') + count
                                }
                        }
                    }}
                />
            </div>
        </Grid>
    );
});

export default ListDataFragment;