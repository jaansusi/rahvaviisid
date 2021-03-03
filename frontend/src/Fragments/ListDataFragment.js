import React from 'react';
import { useTranslation } from "react-i18next";
import { DataGrid } from '@material-ui/data-grid';
import Actions from '../Components/Actions';

const ListDataFragment = (({ model, tableData, apiPath   }) => {
    const { t } = useTranslation('common');
    console.log(model);
    let columns = model.fields.map((x) => {
        x.headerName = t(x.headerName);
        return x;
    });
    columns.push({ field: '', headerName: t('action.actions'), sortable: false, width: 290, renderCell: (params) => <Actions apiPath={apiPath} id={params.row.id} /> });
    
    return (
        <div style={{width:'90vw', height: '500px' }}>
            <DataGrid rows={tableData} columns={columns} pageSize={10} />
        </div>
    );
});

export default ListDataFragment;