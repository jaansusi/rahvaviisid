import React from 'react';
//import Actions from '../Actions/Actions';
import { useTranslation } from "react-i18next";
import { DataGrid } from '@material-ui/data-grid';
import Actions from '../Components/Actions';

const ListDataFragment = ((props) => {
    const { t } = useTranslation('common');
    let columns = props.mapping;
    columns = columns.map((x) => {
        x.headerName = t(x.headerName);
        return x;
    });
    columns.push({ field: '', headerName: t('action.actions'), sortable: false, width: 270, renderCell: (params) => <Actions id={params.row.id} /> });
    
    return (
        <div style={{width:'90vw', height: '500px' }}>
            <DataGrid rows={props.tableData} columns={columns} pageSize={10} />
        </div>
    );
});

export default ListDataFragment;