import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { DataGrid } from '@material-ui/data-grid';
import Actions from '../Buttons/Actions';
import CreateButton from '../Buttons/CreateButton';
import { AuthService } from '../../Services';
import { GetDataGridLocale } from '../../translations/DataGridLocale';
import { Grid } from '@material-ui/core';

const ListDataFragment = (({ model, data, rowCount, updateTable, currentView, additionalButtons }) => {
    const { t } = useTranslation('common');

    if(!additionalButtons)
        additionalButtons = [];

    let columns = model.fields.map((x) => {
        x.headerName = t(x.headerName);
        return x;
    });
    let canAccess = AuthService.CanAccess(['editor', 'admin']);
    
    columns.push({
        field: '', headerName: t('action.actions'), sortable: false, width: canAccess ? 3 * 100 + additionalButtons.length * 100 + 30 : 150,
        renderCell: (params) => <Actions auth={canAccess} apiPath={model.apiPath} id={params.row.id} currentView={currentView} additionalButtons={additionalButtons} />
    });

    let tableData = [];
    if (data !== undefined)
        tableData = data.map((row, index) => {
            for (let field in row) {
                let modelField = model.fields.find((x) => field === x.field);
                if (modelField === undefined)
                    continue;
                // I don't know what is going on here, why this undefined check is necessary, 
                // but for some reason, the data.map is triggered twice, and it would end up undefined otherwise
                if (modelField.selector && row[field][modelField.selector] !== undefined) {
                    //console.log(data[index][field][modelField.selector]);
                    //console.log(row);
                    row[field] = row[field][modelField.selector];
                }
            }
            return row;
        });

    useEffect(() => { updateTable(0) }, []);

    let tableWidth = columns.map(x => x.width).reduce((x, y) => x + y, 0) + 2;
    return (
        <Grid item
            container
            alignItems='center'
            direction='column'
            spacing={2}
        >
            {
                canAccess &&
                <Grid item>
                    <CreateButton />
                </Grid>
            }

            <div style={{ width: tableWidth, height: '80vh' }}>
                <DataGrid
                    paginationMode='server'
                    rowCount={rowCount}
                    rows={tableData}
                    columns={columns}
                    pageSize={10}
                    onPageChange={(x) => updateTable((x.page) * x.pageSize)}
                    localeText={GetDataGridLocale(t)}
                />
            </div>
        </Grid>
    );
});

export default ListDataFragment;