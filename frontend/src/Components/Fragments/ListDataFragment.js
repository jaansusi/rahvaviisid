import React from 'react';
import { useTranslation } from "react-i18next";
import { DataGrid } from '@material-ui/data-grid';
import Actions from '../Buttons/Actions';
import CreateButton from '../Buttons/CreateButton';
import { AuthService } from '../../Services';

const ListDataFragment = (({ model, data, rowCount, setOffset, currentView, additionalButtons, actionsWidth }) => {
    const { t } = useTranslation('common');
    let columns = model.fields.map((x) => {
        x.headerName = t(x.headerName);
        return x;
    });
    let canAccess = AuthService.CanAccess(['editor', 'admin']);
    columns.push({ field: '', headerName: t('action.actions'), sortable: false, width: actionsWidth ? actionsWidth : 300, 
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
    
    let tableWidth = columns.map(x => x.width).reduce((x, y) => x + y, 0) + 2;
    return (
        <>
        {JSON.stringify()}
            <div style={{ width: tableWidth, height: '500px' }}>
                <CreateButton />
                <DataGrid
                    paginationMode='server'
                    rowCount={rowCount}
                    rows={tableData}
                    columns={columns}
                    pageSize={10}
                    onPageChange={(x) => setOffset((x.page-1) * x.pageSize)} />
            </div>
        </>
    );
});

export default ListDataFragment;