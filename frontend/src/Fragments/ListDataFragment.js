import React from 'react';
import { useTranslation } from "react-i18next";
import { DataGrid } from '@material-ui/data-grid';
import Actions from '../Components/Buttons/Actions';
import CreateButton from '../Components/Buttons/CreateButton';

const ListDataFragment = (({ model, tableData, rowCount, setOffset }) => {
    const { t } = useTranslation('common');
    let columns = model.fields.map((x) => {
        x.headerName = t(x.headerName);
        return x;
    });
    columns.push({ field: '', headerName: t('action.actions'), sortable: false, width: 290, renderCell: (params) => <Actions apiPath={model.apiPath} id={params.row.id} /> });
    if (tableData !== undefined)
        tableData = tableData.map((row) => {
            for (let field in row) {
                let modelField = model.fields.find((x) => field === x.field);
                if (modelField === undefined)
                    continue;
                switch (modelField.type) {
                    case 'boolean':
                        row[field] = row[field] ? t('model.true') : t('model.false');
                        break;
                    default:
                        break;
                }
            }
            return row;
        });
    return (
        <>
            <div style={{ width: '90vw', height: '500px' }}>
                <CreateButton />
                <DataGrid 
                paginationMode='server' 
                rowCount={rowCount}
                rows={tableData} 
                columns={columns} 
                pageSize={10}
                onPageChange={(x) => setOffset(x.page * x.pageSize)} />
            </div>
        </>
    );
});

export default ListDataFragment;